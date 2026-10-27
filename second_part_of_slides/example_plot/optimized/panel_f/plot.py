"""Panel f: day 9 YL44 versus I48 per mouse, supplied log10 values; no regression or correlation."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import pandas as pd
from theme import TH, GROUPS, PAL, MARKERS, DATA, new_panel, place_titles, note, marker_area, save_panel

HERE = Path(__file__).resolve().parent
d = pd.read_csv(DATA / "panel_f" / "dataset.csv")
assert len(d) == 16
xl, yl = TH["limits"]["log10_YL44"], TH["limits"]["log10_I48"]
pw = TH["panel_mm"]["width"] - TH["panel_mm"]["margin_left"] - TH["panel_mm"]["margin_right"]
fig, ax, pm = new_panel(plot_height_mm=pw * (yl[1] - yl[0]) / (xl[1] - xl[0]))   # one log10 unit, same length on both axes
for g in GROUPS:
    sub = d[d.condition == g]
    ax.scatter(sub["log10 YL44"], sub["log10 I48"], s=marker_area(TH["marker_mm"]), marker=MARKERS[g], color=PAL[g],
               edgecolor="black", linewidths=TH["lw_pt"]["marker_edge"], label=TH["labels"][g], zorder=3)
ax.set_xlim(*xl); ax.set_ylim(*yl)
ax.set_xticks(TH["ticks"]["log10_YL44"], [f"{t:.1f}" for t in TH["ticks"]["log10_YL44"]])
ax.set_yticks(TH["ticks"]["log10_I48"], [f"{t:.1f}" for t in TH["ticks"]["log10_I48"]])
ax.set_xlabel("YL44 abundance (log10)"); ax.set_ylabel("I48 abundance (log10)")
place_titles(ax, pm)
note(ax, "day 9, one point per mouse")
save_panel(fig, HERE / "figure.pdf")
