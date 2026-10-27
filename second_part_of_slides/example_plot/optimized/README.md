# Redesigned six-panel figure

This folder is the optimized counterpart of the starting figure one level up.
It reads the **unchanged** panel CSVs from `../panel_a` … `../panel_f`, keeps
every observation, mouse identity, time point, the PCA preprocessing, the
0–1 SNP-frequency scale and the mean ± sample-SD definition, and changes only
the presentation. The design is written up in the companion design guide
(treatment colours, typography, line weights, axis limits, layout); all of its
numbers live in [`theme.json`](theme.json), which every script reads.

Outputs: [`figure_optimized.pdf`](figure_optimized.pdf) (vector, fonts
embedded, 180 × 124 mm) and [`figure_optimized.png`](figure_optimized.png)
(600 dpi preview). Each `panel_*` folder has its own `figure.pdf` / `figure.png`
plus a CSV of exactly what was drawn (`group_means.csv`, `group_summary.csv`,
`pca_scores.csv` + `pca_variance.csv`, `heatmap_matrix.csv`).

## Reproduce

Same requirements as the parent folder (Python ≥ 3.10 with numpy, pandas,
matplotlib, PyMuPDF; R ≥ 4.1 with ggplot2 and jsonlite). From `example_plot`:

```sh
python3 optimized/render_all.py
```

This runs the six panel scripts, `legend.py`, `assemble.py` and then
`verify.py`, which recomputes every plotted quantity from the original CSVs
and inspects the PDF (fonts, text sizes, nothing clipped, no abbreviations,
no statistics annotations). Single panels: `Rscript optimized/panel_a/plot.R`,
`python3 optimized/panel_b/plot.py`, …

## Files

| File | Role |
| --- | --- |
| `theme.json` | Every design constant: group order, names, colours, marker shapes, sequential ramp, font, text sizes, line widths, marker size, panel and page geometry, axis limits and ticks, panel-letter style, panel b style |
| `theme.R`, `theme.py` | Read the theme and give base R, ggplot2 and Matplotlib the same margins, fonts, sizes and unit conversions (calibrated so 1 pt and 1 mm mean the same thing in all three) |
| `panel_a/plot.R` | YL44 time course, base R |
| `panel_b/plot.py` | Day 9 YL44 mean ± SD with individual mice, Matplotlib |
| `panel_c/plot.R` | Day 9 YL32 box plot with every mouse, ggplot2 |
| `panel_d/plot.py` | Day 9 PCA, NumPy SVD + Matplotlib |
| `panel_e/plot.R` | YL44 SNP-frequency heatmap, base R |
| `panel_f/plot.py` | Day 9 YL44 vs I48, Matplotlib |
| `legend.py` | The one shared treatment legend |
| `assemble.py` | Places legend and panels at scale 1 on the page, adds panel letters, writes PDF and PNGs |
| `verify.py` | Data and typography checks against the originals |

## What changed and why

Shared across all panels

- **One treatment palette and order everywhere**: Control grey `#4D4D4D`,
  Ciprofloxacin blue `#0072B2`, Tetracyclin orange `#E69F00`, Vancomycin
  reddish purple `#CC79A7` (Okabe–Ito hues; the three antibiotic hues pass
  protan/deutan/tritan separation checks). The starting panels used five
  palettes, including red/green pairs, and Control switched between red, blue,
  black and yellow. Each group also has a fixed marker shape (circle, square,
  triangle, diamond) so identity never rests on colour alone.
- **Full group names in a fixed order** (Control, Ciprofloxacin, Tetracyclin,
  Vancomycin) replace VAN/CTRL/CIP/TET, water/Cipro/Tetra/Vanco and C/Ci/T/V.
  The source spelling *Tetracyclin* is kept; change `labels` in the theme if
  the journal wants *Tetracycline*.
