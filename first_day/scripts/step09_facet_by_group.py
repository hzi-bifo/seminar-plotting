"""
Step 9: Create faceted plots by treatment group

Learning goals:
- Use subplots to compare multiple groups
- Share axes across facets for easier comparison
- Combine multiple visualization techniques in one figure
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load and transform data
all_groups = pd.read_csv("first_day/data/yl32_all_groups.csv")
all_groups = all_groups.assign(log10_yl32=np.log10(all_groups["yl32"]))

# Create 2x2 subplot grid
fig, axes = plt.subplots(2, 2, sharex=True, sharey=True, figsize=(13, 9))
axes = axes.ravel()

# Plot each group in its own facet
for ax, (group, subset) in zip(axes, all_groups.groupby("group")):
    # Sort for proper line connections
    subset = subset.sort_values(["mouse", "day"])

    # Plot each mouse
    for mouse, mouse_df in subset.groupby("mouse"):
        ax.plot(mouse_df["day"], mouse_df["log10_yl32"],
                marker="o", linewidth=2, markersize=5, label=mouse, alpha=0.8)

    # Add post-antibiotic markers
    post_days = sorted(subset.loc[subset["post_antibiotic"], "day"].unique())
    for day in post_days:
        ax.axvline(day, color="tomato", linestyle=":", linewidth=1.5, alpha=0.7)

    # Styling
    ax.set_title(group, fontsize=12, fontweight="bold")
    ax.grid(alpha=0.3, linestyle="--")

# Add legend to first panel only
axes[0].legend(title="Mouse", fontsize=8, loc="best")

# Shared axis labels
fig.text(0.5, 0.02, "Day", ha="center", fontsize=13, fontweight="bold")
fig.text(0.02, 0.5, "log10(YL32 abundance)", va="center", rotation="vertical",
         fontsize=13, fontweight="bold")

# Overall title
fig.suptitle("log10 YL32 dynamics across treatment groups",
             fontsize=15, fontweight="bold", y=0.98)

plt.tight_layout(rect=[0.03, 0.03, 1, 0.96])
plt.savefig("first_day/plots/all_groups_log10_facets.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_groups_log10_facets.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. Which antibiotic causes the most dramatic YL32 suppression?")
print("2. How does the water control differ from antibiotic groups?")
print("3. Do all antibiotics affect YL32 similarly?")
print("4. What recovery patterns do you observe?")
