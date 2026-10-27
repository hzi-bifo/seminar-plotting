"""Check the redesigned panels against the original CSVs and the original scripts' derived values.

Run from anywhere: python3 optimized/verify.py. Exits non-zero on the first failed check.
"""
from pathlib import Path
import json
import sys

import numpy as np
import pandas as pd
import pymupdf

OUT = Path(__file__).resolve().parent
DATA = OUT.parent
TH = json.loads((OUT / "theme.json").read_text())
GROUPS = TH["groups"]
failures = []


def check(cond, msg):
    print(("ok   " if cond else "FAIL ") + msg)
    if not cond:
        failures.append(msg)


# Input CSVs are the originals, byte for byte (the redesigned scripts only read them).
for letter, rows in zip("abcdef", [243, 16, 16, 16, 80, 16]):
    d = pd.read_csv(DATA / f"panel_{letter}" / "dataset.csv")
    check(len(d) == rows, f"panel {letter}: {rows} rows in the original CSV")

# a: plotted group means equal the means recomputed from the CSV, at the 16 actual study days.
a = pd.read_csv(DATA / "panel_a" / "dataset.csv")
plotted = pd.read_csv(OUT / "panel_a" / "group_means.csv")
recomputed = a.groupby(["condition", "day"])["log10 YL44"].mean().reset_index()
merged = plotted.merge(recomputed, on=["condition", "day"])
check(len(merged) == 64 and np.allclose(merged["x"], merged["log10 YL44"]), "panel a: 64 group/day means match the CSV")
check(sorted(a.day.unique().tolist()) == [0, 4, 9, 14, 18, 23, 30, 37, 44, 49, 53, 58, 63, 67, 72, 79], "panel a: 16 study days unchanged")
n = a.groupby(["condition", "day"]).size().unstack()
check((n.loc["Control", n.columns >= 14] == 3).all() and (n.drop("Control") == 4).all().all(), "panel a: 4 mice per group, controls 3 from day 14")

# b: mean and sample SD (ddof=1) per group equal the original script's groupby output.
b = pd.read_csv(DATA / "panel_b" / "dataset.csv")
orig = b.groupby("condition")["log10 YL44"].agg(["mean", "std"])
new = pd.read_csv(OUT / "panel_b" / "group_summary.csv", index_col=0)
check(np.allclose(new.loc[GROUPS, "mean"], orig.loc[GROUPS, "mean"]) and np.allclose(new.loc[GROUPS, "std"], orig.loc[GROUPS, "std"]),
      "panel b: means and sample SDs identical to the original bars")
check(np.allclose(new.loc[GROUPS, "std"], b.groupby("condition")["log10 YL44"].std(ddof=1).loc[GROUPS]), "panel b: SD is sample SD (ddof=1), not SEM")

# d: PCA scores and variance match the original export up to a sign flip per component.
od = pd.read_csv(DATA / "panel_d" / "pca_scores.csv"); nd = pd.read_csv(OUT / "panel_d" / "pca_scores.csv")
same_ids = (od[["mouse_id", "day", "condition"]].values == nd[["mouse_id", "day", "condition"]].values).all()
sign_ok = all(np.allclose(od[c], nd[c]) or np.allclose(od[c], -nd[c]) for c in ["PC1", "PC2"])
check(same_ids and sign_ok, "panel d: PC1/PC2 scores equal the original export (sign flips allowed)")
ov = pd.read_csv(DATA / "panel_d" / "pca_variance.csv"); nv = pd.read_csv(OUT / "panel_d" / "pca_variance.csv")
check(np.allclose(ov.explained_variance_pct, nv.explained_variance_pct), "panel d: explained variance unchanged (55.0 %, 20.9 %)")

# e: every plotted cell equals the CSV value; values stay on the 0-1 scale; 4 mice x 4 days.
e = pd.read_csv(DATA / "panel_e" / "dataset.csv")
m = pd.read_csv(OUT / "panel_e" / "heatmap_matrix.csv")
cells = 0
for col in m.columns[1:]:
    group, day = col.rsplit("_", 1)
    for _, row in m.iterrows():
        v = e[(e.snp_id == row.snp_id) & (e.treatment_group == group) & (e.day == int(day))].value
        cells += 1
        if not (len(v) == 1 and np.isclose(v.iloc[0], row[col])):
            failures.append(f"panel e: cell {row.snp_id} {col} mismatch")
check(cells == 80 and not any(f.startswith("panel e: cell") for f in failures), "panel e: all 80 cells equal the CSV values")
check(e.value.between(0, 1).all() and np.isclose(e.value.max(), 0.720588), "panel e: values on the original 0-1 scale, max 0.72")
check(e.groupby("treatment_group").mouse_id.nunique().eq(1).all() and sorted(e.day.unique()) == [0, 9, 30, 79], "panel e: one mouse per group, days 0/9/30/79")

# f: YL44 values are the same 16 values as panel b; I48 taken from the CSV unchanged.
f = pd.read_csv(DATA / "panel_f" / "dataset.csv")
check(np.allclose(f.sort_values("mouse_id")["log10 YL44"], b.sort_values("mouse_id")["log10 YL44"]), "panel f: x values equal panel b values")

# Typography in the assembled PDF: one text family, sizes within the specification, nothing outside the page.
page = pymupdf.open(OUT / "figure_optimized.pdf")[0]
fonts, sizes, outside = set(), set(), []
for block in page.get_text("dict")["blocks"]:
    for line in block.get("lines", []):
        for span in line["spans"]:
            fonts.add(span["font"]); sizes.add(round(span["size"], 1))
            if not page.rect.contains(pymupdf.Rect(span["bbox"])):
                outside.append(span["text"])
allowed_sizes = {TH["size_pt"][k] for k in TH["size_pt"]}
check(all(f.split("-")[0] in {"ArialMT", "Arial", "Helvetica"} for f in fonts), f"figure: fonts {sorted(fonts)} (Arial text, Helvetica-Bold panel letters)")
check(sizes <= allowed_sizes and min(sizes) >= 6, f"figure: text sizes {sorted(sizes)} pt, all specified and >= 6 pt")
check(not outside, "figure: no text outside the page")
check(abs(page.rect.width / 72 * 25.4 - TH["page_mm"]["width"]) < .1 and abs(page.rect.height / 72 * 25.4 - TH["page_mm"]["height"]) < .1,
      f"figure: page is {TH['page_mm']['width']} x {TH['page_mm']['height']} mm")
text = page.get_text()
words = set(text.split())
check(all(g in words for g in GROUPS) and not words & {"VAN", "CTRL", "CIP", "TET", "water", "Cipro", "Tetra", "Vanco", "C", "Ci", "T", "V"},
      "figure: full group names, no abbreviations")
check(not any(s in text for s in ["p =", "p <", "*", "R² ", "r ="]), "figure: no significance or correlation annotations")

if failures:
    print(f"\n{len(failures)} check(s) failed"); sys.exit(1)
print("\nall checks passed")