- **One font** (Arial, embedded) at 7 pt ticks, 8 pt axis titles, 6.5 pt
  notes, 10 pt bold lowercase panel letters placed by one routine. The
  starting figure mixed serif, sans and monospace, titles from 9 to 16 pt and
  six different panel-letter styles.
- **One shared legend** at the top instead of four differently ordered
  per-panel legends. Panel e keeps its own colour bar because that scale
  belongs to it alone.
- **Lines and marks**: 0.5 pt L-shaped axes (no boxes, no grids, no grey or
  tinted backgrounds), 1 pt data lines, 1.6 mm markers with a 0.3 pt black
  edge (1.1 mm in the 64-point time course), 0.75 pt error bars.
- **Layout**: 180 mm double-column page, 2 × 3 grid of 54 × 52 mm panels,
  equal 6/7 mm gutters, identical inner margins (12 mm left, 9 mm bottom,
  3 mm top, 3 mm right), so y axes align within a column and x axes within a
  row. Panel PDFs are placed at scale 1, so a point size in the script is the
  point size on the page.
- **Panel titles removed**; what each panel shows is in the axis titles and
  belongs in the figure legend text. Short notes that a reader needs to
  interpret the marks are kept at 6.5 pt (`mean ± SD, n = 4 mice per group`,
  `group means, n = 3 to 4 mice per group`, `n = 4 mice per group`,
  `day 9, one point per mouse`).

Axes

- **Shared**: the log10 YL44 axis in a (y), b (y) and f (x) uses 9.8–12.0 with
  ticks every 0.5. Same taxon, same supplied values, so day-9 means in b can
  be read against the time course in a.
- **Not shared**: YL32 in c (4–11; a different taxon spanning six log units),
  I48 in f (10.2–12.2), the PCA scores in d (unitless; −5–5 and −4–4), and the
  SNP frequency in e (0–1 colour scale, a different assay). Panels d and f are
  drawn with equal unit length on both axes.
- **Panel b** no longer draws bars from zero on a log10 axis (a factor-7
  difference occupied 6 % of the bar height). It shows the identical means and
  sample SDs as a filled marker with an error bar on the shared axis, with the
  four mice behind it as open markers at fixed offsets (no random jitter).
  `"panel_b_style": "bars_from_zero"` in the theme restores bars.

Per panel

- **a**: four line widths → one; boxed frame → L axes; serif → Arial; markers
  at the 16 measured days; y range 8–13.1 → shared 9.8–12.0; legend removed.
- **c**: grey theme → white; 28° labels → horizontal, on two alternating lines
  so full names fit; 2.7 mm points → shared markers; box fill at 35 % opacity
  with 0.5 pt black outline; ggplot2 statistics, whiskers and the fixed-seed
  jitter (seed 31, width 0.09) unchanged.
- **d**: monospace, tinted background and grid removed; axis titles state
  "% of variance"; scores and variance exported to this folder and checked
  against the originals (sign flips allowed).
- **e**: rainbow → single-hue green ramp over the full 0–1 range (`sequential`
  in the theme); columns regrouped by treatment, then day, with a 2 mm
  treatment strip above the cells and 1 mm gaps between the four blocks; the
  interleaved C/0 … codes and footnotes → day labels (two alternating lines)
  under each block; SNP ids at 6.5 pt, horizontal colour bar below.
- **f**: serif → Arial; legend removed; 95 pt² markers → shared markers; x on
  the shared YL44 axis; equal aspect.

Things deliberately not done: no error bands in a, no significance tests,
p-values, regression or correlation lines, no group ellipses in d, no scaling
or clustering in e, no recomputation of the supplied log10 columns.

## Verification

`verify.py` passes (run it after any edit). It confirms the row counts, the 64
group/day means in a, the means and ddof = 1 SDs in b, the PCA scores and
explained variance in d, all 80 heatmap cells and their 0–1 range in e, the
identity of the YL44 values in b and f, plus fonts, sizes, page size and the
absence of abbreviations or statistical annotations in the final PDF.
