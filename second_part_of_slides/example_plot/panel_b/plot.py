"""Day 1 qPCR endpoint: Python bars, another palette and group order."""
from pathlib import Path
import os
import tempfile
os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "example-plot-matplotlib"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

HERE = Path(__file__).resolve().parent
d = pd.read_csv(HERE / "dataset.csv")
order = ["Vancomycin", "Control", "Ciprofloxacin", "Tetracyclin"]
summary = d.groupby("condition")["log10 YL44"].agg(["mean", "std"]).loc[order]
fig, ax = plt.subplots(figsize=(4.5, 3.6))
ax.bar(range(4), summary["mean"], yerr=summary["std"], capsize=6,
       color=["#9467bd", "#1f77b4", "#ff7f0e", "#2ca02c"], edgecolor="black", linewidth=.6)
ax.set_xticks(range(4), ["VAN", "CTRL", "CIP", "TET"])
ax.set_ylabel("log10 abundance / YL44", fontsize=10)
ax.set_title("qPCR: day 9", loc="left", fontsize=16, weight="bold")
ax.set_ylim(0, 14)
ax.spines[["top", "right"]].set_visible(False)
ax.set_axisbelow(True)
ax.yaxis.grid(True, linestyle="--", alpha=.5)
ax.text(.98, .96, "mean ± SD; 4 mice / group", transform=ax.transAxes, ha="right", va="top", fontsize=8)
fig.tight_layout()
fig.savefig(HERE / "figure.pdf")
fig.savefig(HERE / "figure.png", dpi=200)
plt.close(fig)
