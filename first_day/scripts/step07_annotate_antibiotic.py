"""
Step 7: Highlight post-antibiotic timepoints with vertical markers

Learning goals:
- Use metadata flags to annotate experimental events
- Add vertical lines with axvline()
- Link biological interventions back to data patterns
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load data
all_mice = pd.read_csv("first_day/data/yl32_vancomycin.csv")
all_mice = all_mice.assign(log10_yl32=np.log10(all_mice["yl32"]))

# Compute summaries
summary = (all_mice.groupby("day")["log10_yl32"]
           .agg(mean="mean", median="median")
           .reset_index())

# Identify post-antibiotic days
post_days = sorted(all_mice.loc[all_mice["post_antibiotic"], "day"].unique())
print(f"Post-antibiotic timepoints: {post_days}")
print()

# Create figure
fig, ax = plt.subplots(figsize=(11, 6))

# Scatter individual replicates
rng = np.random.default_rng(seed=42)
first = True
for day, subset in all_mice.groupby("day"):
    jitter = rng.uniform(-0.4, 0.4, len(subset))
    label = "Mouse replicates" if first else None
    ax.scatter(day + jitter, subset["log10_yl32"],
               color="steelblue", alpha=0.7, s=60, label=label)
    first = False

# Overlay summaries
ax.plot(summary["day"], summary["mean"],
        color="black", linewidth=2.5, marker="o", markersize=8, label="Daily mean")
ax.plot(summary["day"], summary["median"],
        color="black", linestyle="--", linewidth=2.5, marker="s", markersize=6, label="Daily median")

# Add post-antibiotic markers
for day in post_days:
    ax.axvline(day, color="tomato", linestyle=":", linewidth=2, alpha=0.7)

# Add custom legend entry for antibiotic markers
from matplotlib.lines import Line2D
legend_elements = ax.get_legend_handles_labels()
legend_elements[0].append(Line2D([0], [0], color="tomato", linestyle=":", linewidth=2, label="Post-antibiotic"))
ax.legend(handles=legend_elements[0], fontsize=10)

# Labels
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("log10(YL32 abundance)", fontsize=12)
ax.set_title("Daily log10 YL32 with post-antibiotic markers", fontsize=14, fontweight="bold")
ax.grid(alpha=0.3, linestyle="--")

# Save and display
plt.tight_layout()
plt.savefig("first_day/plots/all_mice_log10_jitter_annotated.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_mice_log10_jitter_annotated.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. What happens to YL32 abundance after antibiotic treatment?")
print("2. How long does it take for recovery to begin?")
print("3. Why is it important to annotate experimental interventions?")
print("4. What other metadata might be useful to annotate (e.g., diet changes)?")
