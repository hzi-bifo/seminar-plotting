"""Render the six redesigned panels, the shared legend, the combined figure, then verify against the originals."""
from pathlib import Path
import subprocess
import sys

OUT = Path(__file__).resolve().parent


def main():
    for letter in "abcdef":
        script = OUT / f"panel_{letter}" / ("plot.R" if letter in "ace" else "plot.py")
        subprocess.run((["Rscript"] if script.suffix == ".R" else [sys.executable]) + [str(script)], check=True)
    subprocess.run([sys.executable, str(OUT / "legend.py")], check=True)
    subprocess.run([sys.executable, str(OUT / "assemble.py")], check=True)
    subprocess.run([sys.executable, str(OUT / "verify.py")], check=True)


if __name__ == "__main__":
    main()
