"""Extract panel inputs from bundled, unchanged course source tables.

No random data, imputation, recalculation of supplied log10 columns, or selection
based on effect size. Optional: all panel CSVs are already included.
"""
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parent
TAXA = ["KB1", "YL2", "KB18", "YL27", "YL31", "YL32", "YL44", "YL45", "I46", "I48", "I49", "YL58"]


def main():
    q = pd.read_csv(ROOT / "source_data" / "qpcr_course.csv")
    q = q.rename(columns={"Mouse": "mouse_id", "Day": "day", "Group": "condition"})
    q["condition"] = q.condition.replace({"water": "Control"})
    day9 = q[q.day == 9]
    ids = ["mouse_id", "day", "condition"]
    panels = {
        "a": q[ids + ["YL44", "log10 YL44"]],
        "b": day9[ids + ["YL44", "log10 YL44"]],
        "c": day9[ids + ["YL32", "log10 YL32"]],
        "d": day9[ids + [f"log10 {taxon}" for taxon in TAXA]],
        "f": day9[ids + ["YL44", "log10 YL44", "I48", "log10 I48"]],
    }
    h = pd.read_csv(ROOT / "source_data" / "heatmap_course.csv")
    panels["e"] = h[(h.Genome == "Akkermansia_muciniphila_YL44") & h.day.isin([0, 9, 30, 79])]
    for letter, frame in panels.items():
        folder = ROOT / f"panel_{letter}"
        folder.mkdir(exist_ok=True)
        frame.to_csv(folder / "dataset.csv", index=False)
        print(f"panel_{letter}: {len(frame)} rows")


if __name__ == "__main__":
    main()
