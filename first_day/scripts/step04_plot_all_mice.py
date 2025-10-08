"""
Step 4: Overlay all mice in a single plot

Learning goals:
- Use .groupby() to iterate over subsets
- Add multiple lines to one plot
- Create and position a legend
- Identify visualization challenges with raw-scale data
"""

import pandas as pd
import matplotlib.pyplot as plt

# Load data
all_mice = pd.read_csv("first_day/data/yl32_vancomycin.csv")

# Create figure
fig, ax = plt.subplots(figsize=(10, 6))

# Plot each mouse as a separate line
for mouse, subset in all_mice.groupby("mouse"):
    ax.plot(subset["day"], subset["yl32"],
            marker="o", linewidth=2, markersize=6, label=mouse)

# Labels and title
ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("YL32 abundance (raw counts)", fontsize=12)
ax.set_title("YL32 over time by mouse (raw scale)", fontsize=14, fontweight="bold")

# Add legend
ax.legend(title="Mouse", fontsize=10)
ax.grid(alpha=0.3, linestyle="--")

# Save and display
plt.tight_layout()
plt.savefig("first_day/plots/all_mice_raw.png", dpi=150, bbox_inches="tight")
print("Plot saved to: first_day/plots/all_mice_raw.png")
plt.show()

# Discussion questions
print("\nDISCUSSION QUESTIONS:")
print("1. Which mouse has the highest peak abundance?")
print("2. Can you easily see the dynamics for mice with lower abundance?")
print("3. What visualization problem does the wide range create?")
print("4. How might a log transformation help?")
