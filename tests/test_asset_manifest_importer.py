import importlib.util
import json
import subprocess
import sys
import unittest
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


if __name__ == "__main__":
    unittest.main()
