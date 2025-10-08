"""
Step 2: Create your first line plot

Learning goals:
- Create a basic matplotlib figure and axis
- Plot time-series data with line and markers
- Add axis labels and title
- Save plot to file
"""

import pandas as pd
import matplotlib.pyplot as plt

# Load data
mouse1 = pd.read_csv("first_day/data/yl32_vancomycin_mouse1.csv")

# Create figure and axis
fig, ax = plt.subplots(figsize=(8, 5))

# Plot data
ax.plot(mouse1["day"], mouse1["yl32"], marker="o", linewidth=2, markersize=8)

# Add labels and title
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("YL32 abundance", fontsize=12)
ax.set_title("Mouse 1: YL32 over time", fontsize=14, fontweight="bold")

# Add grid for easier reading
ax.grid(alpha=0.3, linestyle="--")

# Save figure
plt.tight_layout()
plt.savefig("first_day/plots/mouse1_raw.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/mouse1_raw.png")

# Display
plt.show()

# Discussion questions:
print("\nDISCUSSION QUESTIONS:")
print("1. What pattern do you observe in the abundance over time?")
print("2. Around which day does the abundance change most dramatically?")
print("3. Try changing the marker style to 's' (square) - what happens?")
