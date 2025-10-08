"""
Step 6: Add jittered scatter points with mean/median overlays

Learning goals:
- Use scatter plots to show individual replicates
- Apply jitter to prevent overlapping points
- Compute and overlay summary statistics
- Combine multiple plot types (scatter + line)
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load data
all_mice = pd.read_csv("first_day/data/yl32_vancomycin.csv")
all_mice = all_mice.assign(log10_yl32=np.log10(all_mice["yl32"]))

# Compute daily summaries
summary = (all_mice.groupby("day")["log10_yl32"]
           .agg(mean="mean", median="median")
           .reset_index())

# Create figure
fig, ax = plt.subplots(figsize=(10, 6))

# Add jittered scatter points for each replicate
rng = np.random.default_rng(seed=42)
first = True
for day, subset in all_mice.groupby("day"):
    jitter = rng.uniform(-0.4, 0.4, len(subset))
    label = "Mouse replicates" if first else None
    ax.scatter(day + jitter, subset["log10_yl32"],
               color="steelblue", alpha=0.7, s=60, label=label)
    first = False

# Overlay mean and median lines
ax.plot(summary["day"], summary["mean"],
        color="black", linewidth=2.5, marker="o", markersize=8, label="Daily mean")
ax.plot(summary["day"], summary["median"],
        color="black", linestyle="--", linewidth=2.5, marker="s", markersize=6, label="Daily median")

# Labels and styling
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("log10(YL32 abundance)", fontsize=12)
ax.set_title("Daily log10 YL32 with mean/median overlays", fontsize=14, fontweight="bold")
ax.legend(fontsize=10)
ax.grid(alpha=0.3, linestyle="--")

# Save and display
plt.tight_layout()
plt.savefig("first_day/plots/all_mice_log10_jitter.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_mice_log10_jitter.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. Why do we add jitter to the x-axis?")
print("2. When do mean and median diverge most?")
print("3. What does this tell you about outliers or skewness?")
print("4. Which summary statistic (mean or median) better represents the trend?")
