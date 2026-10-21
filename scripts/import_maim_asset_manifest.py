#!/usr/bin/env python3
"""Dry-run-first importer for the private MAIM Drive asset manifest.

The importer deliberately drops absolute local paths and calls one atomic,
server-only reconciliation RPC. It never uploads bytes and never changes Drive.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import urllib.error
import urllib.request
import urllib.parse
from collections import Counter
from pathlib import Path

PROJECT_REF = "njpdlomvyalxrkluaige"
APPROVED_SUPABASE_ORIGIN = f"https://{PROJECT_REF}.supabase.co"
SHA256 = re.compile(r"^[0-9a-f]{64}$")
DRIVE_ID = re.compile(r"^[A-Za-z0-9_-]{10,}$")
ALLOWED_APPROVAL = {"unreviewed", "reference-only", "documented-complete-reference"}


class NoCredentialRedirects(urllib.request.HTTPRedirectHandler):
    """Never replay the service-role request to a redirect destination."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        raise RuntimeError(f"catalogue RPC refused HTTP redirect ({code})")


def validated_supabase_origin(raw: str) -> str:
    """Return the one approved canonical origin or fail before networking."""

    parsed = urllib.parse.urlsplit(raw)
    try:
        port = parsed.port
    except ValueError as exc:
        raise RuntimeError("SUPABASE_URL contains an invalid port") from exc
    if (
        parsed.scheme != "https"
        or parsed.hostname != f"{PROJECT_REF}.supabase.co"
        or port is not None
        or parsed.username is not None
        or parsed.password is not None
        or parsed.path not in {"", "/"}
        or parsed.query
        or parsed.fragment
    ):
        raise RuntimeError(f"SUPABASE_URL must exactly match {APPROVED_SUPABASE_ORIGIN}")
    return APPROVED_SUPABASE_ORIGIN


def parse_dependencies(raw: str) -> list[dict[str, object]]:
    if not raw.strip():
        return []
    return [
        {
            "dependency": value.strip(),
            "status": "unresolved",
            "evidence": "Manifest reported an unresolved relative dependency.",
            "blocks_preview": True,
        }
        for value in raw.split("|")
        if value.strip()
    ]


def normalize(row: dict[str, str]) -> dict[str, object]:
    stable_id = row.get("stable_id", "").strip()
    sha256 = row.get("sha256", "").strip().lower()
    drive_file_id = row.get("drive_file_id", "").strip()
    upload_status = row.get("upload_status", row.get("upload_action", "")).strip()
    size = int(row.get("size_bytes", "0") or 0)
    if not stable_id:
        raise ValueError("missing stable_id")
    if not SHA256.fullmatch(sha256):
        raise ValueError(f"{stable_id}: invalid SHA-256")
    if size < 0:
        raise ValueError(f"{stable_id}: negative size")
    if upload_status == "uploaded" and not DRIVE_ID.fullmatch(drive_file_id):
        raise ValueError(f"{stable_id}: uploaded row has no valid Drive file ID")
    drive_url = row.get("drive_url", "").strip()
    if upload_status == "uploaded":
        parsed = urllib.parse.urlparse(drive_url)
        if parsed.scheme != "https" or parsed.hostname not in {"drive.google.com", "docs.google.com"}:
            raise ValueError(f"{stable_id}: uploaded row has an unsafe Drive URL")

    approval = row.get("approval_status", "unreviewed").strip() or "unreviewed"
    if approval not in ALLOWED_APPROVAL:
        raise ValueError(f"{stable_id}: unsupported recovery approval value")

    integrity = row.get("integrity_status", "not_verified").strip() or "not_verified"
    completion = "blocked_dependencies" if row.get("dependencies", "").strip() else "unknown"
    if row.get("completeness_status", "").strip():
        completion = row["completeness_status"].strip()

    # candidate_source_path/source_path are intentionally not copied.
    return {
        "stable_id": stable_id,
        "sha256": sha256,
        "size_bytes": size,
        "format": row.get("format", Path(row.get("original_filename", "")).suffix).strip(),
        "mime_type": row.get("mime_type", "").strip(),
        "original_filename": row.get("original_filename", row.get("filename", "")).strip(),
        "project_code": row.get("project_code", "SHARED").strip(),
        "project": row.get("project", "Shared Context + Routing Review").strip(),
        "project_relative_path": row.get("project_relative_path", row.get("original_filename", "")).strip(),
        "project_relationship": "member",
        "drive_file_id": drive_file_id,
        "drive_url": drive_url,
        "upload_status": upload_status,
        "approval_status": "unreviewed",
        "completion_context": row.get("approval_evidence", "").strip(),
        "completeness_status": completion,
        "integrity_status": integrity,
        "dependencies": parse_dependencies(row.get("dependencies", "")),
    }


