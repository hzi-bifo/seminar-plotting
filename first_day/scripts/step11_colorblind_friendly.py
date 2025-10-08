"""
Step 11: Color schemes and colorblind-friendly visualization

Learning goals:
- Understand the importance of accessible color choices
- Use colorblind-friendly palettes
- Implement best practices for categorical and sequential data
- Test your plots with colorblind simulation
- Use patterns and markers in addition to color

Color blindness affects ~8% of men and ~0.5% of women (red-green most common)
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches

# Load data
all_groups = pd.read_csv("first_day/data/yl32_all_groups.csv")
all_groups = all_groups.assign(log10_yl32=np.log10(all_groups["yl32"]))

# Compute group means
summary = (all_groups
           .groupby(["group", "day"])["log10_yl32"]
           .mean()
           .reset_index()
           .rename(columns={"log10_yl32": "mean_log10_yl32"}))

# =============================================================================
# Example 1: AVOID - Default/problematic colors
# =============================================================================
print("=" * 70)
print("BAD EXAMPLE: Using problematic color combinations")
print("=" * 70)
print()

fig, ax = plt.subplots(figsize=(11, 6))

# These colors are hard to distinguish for people with red-green colorblindness
bad_colors = {
    "Vancomycin": "red",        # ❌ Red-green pairs are problematic
    "Ciprofloxacin": "green",   # ❌
    "Tetracyclin": "brown",     # ❌ Similar to red for some types
    "water": "darkgreen"        # ❌ Multiple greens
}

for group, subset in summary.groupby("group"):
    ax.plot(subset["day"], subset["mean_log10_yl32"],
            marker="o", linewidth=2.5, markersize=8,
            label=group, color=bad_colors[group])

ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("Mean log10(YL32 abundance)", fontsize=12)
ax.set_title("❌ AVOID: Red-green color scheme (problematic for ~8% of viewers)",
             fontsize=13, fontweight="bold", color="darkred")
ax.legend(title="Treatment", fontsize=11)
ax.grid(alpha=0.3, linestyle="--")

plt.tight_layout()
plt.savefig("first_day/plots/colors_bad_example.png", dpi=150, bbox_inches="tight")
print("Saved: first_day/plots/colors_bad_example.png")
print()

# =============================================================================
# Example 2: GOOD - Colorblind-friendly palette (Okabe-Ito)
# =============================================================================
print("=" * 70)
print("GOOD EXAMPLE: Okabe-Ito colorblind-safe palette")
print("=" * 70)
print()

fig, ax = plt.subplots(figsize=(11, 6))

# Okabe-Ito palette - designed for colorblind accessibility
# Reference: https://jfly.uni-koeln.de/color/
okabe_ito = {
    "Vancomycin": "#E69F00",    # Orange
    "Ciprofloxacin": "#56B4E9", # Sky Blue
    "Tetracyclin": "#009E73",   # Bluish Green
    "water": "#999999"          # Gray
}

for group, subset in summary.groupby("group"):
    ax.plot(subset["day"], subset["mean_log10_yl32"],
            marker="o", linewidth=2.5, markersize=8,
            label=group, color=okabe_ito[group])

ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("Mean log10(YL32 abundance)", fontsize=12)
ax.set_title("✅ GOOD: Okabe-Ito colorblind-friendly palette",
             fontsize=13, fontweight="bold", color="darkgreen")
ax.legend(title="Treatment", fontsize=11)
ax.grid(alpha=0.3, linestyle="--")

plt.tight_layout()
plt.savefig("first_day/plots/colors_okabe_ito.png", dpi=150, bbox_inches="tight")
print("Saved: first_day/plots/colors_okabe_ito.png")
print()

# =============================================================================
# Example 3: EXCELLENT - Colors + distinct markers and line styles
# =============================================================================
print("=" * 70)
print("EXCELLENT: Colors + distinct markers/line styles for redundancy")
print("=" * 70)
print()

fig, ax = plt.subplots(figsize=(11, 6))

# Combine color with marker/line style for maximum accessibility
style_map = {
    "Vancomycin": {"color": "#E69F00", "marker": "o", "linestyle": "-"},   # Orange, circle, solid
    "Ciprofloxacin": {"color": "#56B4E9", "marker": "s", "linestyle": "--"},  # Blue, square, dashed
    "Tetracyclin": {"color": "#009E73", "marker": "^", "linestyle": "-."},# Green, triangle, dashdot
    "water": {"color": "#999999", "marker": "D", "linestyle": ":"}         # Gray, diamond, dotted
}

for group, subset in summary.groupby("group"):
    style = style_map[group]
    ax.plot(subset["day"], subset["mean_log10_yl32"],
            color=style["color"],
            marker=style["marker"],
            linestyle=style["linestyle"],
            linewidth=2.5,
            markersize=8,
            label=group)

ax.set_xlabel("Day", fontsize=12)
ax.set_ylabel("Mean log10(YL32 abundance)", fontsize=12)
ax.set_title("✅✅ EXCELLENT: Color + marker + line style for redundant encoding",
             fontsize=13, fontweight="bold", color="darkgreen")
ax.legend(title="Treatment", fontsize=11)
ax.grid(alpha=0.3, linestyle="--")

plt.tight_layout()
plt.savefig("first_day/plots/colors_redundant_encoding.png", dpi=150, bbox_inches="tight")
print("Saved: first_day/plots/colors_redundant_encoding.png")
print()

# =============================================================================
# Example 4: Sequential data - Using perceptually uniform colormaps
# =============================================================================
print("=" * 70)
print("BONUS: Sequential colormaps for continuous data")
print("=" * 70)
print()

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Plot the same data with different colormaps
colormaps = [
    ("viridis", "✅ Viridis (perceptually uniform)", "darkgreen"),
    ("cividis", "✅ Cividis (optimized for CVD)", "darkgreen"),
    ("jet", "❌ Jet (DO NOT USE - perceptually non-uniform)", "darkred")
]

# Create a simple heatmap of mean abundance over time
pivot_data = summary.pivot(index="group", columns="day", values="mean_log10_yl32")

for ax, (cmap, title, title_color) in zip(axes, colormaps):
    im = ax.imshow(pivot_data.values, aspect="auto", cmap=cmap, interpolation="nearest")
    ax.set_xticks(range(len(pivot_data.columns)))
    ax.set_xticklabels(pivot_data.columns)
    ax.set_yticks(range(len(pivot_data.index)))
    ax.set_yticklabels(pivot_data.index)
    ax.set_xlabel("Day", fontsize=10)
    ax.set_ylabel("Treatment", fontsize=10)
    ax.set_title(title, fontsize=10, fontweight="bold", color=title_color)
    plt.colorbar(im, ax=ax, label="log10(YL32)")

plt.tight_layout()
plt.savefig("first_day/plots/colors_sequential_comparison.png", dpi=150, bbox_inches="tight")
print("Saved: first_day/plots/colors_sequential_comparison.png")
print()

# =============================================================================
# Reference: Common colorblind-friendly palettes
# =============================================================================
print("=" * 70)
print("REFERENCE: Colorblind-friendly palette cheat sheet")
print("=" * 70)
print()

fig, ax = plt.subplots(figsize=(12, 8))
ax.axis('off')

palettes = {
    "Okabe-Ito (8 colors)": [
        "#E69F00", "#56B4E9", "#009E73", "#F0E442",
        "#0072B2", "#D55E00", "#CC79A7", "#999999"
    ],
    "Tol Bright (7 colors)": [
        "#4477AA", "#EE6677", "#228833", "#CCBB44",
        "#66CCEE", "#AA3377", "#BBBBBB"
    ],
    "Tol Muted (10 colors)": [
        "#332288", "#88CCEE", "#44AA99", "#117733", "#999933",
        "#DDCC77", "#CC6677", "#882255", "#AA4499", "#DDDDDD"
    ],
    "IBM Design (8 colors)": [
        "#648FFF", "#785EF0", "#DC267F", "#FE6100",
        "#FFB000", "#000000", "#FFFFFF", "#648FFF"
    ]
}

y_pos = 0.95
for palette_name, colors in palettes.items():
    # Palette name
    ax.text(0.02, y_pos, palette_name, fontsize=13, fontweight="bold",
            transform=ax.transAxes, verticalalignment='top')

    # Color swatches
    for i, color in enumerate(colors):
        rect = mpatches.Rectangle((0.02 + i * 0.11, y_pos - 0.08),
                                   0.10, 0.05,
                                   facecolor=color, edgecolor='black',
                                   transform=ax.transAxes)
        ax.add_patch(rect)
        # Show hex code
        ax.text(0.07 + i * 0.11, y_pos - 0.105, color,
                fontsize=7, ha='center', transform=ax.transAxes)

    y_pos -= 0.18

# Add best practices text
y_pos -= 0.05
ax.text(0.02, y_pos, "✅ BEST PRACTICES:", fontsize=12, fontweight="bold",
        color="darkgreen", transform=ax.transAxes)
practices = [
    "• Use 3-8 distinct colors maximum (more = harder to distinguish)",
    "• Add redundant encoding: markers, line styles, patterns, labels",
    "• Test your plots with colorblind simulators (e.g., Color Oracle)",
    "• Use perceptually uniform colormaps: viridis, cividis, plasma",
    "• Avoid: red-green pairs, rainbow/jet colormaps, low contrast",
    "• Consider grayscale: will it still be understandable?",
    "• Use text labels when possible instead of relying only on color"
]
y_pos -= 0.03
for practice in practices:
    ax.text(0.04, y_pos, practice, fontsize=10, transform=ax.transAxes)
    y_pos -= 0.04

plt.savefig("first_day/plots/colors_palette_reference.png", dpi=150, bbox_inches="tight")
print("Saved: first_day/plots/colors_palette_reference.png")
print()

# =============================================================================
# Discussion and Resources
# =============================================================================
print("=" * 70)
print("DISCUSSION QUESTIONS:")
print("=" * 70)
print()
print("1. Why is red-green the most problematic color combination?")
print("   → Most common form of colorblindness (deuteranopia/protanopia)")
print()
print("2. What is 'redundant encoding' and why is it important?")
print("   → Using multiple visual channels (color + shape + line style)")
print("   → Ensures information is accessible even if one channel fails")
print()
print("3. When should you use sequential vs categorical color schemes?")
print("   → Sequential: continuous/ordered data (temperature, abundance)")
print("   → Categorical: discrete groups (treatment, species)")
print()
print("4. How can you test if your plot is colorblind-friendly?")
print("   → Use colorblind simulators (Color Oracle, Coblis)")
print("   → Convert to grayscale and check readability")
print("   → Ask colleagues for feedback")
print()
print("=" * 70)
print("RECOMMENDED RESOURCES:")
print("=" * 70)
print()
print("📚 Okabe & Ito palette guide:")
print("   https://jfly.uni-koeln.de/color/")
print()
print("📚 Paul Tol's color schemes:")
print("   https://personal.sron.nl/~pault/")
print()
print("🔧 Color Oracle (colorblind simulator):")
print("   https://colororacle.org/")
print()
print("🔧 Coblis (online colorblind simulator):")
print("   https://www.color-blindness.com/coblis-color-blindness-simulator/")
print()
print("📖 Matplotlib colormap reference:")
print("   https://matplotlib.org/stable/tutorials/colors/colormaps.html")
print()
print("📖 Scientific color maps (Fabio Crameri):")
print("   https://www.fabiocrameri.ch/colourmaps/")
print()
print("=" * 70)
print("EXERCISE FOR STUDENTS:")
print("=" * 70)
print()
print("1. Go back to your assignment plots and check the colors you used")
print("2. Replace any problematic colors with an Okabe-Ito palette")
print("3. Add distinct markers or line styles for each group")
print("4. Test your plot in grayscale (use: plt.gray())")
print("5. Compare before/after and note the differences")
print()
print("✅ All plots saved to: first_day/plots/")
