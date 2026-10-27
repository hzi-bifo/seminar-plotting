"""Shared treatment legend: one row, group order, line + marker samples, 7 pt."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from theme import TH, GROUPS, PAL, MARKERS, apply_rcparams, MM

OUT = Path(__file__).resolve().parent
apply_rcparams()
pg = TH["page_mm"]
w, h = pg["width"] - 2 * pg["outer"], pg["legend_height"]
fig = plt.figure(figsize=(w / 25.4, h / 25.4))
handles = [Line2D([], [], color=PAL[g], lw=TH["lw_pt"]["line"], marker=MARKERS[g], markersize=TH["marker_mm"] * MM,
                  markerfacecolor=PAL[g], markeredgecolor="black", markeredgewidth=TH["lw_pt"]["marker_edge"],
                  label=TH["labels"][g]) for g in GROUPS]
fig.legend(handles=handles, loc="center", ncol=4, frameon=False, handlelength=2.2, columnspacing=2.5,
           handletextpad=.6, borderaxespad=0, fontsize=TH["size_pt"]["legend"])
fig.savefig(OUT / "legend.pdf")
