# Panel f: qPCR scatterplot

From `example_plot`, run `python3 panel_f/plot.py` (pandas and Matplotlib).
It reads `dataset.csv` and overwrites `figure.pdf` and `figure.png` here.

The 16 rows contain `mouse_id`, `day`, `condition`, `YL44`, `log10 YL44`,
`I48` and `log10 I48` at day 9. Each point pairs two taxon measurements from
the same mouse, four mice per group. Supplied log10 values are used unchanged.
No regression, correlation test or causal claim is added. The YL44 values
match panel b and the corresponding day 9 values in panel a.

Deliberate design issues: serif text, very thin axes, large markers, tiny
legend and treatment colours/order that differ from the other panels.
See the parent README for provenance and full reproduction instructions.
