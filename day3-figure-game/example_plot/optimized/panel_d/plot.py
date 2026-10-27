"""Panel d: day 9 PCA of 12 centred, unit-SD-scaled supplied log10 taxa, computed with SVD (unchanged)."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import numpy as np
import pandas as pd
from theme import TH, GROUPS, PAL, MARKERS, DATA, new_panel, place_titles, marker_area, save_panel

HERE = Path(__file__).resolve().parent
d = pd.read_csv(DATA / "panel_d" / "dataset.csv")
features = d.filter(regex="^log10 ")
assert features.shape == (16, 12) and np.isfinite(features.to_numpy()).all()
scaled = (features - features.mean()) / features.std(ddof=1)
u, singular, vt = np.linalg.svd(scaled.to_numpy(), full_matrices=False)
scores = u * singular
variance = singular**2 / np.sum(singular**2) * 100
derived = d[["mouse_id", "day", "condition"]].copy()
derived["PC1"], derived["PC2"] = scores[:, 0], scores[:, 1]
derived.to_csv(HERE / "pca_scores.csv", index=False)
pd.DataFrame({"component": np.arange(1, 13), "explained_variance_pct": variance}).to_csv(HERE / "pca_variance.csv", index=False)

xl, yl = TH["limits"]["PC1"], TH["limits"]["PC2"]
pw = TH["panel_mm"]["width"] - TH["panel_mm"]["margin_left"] - TH["panel_mm"]["margin_right"]
fig, ax, pm = new_panel(plot_height_mm=pw * (yl[1] - yl[0]) / (xl[1] - xl[0]))   # 1 unit of PC1 = 1 unit of PC2
for g in GROUPS:
    mask = (d.condition == g).to_numpy()
    ax.scatter(scores[mask, 0], scores[mask, 1], s=marker_area(TH["marker_mm"]), marker=MARKERS[g], color=PAL[g],
               edgecolor="black", linewidths=TH["lw_pt"]["marker_edge"], label=TH["labels"][g], zorder=3)
ax.set_xlim(*xl); ax.set_ylim(*yl)
ax.set_xticks(TH["ticks"]["PC1"]); ax.set_yticks(TH["ticks"]["PC2"])
ax.set_xlabel(f"PC1 ({variance[0]:.1f} % of variance)")
ax.set_ylabel(f"PC2 ({variance[1]:.1f} % of variance)")
place_titles(ax, pm)
save_panel(fig, HERE / "figure.pdf")
