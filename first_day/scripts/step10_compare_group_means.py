"""
Step 10: Compare group-level mean trajectories

Learning goals:
- Aggregate data across multiple levels (group + day)
- Create comparison plots for treatment effects
- Interpret relative suppression vs control
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load and transform
all_groups = pd.read_csv("first_day/data/yl32_all_groups.csv")
all_groups = all_groups.assign(log10_yl32=np.log10(all_groups["yl32"]))

# Compute group-level means by day
summary = (all_groups
           .groupby(["group", "day"])["log10_yl32"]
           .mean()
           .reset_index()
           .rename(columns={"log10_yl32": "mean_log10_yl32"}))

print("Group-level mean trajectories:")
print(summary)
print("\n" + "="*60 + "\n")

# Create comparison plot
fig, ax = plt.subplots(figsize=(11, 6))

# Define colors for clarity
colors = {"vancomycin": "crimson", "ampicillin": "dodgerblue",
          "metronidazole": "green", "water": "gray"}

for group, subset in summary.groupby("group"):
    color = colors.get(group, "black")
    ax.plot(subset["day"], subset["mean_log10_yl32"],
            marker="o", linewidth=2.5, markersize=8,
            label=group, color=color)

# Labels and styling
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("Mean log10(YL32 abundance)", fontsize=12)
ax.set_title("Mean log10 YL32 trajectories by treatment group",
             fontsize=14, fontweight="bold")
ax.legend(title="Treatment", fontsize=11)
ax.grid(alpha=0.3, linestyle="--")

plt.tight_layout()
plt.savefig("first_day/plots/all_groups_log10_mean.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_groups_log10_mean.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. Which treatment suppresses YL32 most strongly relative to water?")
print("2. At what day do treatment groups begin to diverge from water?")
print("3. Do any treatments enrich YL32 compared to water?")
print("4. What would a statistical test (e.g., t-test) tell us beyond this plot?")
