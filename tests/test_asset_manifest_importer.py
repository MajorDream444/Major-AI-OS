import importlib.util
import json
import subprocess
import sys
import unittest
from unittest import mock
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "import_maim_asset_manifest.py"
SPEC = importlib.util.spec_from_file_location("asset_importer", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


class AssetImporterTests(unittest.TestCase):
    def test_repeat_import_is_idempotent_and_private_paths_are_removed(self):
        rows = MODULE.load_manifest(ROOT / "tests/fixtures/asset-manifest.csv")
        first = MODULE.reconcile(rows)
        second = MODULE.reconcile(rows)
        self.assertEqual(first, second)
        self.assertEqual(first["report"]["duplicate_rows"], 1)
        self.assertEqual(first["report"]["would_write"], 2)
        self.assertEqual(first["report"]["zero_byte_exceptions"], ["MAIM-CD-SHARED-EMPTY"])
        self.assertEqual(first["report"]["missing_uploads"], ["MAIM-CD-02-MISSING"])
        self.assertNotIn("candidate_source_path", json.dumps(first))

    def test_conflicting_stable_ids_are_reported(self):
        rows = MODULE.load_manifest(ROOT / "tests/fixtures/asset-manifest-conflict.csv")
        result = MODULE.reconcile(rows)
        self.assertEqual(len(result["report"]["conflicts"]), 1)
        self.assertEqual(result["report"]["would_write"], 1)

    def test_apply_requires_workspace_and_is_never_default(self):
        run = subprocess.run(
            [sys.executable, str(SCRIPT), str(ROOT / "tests/fixtures/asset-manifest.csv")],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(json.loads(run.stdout)["mode"], "dry-run")

    def test_apply_rejects_noncanonical_destinations_before_networking(self):
        unsafe = [
            "http://njpdlomvyalxrkluaige.supabase.co",
            "https://njpdlomvyalxrkluaige.supabase.co.evil.example",
            "https://evil.example/njpdlomvyalxrkluaige",
            "https://user@njpdlomvyalxrkluaige.supabase.co",
            "https://njpdlomvyalxrkluaige.supabase.co:443",
            "https://njpdlomvyalxrkluaige.supabase.co/rest",
            "https://njpdlomvyalxrkluaige.supabase.co?next=evil",
            "https://njpdlomvyalxrkluaige.supabase.co#fragment",
        ]
        with mock.patch.dict("os.environ", {"SUPABASE_SERVICE_ROLE_KEY": "secret"}, clear=True):
            with mock.patch.object(MODULE.urllib.request, "build_opener") as build_opener:
                for url in unsafe:
                    with self.subTest(url=url), mock.patch.dict("os.environ", {"SUPABASE_URL": url}):
                        with self.assertRaises(RuntimeError):
                            MODULE.apply_manifest("workspace", [])
                build_opener.assert_not_called()

    def test_redirect_handler_never_forwards_credentials(self):
        handler = MODULE.NoCredentialRedirects()
        request = MODULE.urllib.request.Request(
            f"{MODULE.APPROVED_SUPABASE_ORIGIN}/rest/v1/rpc/reconcile_asset_catalog_manifest",
            headers={"Authorization": "Bearer secret"},
        )
        with self.assertRaisesRegex(RuntimeError, "refused HTTP redirect"):
            handler.redirect_request(request, None, 307, "redirect", {}, "https://evil.example/")

    def test_explicit_loopback_test_origin_is_exact(self):
        with mock.patch.dict("os.environ", {"MAIM_ASSET_IMPORTER_TEST_ORIGIN": "http://127.0.0.1:54321"}, clear=True):
            self.assertEqual(MODULE.validated_supabase_origin("http://127.0.0.1:54321"), "http://127.0.0.1:54321")
            for unsafe in [
                "http://127.0.0.1:54321/path",
                "http://localhost:54321",
                "http://127.0.0.1:54322",
                "http://127.0.0.1:54321?next=evil",
            ]:
                with self.subTest(url=unsafe), self.assertRaises(RuntimeError):
                    MODULE.validated_supabase_origin(unsafe)


if __name__ == "__main__":
    unittest.main()
