# Panel e: Day 2 SNP heatmap

From `example_plot`, run `Rscript panel_e/plot.R` (base R only).
It reads `dataset.csv` and overwrites `figure.pdf` and `figure.png` here.

The 80 rows are a subset of the Day 2 heatmap assignment: all five YL44 SNPs,
four mice (one per group), at days 0, 9, 30 and 79. Columns in the CSV:
`Genome`, `snp_id`, `Position` (source genomic coordinate), `value` (SNP frequency,
0–1), `mouse_id`, `day`, `treatment_group`.

The figure shows five SNP rows by 16 mouse/day columns, ordered by numeric day
then mouse ID. No values are scaled, clustered or imputed. These are repeated
samples from four mice, not 16 independent mice. Columns are labelled group/day:
C = Control (1683), Ci = Ciprofloxacin (1688), T = Tetracyclin (1692),
V = Vancomycin (1699). The same mice occur in the abundance source table, but
this is a different assay: SNP frequency is not qPCR abundance.

Deliberate design issues: rainbow colours, small labels, no treatment annotation
strip and time-interleaved groups. See the parent README for provenance and
full reproduction instructions.
