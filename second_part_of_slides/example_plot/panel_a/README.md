# Panel a: qPCR time course

From `example_plot`, run `Rscript panel_a/plot.R` (base R only).
It reads `dataset.csv` and overwrites `figure.pdf` and `figure.png` here.

The 243 rows contain `mouse_id`, `day`, `condition`, raw `YL44` abundance and
the source `log10 YL44` values from the Day 1/Day 2 course table. Lines connect
group means of log10 abundance at the actual numeric study days. Each group
has four mice through day 9; controls have three thereafter. Repeated days
belong to the same mice. No error bands or statistical tests are shown.

Deliberate design issues: thick unequal lines, serif text, boxed axes,
crowded legend and treatment colours that change in the other panels.
See the parent README for source provenance and full reproduction instructions.
