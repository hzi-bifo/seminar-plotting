"""Re-render existing CSVs. Data generation is a separate, explicit operation."""
from pathlib import Path
import subprocess
import sys
import zipfile
from assemble import main as assemble

ROOT = Path(__file__).resolve().parent


def main():
    for panel in "abcdef":
        folder = ROOT / f"panel_{panel}"
        script = folder / ("plot.R" if panel in "ace" else "plot.py")
        command = ["Rscript"] if script.suffix == ".R" else [sys.executable]
        subprocess.run(command + [str(script)], check=True)
    assemble()
    # Archive the complete portable exercise, without caches or the archive itself.
    with zipfile.ZipFile(ROOT.parent / "example_plot.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(ROOT.rglob("*")):
            if path.is_file() and not any(part.startswith(".") or part == "__pycache__" for part in path.relative_to(ROOT).parts):
                archive.write(path, path.relative_to(ROOT.parent))
    print("Rendered six panels, assembled the draft figure, and updated example_plot.zip.")


if __name__ == "__main__":
    main()
