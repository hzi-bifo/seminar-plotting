"""Panel b: day 9 YL44 mean +/- sample SD (ddof=1) per group, individual mice behind."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import numpy as np
import pandas as pd
from theme import TH, GROUPS, PAL, MARKERS, DATA, new_panel, place_titles, note, staggered_xticklabels, marker_area, save_panel

HERE = Path(__file__).resolve().parent
d = pd.read_csv(DATA / "panel_b" / "dataset.csv")
assert len(d) == 16 and set(d.condition) == set(GROUPS)
summary = d.groupby("condition")["log10 YL44"].agg(["mean", "std"]).loc[GROUPS]   # std: pandas default ddof=1
summary.to_csv(HERE / "group_summary.csv")

fig, ax, pm = new_panel()
x = np.arange(1, 5)
offsets = np.array([-.18, -.06, .06, .18])            # fixed per mouse (sorted by mouse_id), no randomness
for xi, g in zip(x, GROUPS):
    sub = d[d.condition == g].sort_values("mouse_id")
    if TH["panel_b_style"] == "bars_from_zero":
        ax.bar(xi, summary.loc[g, "mean"], yerr=summary.loc[g, "std"], width=.6, color=PAL[g], edgecolor="black",
               linewidth=TH["lw_pt"]["axis"], capsize=2 * 72 / 25.4, error_kw={"linewidth": TH["lw_pt"]["errorbar"]})
        continue
    ax.scatter(xi + offsets[: len(sub)], sub["log10 YL44"], s=marker_area(TH["marker_mm"]) * .7, marker=MARKERS[g],
               facecolor="none", edgecolor=PAL[g], linewidths=TH["lw_pt"]["marker_edge"] * 2, alpha=.8, zorder=2)
    ax.errorbar(xi, summary.loc[g, "mean"], yerr=summary.loc[g, "std"], fmt="none", ecolor="black",
                elinewidth=TH["lw_pt"]["errorbar"], capsize=2 * 72 / 25.4 / 2, capthick=TH["lw_pt"]["errorbar"], zorder=3)
    ax.scatter([xi], [summary.loc[g, "mean"]], s=marker_area(TH["marker_mm"]), marker=MARKERS[g], color=PAL[g],
               edgecolor="black", linewidths=TH["lw_pt"]["marker_edge"], zorder=4)
if TH["panel_b_style"] == "bars_from_zero":
    ax.set_ylim(0, 14)
else:
    ax.set_ylim(*TH["limits"]["log10_YL44"]); ax.set_yticks(TH["ticks"]["log10_YL44"], [f"{t:.1f}" for t in TH["ticks"]["log10_YL44"]])
ax.set_xlim(0.4, 4.6)
staggered_xticklabels(ax, x, [TH["labels"][g] for g in GROUPS])
ax.set_ylabel("YL44 abundance (log10)")
place_titles(ax, pm)
note(ax, "mean ± SD, n = 4 mice per group")
save_panel(fig, HERE / "figure.pdf")
