# Panel d: community PCA

From `example_plot`, run `python3 panel_d/plot.py` (NumPy, pandas, Matplotlib).
It reads `dataset.csv`, overwrites `figure.pdf` / `figure.png`, and writes
`pca_scores.csv` and `pca_variance.csv` for inspecting the derived values.

The 16 input rows contain mouse ID, day, condition and 12 supplied log10 taxon
abundances for day 9. All mice are retained. The universal assay is excluded.
Each taxon is centered and divided by its sample SD (ddof=1), then PCA is
computed with SVD. Axis labels report the percentage of variance explained.
Each point is one mouse; no group ellipses or statistical tests are added.
PCA axis signs may flip with a different numerical library.

Deliberate design issues: monospace lettering, tinted background, heavy grid,
different group aliases and colours, large markers and a small legend.
See the parent README for provenance and full reproduction instructions.
