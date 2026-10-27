# Panel b: qPCR endpoint summary

From `example_plot`, run `python3 panel_b/plot.py` (pandas and Matplotlib).
It reads `dataset.csv` and overwrites `figure.pdf` and `figure.png` here.

The 16 rows contain `mouse_id`, `day`, `condition`, `YL44` and `log10 YL44`
for day 9, four mice per group. This is exactly the day 9 subset of panel a.
Bars show arithmetic means of the supplied log10 values; error bars show
sample standard deviations (ddof=1). Raw Ct/Cq values are not available.

Deliberate design issues: another colour palette, abbreviated group names,
reordered groups, bold heading and dashed grid. The zero baseline compresses
the differences; discuss whether showing individual mice would help.
See the parent README for provenance and full reproduction instructions.
