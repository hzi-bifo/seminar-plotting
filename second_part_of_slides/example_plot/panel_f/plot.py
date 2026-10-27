"""Day 1 scatterplot: matched taxon abundances, large markers and another palette."""
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
plt.rcParams.update({"font.family": "serif", "font.size": 11, "axes.linewidth": .5})
fig, ax = plt.subplots(figsize=(4.6, 3.8))
for group, color, marker in [("Tetracyclin", "#4c956c", "^"), ("Vancomycin", "#2e5aac", "s"), ("Control", "#e4aa24", "o"), ("Ciprofloxacin", "#d55555", "D")]:
    sub = d[d.condition == group]
    ax.scatter(sub["log10 YL44"], sub["log10 I48"], s=95, marker=marker, color=color,
               edgecolor="black", linewidth=.45, alpha=.85, label=group)
ax.set(xlabel="YL44 abundance (log10)", ylabel="I48 abundance (log10)", title="Two taxa, one sample",
       xlim=(10.2, 12), ylim=(10.1, 12.7))
ax.spines[["top", "right"]].set_visible(False)
ax.legend(loc="upper left", fontsize=6.5, frameon=False, handletextpad=.3)
ax.text(.03, .04, "Day 9; each point = one mouse", transform=ax.transAxes, fontsize=8, style="italic")
fig.tight_layout()
fig.savefig(HERE / "figure.pdf")
fig.savefig(HERE / "figure.png", dpi=200)
plt.close(fig)
