# Second Day – Part 2

This folder hosts the teaching flow for the Day 2 heatmap session. We use real data from *"Pulsed antibiotic treatments of gnotobiotic mice manifest in complex bacterial community dynamics and resistance effects"* (Cell Host & Microbe 2023; [manuscript link](https://www.cell.com/cell-host-microbe/fulltext/S1931-3128(23)00206-8?uuid=uuid%3Ad55d882d-27a9-4e3c-85c5-fe3a95079cf5)).

The materials are organized so that we first prepare the R environment, optionally rebuild the tidy datasets, then explore them with base R, and finally produce the ComplexHeatmap figure. Two ready-to-use CSV pairs are produced:

- `dataset1_subset.csv` / `dataset1_subset_long.csv` — two spotlight genomes (Akkermansia + Bacteroides).
- `dataset2_subset.csv` / `dataset2_subset_long.csv` — adds Turicimonas for extra practice/exercises.
- `dataset3_subset.csv` / `dataset3_subset_long.csv` — contains all genomes from the raw publication table.

## Session Outline

| Resource | Description | Learning goals | Solution file | Est. guided time |
| --- | --- | --- | --- | --- |
| `scripts/00_prepare.Rmd` | Installs/verifies the R packages used throughout the session. | Ensure everyone has `ComplexHeatmap`, `circlize`, and tidy helpers ready before class. | — | 10 min |
| `scripts/01_explore_data.Rmd` | Hands-on inspection of `dataset1_subset_long.csv` using only base R (counts, summaries, simple bar plots). | Practice `colnames()`, `head()`, `table()`, logical subsetting (`==`), `summary()`, `aggregate()`, and interpreting tables/plots of samples per mouse/day. | — | 30 min |
| `scripts/01_explore_data_exercises.Rmd` | Self-paced worksheet that mirrors the exploration steps on the three-genome dataset (`dataset2_subset_long.csv`) with prompts and TODO chunks. | Reinforce independent coding, reuse of `table()`/`aggregate()`/`barplot()`, and reasoning about logical filters. | `scripts/01_explore_data_exercises_solution.Rmd` | 20–30 min (self-paced) |
| `scripts/02_simple_heatmap.Rmd` | Minimal heatmap build (no annotations) from `dataset1_subset.csv`. | Understand the bare essentials of converting a wide table into a heatmap. | — | 15 min |
| `scripts/02_simple_heatmap_exercises.Rmd` | Self-paced build of the heatmap using the three-genome dataset (`dataset2_subset*.csv`) with TODO prompts. | Reinforce independent matrix construction, annotation setup, and PDF export; observe how Turicimonas changes the visualization. | `scripts/02_simple_heatmap_exercises_solution.Rmd` | 20–30 min (self-paced) |
| `scripts/03_heatmap_annotations.Rmd` | Full-featured heatmap with ordering, annotations, color tuning, and PDF export. | Learn to polish the heatmap for publication. | — | 30 min |
| `scripts/04_full_heatmap.Rmd` | Step-by-step expansion to the dataset3 (all genomes) heatmap with color experiments, ordering strategies, and final PDF export. | Practice incremental refinement on a larger matrix and document reproducible exports. | — | 30–40 min |
| `scripts/04_full_heatmap_exercises.Rmd` | Independent rebuild of the dataset3 heatmap with prompts for palette comparisons, variance filtering, and exports. | Solidify ComplexHeatmap mastery on a large matrix and record design rationales. | `scripts/04_full_heatmap_exercises_solution.Rmd` | 30–40 min (self-paced) |

Times assume a guided, interactive format where students type along and discuss
interpretations. Adjust as needed for your pace or audience.

### Batch Rendering

Use the helper script to render every Rmd (optionals included) into
`second_day_part2/html/` and `second_day_part2/pdf/`:

```
./second_day_part2/scripts/render_all.sh
```

The script renders each notebook to HTML and, for the heatmap lessons, also to
PDF. Adjust it if you want different output directories. If Pandoc is missing,
install it (or use RStudio) before running the script.

## Questions To Explore During Exercises

Use the three-genome dataset (`dataset2_subset_long.csv`) to investigate:

- Which genome contributes the most SNPs overall, and does that pattern change if you look at a single mouse?
- On which day do we record the fewest measurements, and is that consistent across genomes?
- For day 30 specifically, which genome shows the highest median `value`, and how stable is that ranking across mice?
- Do Turicimonas measurements cluster around specific mice or days (use `table(mouse_id, day)` plus a bar plot to justify your answer)?
- Are there SNP IDs that appear in more than one genome subset (explain why or why not based on the filtering step)?

Encourage students to write down both the code and the interpretation so they can present their findings back to the group.

## Optional Resources

- `data/00_prepare_dataset.Rmd`: Rebuilds the teaching datasets from the raw publication table.
