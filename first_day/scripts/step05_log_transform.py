"""
Step 5: Apply log10 transformation and plot

Learning goals:
- Understand why log transformations are useful for abundance data
- Use numpy for mathematical transformations
- Create new columns with .assign()
- Compare raw vs log-scale visualizations
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load data
all_mice = pd.read_csv("first_day/data/yl32_vancomycin.csv")

# Apply log10 transformation
all_mice = all_mice.assign(log10_yl32=np.log10(all_mice["yl32"]))

# Preview the transformation
print("Raw vs log10-transformed values:")
print(all_mice[["day", "mouse", "yl32", "log10_yl32"]].head(10))
print("\n" + "="*60 + "\n")

# Create figure
fig, ax = plt.subplots(figsize=(10, 6))

# Plot each mouse with log10 values
for mouse, subset in all_mice.groupby("mouse"):
    ax.plot(subset["day"], subset["log10_yl32"],
            marker="o", linewidth=2, markersize=6, label=mouse)

# Labels and title
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("log10(YL32 abundance)", fontsize=12)
ax.set_title("YL32 over time by mouse (log10 scale)", fontsize=14, fontweight="bold")

# Add legend and grid
ax.legend(title="Mouse", fontsize=10)
ax.grid(alpha=0.3, linestyle="--")

# Save and display
plt.tight_layout()
plt.savefig("first_day/plots/all_mice_log10.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_mice_log10.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. How does the log10 scale make patterns more visible?")
print("2. What does a log10 value of 5 mean in raw counts?")
print("3. Can you now see the dynamics for all mice more clearly?")
print("4. What do you notice about the shape of recovery after treatment?")