def load_manifest(path: Path) -> list[dict[str, object]]:
    if path.suffix.lower() == ".json":
        raw = json.loads(path.read_text())
        rows = raw if isinstance(raw, list) else raw.get("records", [])
    else:
        with path.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.DictReader(handle))
    return [normalize(dict(row)) for row in rows]


def reconcile(records: list[dict[str, object]]) -> dict[str, object]:
    seen: dict[str, tuple[str, int]] = {}
    accepted: list[dict[str, object]] = []
    conflicts: list[dict[str, object]] = []
    missing: list[str] = []
    exceptions: list[str] = []
    duplicate_rows = 0
    for row in records:
        stable_id = str(row["stable_id"])
        signature = (str(row["sha256"]), int(row["size_bytes"]))
        if stable_id in seen:
            if seen[stable_id] != signature:
                conflicts.append({"stable_id": stable_id, "seen": seen[stable_id], "incoming": signature})
            else:
                duplicate_rows += 1
            continue
        seen[stable_id] = signature
        if row["upload_status"] != "uploaded" or not row["drive_file_id"]:
            (exceptions if row["size_bytes"] == 0 else missing).append(stable_id)
        accepted.append(row)
    return {
        "records": accepted,
        "report": {
            "input_rows": len(records),
            "accepted_records": len(accepted),
            "duplicate_rows": duplicate_rows,
            "conflicts": conflicts,
            "missing_uploads": missing,
            "zero_byte_exceptions": exceptions,
            "by_project": dict(Counter(str(row["project_code"]) for row in accepted)),
            "would_write": sum(row["upload_status"] == "uploaded" and bool(row["drive_file_id"]) for row in accepted),
        },
    }


def apply_manifest(workspace_id: str, records: list[dict[str, object]]) -> dict[str, object]:
    url = validated_supabase_origin(os.environ.get("SUPABASE_URL", ""))
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not key:
        raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is required only for --apply")
    body = json.dumps({"p_workspace_id": workspace_id, "p_manifest": records}).encode()
    request = urllib.request.Request(
        f"{url}/rest/v1/rpc/reconcile_asset_catalog_manifest",
        data=body,
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Content-Profile": "maim",
            "Accept-Profile": "maim",
        },
    )
    opener = urllib.request.build_opener(NoCredentialRedirects())
    try:
        with opener.open(request, timeout=60) as response:
            return json.loads(response.read() or b"{}")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")[:1000]
        raise RuntimeError(f"catalogue RPC failed ({exc.code}): {detail}") from exc


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--workspace-id")
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    result = reconcile(load_manifest(args.manifest))
    output = {"mode": "apply" if args.apply else "dry-run", **result["report"]}
    if args.apply:
        if not args.workspace_id:
            parser.error("--workspace-id is required with --apply")
        if result["report"]["conflicts"]:
            raise RuntimeError("refusing apply while stable-ID conflicts exist")
        output["database"] = apply_manifest(args.workspace_id, result["records"])
    rendered = json.dumps(output, indent=2, sort_keys=True)
    print(rendered)
    if args.report:
        args.report.write_text(rendered + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
