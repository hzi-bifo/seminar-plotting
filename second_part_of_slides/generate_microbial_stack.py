"""Build the stacked-bar teaching example from the same composition CSV."""
import csv
from pathlib import Path

root = Path(__file__).resolve().parent
with (root / "data/microbial-composition.csv").open() as handle:
    rows = list(csv.DictReader(handle))
colors = ["#ffb7bb", "#edbe94", "#cfcb85", "#a7d38b", "#73d5b2",
          "#5ed1d1", "#80cdec", "#bfc6fa", "#e4b8ef", "#f7b0db"]
assert sum(float(row["percent"]) for row in rows) == 100
parts = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 750" role="img" aria-labelledby="title desc">',
         '<title id="title">Read composition as a 100% stacked bar</title>',
         '<desc id="desc">One microbiome sample. Taxa D, E and F comprise 10%, 8% and 7% of assigned reads. Segments have different starting positions.</desc>',
         '<rect width="1100" height="750" fill="white"/>',
         '<g font-family="Arial, sans-serif" fill="#111">',
         '<text x="550" y="55" text-anchor="middle" font-size="27" font-weight="bold">Read composition of one microbiome sample</text>']
start = 100
for row, color in zip(rows, colors):
    width = float(row["percent"]) * 9
    parts.append(f'<rect x="{start}" y="210" width="{width}" height="120" fill="{color}" stroke="#222" stroke-width="1.3"/>')
    start += width
for value in range(0, 101, 20):
    x = 100 + value * 9
    parts.append(f'<path d="M{x} 340v10" stroke="#333"/><text x="{x}" y="380" font-size="23" text-anchor="middle">{value}</text>')
parts.append('<text x="550" y="425" text-anchor="middle" font-size="25">Assigned reads (%)</text>')
for i, (row, color) in enumerate(zip(rows, colors)):
    x, y = 100 + (i % 5) * 185, 500 + (i // 5) * 65
    parts.append(f'<rect x="{x}" y="{y-20}" width="22" height="22" fill="{color}" stroke="#222"/><text x="{x+30}" y="{y}" font-size="21">{row["taxon"]}: {row["percent"]}%</text>')
parts.append('<text x="550" y="665" text-anchor="middle" font-size="23">One whole; the segments do not share a baseline.</text></g></svg>')
(root / "assets/biology-taxa-stacked.svg").write_text("\n".join(parts))
