"""Day 2 PCA: centered and unit-variance-scaled supplied log10 abundances."""
from pathlib import Path
import os
import tempfile
os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "example-plot-matplotlib"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
d = pd.read_csv(HERE / "dataset.csv")
features = d.filter(regex="^log10 ")
assert features.shape[1] == 12 and np.isfinite(features.to_numpy()).all()
scaled = (features - features.mean()) / features.std(ddof=1)
u, singular, vt = np.linalg.svd(scaled.to_numpy(), full_matrices=False)
scores = u * singular
variance = singular**2 / np.sum(singular**2) * 100
# Export derived coordinates as well as keeping the actual PCA input dataset.
derived = d[["mouse_id", "day", "condition"]].copy()
derived["PC1"], derived["PC2"] = scores[:, 0], scores[:, 1]
derived.to_csv(HERE / "pca_scores.csv", index=False)
pd.DataFrame({"component": np.arange(1, 13), "explained_variance_pct": variance}).to_csv(HERE / "pca_variance.csv", index=False)
plt.rcParams.update({"font.family": "monospace", "font.size": 9})
fig, ax = plt.subplots(figsize=(5.4, 3.5))
for group, color, label in zip(["Control", "Ciprofloxacin", "Tetracyclin", "Vancomycin"],
                             ["#191919", "#15b9c5", "#ed327d", "#e5a321"], ["water", "Cipro", "Tetra", "Vanco"]):
    mask = d.condition == group
    ax.scatter(scores[mask, 0], scores[mask, 1], color=color, s=85, edgecolor="white", linewidth=1.5, label=label)
ax.set(xlabel=f"PC1 ({variance[0]:.1f}%)", ylabel=f"PC2 ({variance[1]:.1f}%)", title="COMMUNITY PCA / DAY 9")
ax.margins(.2)
ax.set_facecolor("#fffbe9")
ax.grid(True, color="#b0a99c", linewidth=.7)
ax.set_axisbelow(True)
ax.legend(fontsize=7, frameon=True, loc="upper right")
fig.text(.52, .015, "12 taxa; scaled log10 values; 16 mice", ha="center", fontsize=7)
fig.tight_layout(rect=(0, .035, 1, 1))
fig.savefig(HERE / "figure.pdf")
fig.savefig(HERE / "figure.png", dpi=200)
plt.close(fig)
