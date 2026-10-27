# Panel c: qPCR distribution

From `example_plot`, run `Rscript panel_c/plot.R` (R and ggplot2).
It reads `dataset.csv` and overwrites `figure.pdf` and `figure.png` here.

The 16 rows contain `mouse_id`, `day`, `condition`, `YL32` and `log10 YL32`
from the day 9 course data. Each point is one mouse (four per group).
Boxes show ggplot2 quartiles and median; whiskers reach the most extreme values
within 1.5 IQR. All observations appear as points; separate outlier symbols
are suppressed to avoid double counting. Horizontal jitter has fixed seed 31
and does not change measured values.

Deliberate design issues: default grey background, angled group labels,
large points, thin box outlines and another treatment palette.
See the parent README for provenance and full reproduction instructions.
