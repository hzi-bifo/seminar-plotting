"""Shared theme helpers for the Matplotlib panels. Every number comes from theme.json."""
from pathlib import Path
import json
import os
import tempfile

os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "example-plot-matplotlib"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = Path(__file__).resolve().parent            # optimized/
DATA = OUT.parent                                # example_plot/ (original CSVs, unchanged)
TH = json.loads((OUT / "theme.json").read_text())
GROUPS = TH["groups"]
PAL = {g: TH["colors"][g] for g in GROUPS}
MARKERS = {g: {"circle": "o", "square": "s", "triangle": "^", "diamond": "D"}[TH["shapes"][g]] for g in GROUPS}
MM = 72 / 25.4                                   # points per mm


def marker_area(mm):
    """Matplotlib scatter `s` is the marker width in points, squared."""
    return (mm * MM) ** 2


def apply_rcparams():
    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.sans-serif": [TH["font"]["family"], *TH["font"]["fallback"]],
        "pdf.fonttype": 42, "ps.fonttype": 42,
        "font.size": TH["size_pt"]["tick"],
        "axes.labelsize": TH["size_pt"]["axis_title"], "axes.titlesize": TH["size_pt"]["axis_title"],
        "xtick.labelsize": TH["size_pt"]["tick"], "ytick.labelsize": TH["size_pt"]["tick"],
        "legend.fontsize": TH["size_pt"]["legend"],
        "axes.linewidth": TH["lw_pt"]["axis"], "lines.linewidth": TH["lw_pt"]["line"],
        "xtick.major.width": TH["lw_pt"]["axis"], "ytick.major.width": TH["lw_pt"]["axis"],
        "xtick.major.size": TH["tick_mm"] * MM, "ytick.major.size": TH["tick_mm"] * MM,
        "xtick.direction": "out", "ytick.direction": "out",
        "axes.spines.top": False, "axes.spines.right": False,
        "axes.edgecolor": "black", "text.color": "black", "axes.labelcolor": "black",
        "xtick.color": "black", "ytick.color": "black",
        "axes.unicode_minus": True, "savefig.transparent": False, "figure.facecolor": "white",
    })


def new_panel(margins=None, plot_height_mm=None):
    """Panel-sized figure with absolute inner margins in mm, so axes line up across panels.

    plot_height_mm shrinks the plot area from the top (bottom edge stays put), used by the
    equal-aspect panels d and f so that one data unit has the same length on both axes."""
    apply_rcparams()
    pm = dict(TH["panel_mm"]); pm.update(margins or {})
    w, h = pm["width"], pm["height"]
    pm["plot_w"] = w - pm["margin_left"] - pm["margin_right"]
    pm["plot_h"] = plot_height_mm or (h - pm["margin_top"] - pm["margin_bottom"])
    fig = plt.figure(figsize=(w / 25.4, h / 25.4))
    ax = fig.add_axes([pm["margin_left"] / w, pm["margin_bottom"] / h, pm["plot_w"] / w, pm["plot_h"] / h])
    return fig, ax, pm


def place_titles(ax, pm):
    """Axis titles at fixed distances (mm) from the axis lines, matching the base R panels."""
    ax.yaxis.set_label_coords(-TH["title_offset_mm"]["y"] / pm["plot_w"], 0.5)
    ax.xaxis.set_label_coords(0.5, -TH["title_offset_mm"]["x"] / pm["plot_h"])


def note(ax, text, x=0.02, y=0.98, ha="left", va="top"):
    ax.text(x, y, text, transform=ax.transAxes, ha=ha, va=va,
            fontsize=TH["size_pt"]["note"], color=TH["note_color"])


def staggered_xticklabels(ax, positions, labels, line1_mm=2.6, line2_mm=5.3):
    """Full group names on alternating lines; never rotated."""
    ax.set_xticks(positions, [""] * len(positions))
    for i, (x, lab) in enumerate(zip(positions, labels)):
        ax.annotate(lab, (x, 0), xycoords=("data", "axes fraction"), ha="center", va="top",
                    xytext=(0, -(line1_mm if i % 2 == 0 else line2_mm) * MM), textcoords="offset points",
                    fontsize=TH["size_pt"]["tick"], annotation_clip=False)


def save_panel(fig, path):
    fig.savefig(path)
    plt.close(fig)
