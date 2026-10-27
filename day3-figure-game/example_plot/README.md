# Use generative tools: one figure, six different styles

This is the **unoptimized starting point** for Day 3. It reuses the course's
Day 1 bacterial-abundance (qPCR) data, Day 2 PCA inputs and Day 2 SNP heatmap
data. The measurements are existing course data, **not newly simulated data**.
The plotting scripts are new, deliberately inconsistent teaching examples.

Open `figure_unoptimized.pdf` for the combined vector figure or
`figure_unoptimized.png` for a preview. Each `panel_a` through `panel_f` folder
contains its own `dataset.csv`, plotting script, `figure.pdf`, `figure.png` and
short `README.md`. You can work on one panel without loading the other panels.

The final slide compares the starting figure with `reference/figure_optimized.png`,
the instructor-supplied optimized image, included unchanged. It can be viewed
side by side or one version at a time. This reference uses three columns and
two rows, an alternative to the example assembly prompt's two-column layout.
The bundled scripts recreate the starting figure; the optimized reference is
a supplied PNG and its source code is not part of this package.

| Panel | Plot | Earlier lesson | Code |
| --- | --- | --- | --- |
| a | YL44 abundance over time | Day 1: group summaries | Base R |
| b | Day 9 YL44 mean and SD | Day 1: qPCR summaries | Python / Matplotlib |
| c | Day 9 YL32 box plot and individual mice | Day 1: distributions | R / ggplot2 |
| d | Day 9 community PCA, 12 taxa | Day 2: PCA | Python / NumPy / Matplotlib |
| e | YL44 SNP-frequency heatmap | Day 2: heatmaps | Base R |
| f | Day 9 YL44 versus I48 abundance | Day 1: scatterplots | Python / Matplotlib |

## Recreate the figure

You need Python 3.10+ and R 4.1+ installed. In a terminal, change into this
`example_plot` folder and install the dependencies once:

```sh
python3 -m pip install -r requirements.txt
Rscript -e 'install.packages("ggplot2", repos="https://cloud.r-project.org")'
```

On Windows, use `python` instead of `python3` if that is your Python command.
`Rscript` must be on your PATH. Then run:

```sh
python3 render_all.py
```

This reads the included CSVs, runs the three R and three Python scripts,
recreates all six PDF/PNG pairs, assembles the combined figure and refreshes
`../example_plot.zip`. Existing figure exports are overwritten. Copy the folder
before redesigning it if you want to preserve the starting version.

To run just one panel, from `example_plot`:

```sh
Rscript panel_a/plot.R
python3 panel_b/plot.py
```

All panel scripts find their data relative to their own script location, so
they also work when called from another folder. R scripts are intended to be
run with `Rscript`. To rebuild only the layout after editing panel PDFs:

```sh
python3 assemble.py
```

`prepare_data.py` is optional. It rebuilds the six panel CSVs from the bundled,
unchanged `source_data` tables and overwrites the panel CSVs. It does not
generate random values. The complete ZIP works without the original course
repository, internet access or notebooks once dependencies are installed.

## What the data mean

The qPCR source is an unchanged copy of
`second_day_part1/data/mmc2.csv`, the CSV version of the abundance table used
on Day 1 (`day1/data/mmc2.xlsx`). The Day 2 assignment attributes this table to
[the course's source paper](https://doi.org/10.1016/j.chom.2023.05.013).
The heatmap source is an unchanged copy of
`second_day_part2/data/dataset1_subset_long.csv`, prepared by that module's
`00_prepare_dataset.Rmd`. These are two different assays; do not interpret
SNP frequency as abundance or gene expression.

- `mouse_id` identifies a mouse; `day` is the numeric study day. Repeated days
  from one mouse are repeated observations, not independent biological replicates.
- `condition` is the source `Group`, with `water` renamed to `Control` for
  display. `Tetracyclin` retains the original spelling.
- `YL44`, `YL32` and `I48` are the supplied abundance values; `log10 ...`
  columns are the supplied log-transformed values, kept without recomputation.
  These tables do not contain raw Ct/Cq measurements. This is not a delta-delta-Ct
  exercise, and no physical concentration unit is invented.
- Panels b, c, d and f use all 16 mice at day 9 (four per group).
  Panel a has four mice per group until day 9; controls have three thereafter.
  Group means in a are means of the log10 values; bars in b show those means
  with **sample SD**, not SEM or confidence intervals. There are no significance tests.
- Panel d centers and scales each of 12 log10 taxon columns to unit sample SD
  and computes PCA using SVD. The universal assay is excluded. It also exports
  `pca_scores.csv` and `pca_variance.csv`. PCA signs can flip across numerical
  libraries without changing the result.
- Panel e keeps all five YL44 SNPs and days 0, 9, 30 and 79, chosen as a compact
  teaching subset. It contains **one mouse per treatment group**, repeatedly
  sampled: 1683 (Control), 1688 (Ciprofloxacin), 1692 (Tetracyclin), 1699
  (Vancomycin). The 80 rows are five SNPs times 16 mouse/day samples, not 80
  independent mice. `value` is frequency on the original 0–1 scale. No row
  scaling, clustering, imputation or averaging is applied.

## Exercise: four queries, with artifact review before plotting

Create a schematic guide, inspect and improve it, generate reproducible panels,
then assemble the figure. Review each deliverable before moving on.

### 1. Create the first design-guide artifact

[Open the generated design guide in Claude](https://claude.ai/artifact/BL52eaBuPtS4jLjVEhsBCe).
Use this shared artifact for the inspection and feedback step below.

Give the first agent the exercise folder. Download the initial schematic artifact as `design_guide.html` and inspect it.

> Help plan the redesign of the six-panel figure in example_plot for a scientific manuscript.
>
> First read the README, datasets and plotting scripts to understand the panels. Your first deliverable is a separate visual design-guide artifact showing how the finished figure should look.
>
> Include treatment names and colours (with hex codes), marker shapes, line styles and widths, fonts and text sizes, axes and grid styling, uncertainty styling, a heatmap colour scale, legends, panel letters and spacing. Plan two columns and three rows: a/b at the top, c/d in the middle, e/f at the bottom. Design for a final width of 180 mm and specify sizes at that final scale.
>
> Use schematics only: colour swatches, marker and line samples, example labels, a schematic legend and empty panel frames. Label these as design examples. Do not replot the datasets, recreate the real panels, invent data patterns or edit the plotting scripts at this stage.
>
> Explain the choices and which axes could share limits versus which measure different quantities. Preserve the meaning of groups, shapes, transformations and uncertainty.
>
> Provide the guide as a downloadable, standalone design_guide.html with inline CSS and SVG schematics, no external assets or dependencies. It must open offline and contain the written design specifications as well as the visual examples. Deliver this artifact first and stop for review. Apply the agreed design to the actual plots only in a later step.

### 2. Inspect, comment and improve the artifact

Inspect colours, shapes, readability and layout, then add concrete comments to the prompt. Our example improvement adds useful editable SVG schematics. Review the revised guide and SVG assets, and repeat the feedback step as needed before plotting.

> I have inspected the first design-guide artifact. Revise the existing design_guide.html using my comments before we generate any plots.
>
> My review comments: [replace with your specific comments on colours, shapes, label sizes, spacing or layout, or write "none"]. Apply these comments and briefly explain what changed in response to each one. Preserve design choices I have not asked to change.
>
> Our example improvement is to add useful, editable SVG schematics to the guide. Read the panel READMEs, data descriptions and plotting scripts to understand the biological context before proposing graphics.
>
> Decide which panels, or which shared part of the figure, would benefit from a small contextual graphic. You choose the subjects, number and placement; do not add an icon to every panel by default. Prefer graphics that explain a biological entity, sampling scheme, measurement or connection between panels. Explain briefly what each proposed graphic helps the reader understand.
>
> Create original, editable SVG assets that fit the guide's palette, stroke widths and visual style. Use transparent backgrounds, simple vector shapes and paths, and no external dependencies or embedded raster images. Keep labels as editable text where practical. Check that the schematics are biologically plausible and do not imply an experimental step, causal relationship or result unsupported by the supplied materials. Label them as schematics.
>
> Show two layout options in the HTML guide using schematic panel frames and the proposed SVG graphics. Compare them at the intended 180 mm figure width, choose the clearer option and refine it. Check legibility, consistency, contrast, whitespace and whether the graphics compete with data or legends. Remove anything that adds clutter rather than context.
>
> Deliver a revised standalone design_guide.html with the SVG previews embedded, plus separate named files in graphics/. Include the chosen placement, dimensions in mm, relevant panel or shared location, and short integration notes for the plotting or assembly agent. Keep an untouched copy of the previous guide and summarise the changes. Do not modify datasets, analyses or plotting scripts at this stage. The deliverable is the refined guide and reusable SVG assets for review, ready to add to the real figure later.

### 3. Ask another agent to generate the panels

Attach the reviewed `design_guide.html`, the `graphics/` SVG files and the complete `example_plot` folder to another agent. It should deliver new plotting code and six separate, consistent panels.

> You are implementing an agreed figure design. I have attached design_guide.html and the example_plot folder with all six datasets, original plotting scripts and READMEs.
>
> If the reviewed guide includes contextual graphics, also use the supplied graphics/ SVG assets and placement notes. Add them only at the agreed locations, preserve their proportions, and keep them clear of data marks and labels.
>
> Read the standalone HTML guide, including its written specifications and schematic examples. Treat it as the design specification, not as measured data. Inspect the CSVs and original scripts before making changes.
>
> Create a new set of reproducible plotting scripts for panels a-f that follows the guide: treatment colours and names, marker shapes, line styles, fonts, final-size text, axes, grids, legends, heatmap scale and margins. Retain each panel's original R or Python language. Define reusable style settings in each language so that equivalent settings stay consistent across all panels.
>
> Read the original CSVs unchanged. Preserve every mouse and time point, repeated-measure identities, supplied log10 values, mean ± sample SD, PCA centering and scaling, and the heatmap's original 0-1 frequencies. Do not add statistical tests, observations or significance claims. Do not force the same numerical axes on different quantities. Flag any conflict between the guide and these requirements instead of silently changing the analysis.
>
> Save the new code and exports under optimized/panel_a through optimized/panel_f, leaving the originals intact. Run the scripts and export each panel as a vector PDF, SVG and PNG preview. Size panels for the guide's two-column layout at 180 mm total width; include space for labels and legends. Keep global panel letters for the assembly step.
>
> Provide optimized/render_panels.py (or an equivalent single command), dependency instructions, a short README and a record of checks showing that the plotted values and summaries still match the originals. Inspect every export for clipping and legibility. Deliver the six separate panels and their code for review; do not assemble the final figure yet.

### 4. Assemble the reviewed panels

Supply the same guide, SVG graphics and the reviewed `optimized/` folder, including vector exports and code. Arrange a/b on the top row, c/d in the middle and e/f on the bottom.

> Assemble the six reviewed panels into one manuscript figure. I have supplied design_guide.html and optimized/ containing panels a-f, their source code and vector exports.
>
> If the reviewed guide includes graphics/ SVG assets, include them at the agreed locations and sizes. Keep them as vectors, separate from measured evidence and clear of labels and legends.
>
> Use the guide's colours, typography, spacing and final-size specifications. Arrange two columns and three rows, read from left to right:
> Top row: a - YL44 qPCR time course; b - day 9 YL44 mean ± SD.
> Middle row: c - day 9 YL32 distribution; d - community PCA.
> Bottom row: e - YL44 SNP-frequency heatmap; f - YL44 versus I48 scatterplot.
>
> Use 180 mm total width, equal column widths, consistent outer margins and approximately 4 mm gutters. Start around 180 mm high and increase the height if labels need room. Align plotting areas within rows and columns, not just file boundaries. Place bold lowercase panel letters a-f consistently at the upper left of each panel. Keep labels at the guide's final printed size; do not shrink text simply to force the layout to fit.
>
> Use a shared treatment legend below the panel grid only where colours and shapes mean the same thing; retain any panel-specific keys and the heatmap's own frequency colourbar. Keep all axis labels, tick labels and units visible. Preserve aspect ratios and all data and analysis choices. If panel margins or label sizes need adjustment, update the plotting code and regenerate the affected panel instead of stretching or painting over it.
>
> Assemble from the vector PDF or SVG exports so text and lines remain vector content. Save reproducible assembly code, final/figure_combined.pdf and a 300 dpi final/figure_combined.png. Include a separate caption explaining each panel, group sizes, repeated measurements, mean ± SD, PCA preprocessing and the heatmap subset. State that the heatmap contains one mouse per group measured on four days; do not imply that it has the same replication as the day 9 abundance panels.
>
> Inspect the complete figure at its intended printed size. Check panel order, alignment, clipping, legend consistency, readability and that every panel matches its reviewed source. Provide the finished figure, caption and one command to rebuild it.

Start by finding colour changes between panels, inconsistent abbreviations and
legend order, mixed serif/sans/monospace fonts, unequal line widths, mismatched
panel letters, varying margins and the rainbow heatmap. Keep differences that
serve the data: a shared treatment palette does not mean sharing the same
numerical axis across abundance, PCA and SNP frequency.

Check the redesigned figure at its intended final size. Confirm that all
observations, groups, transformations and uncertainty definitions still match
the originals. The intentionally mismatched starting figure is the deliverable
here; students create the optimized version during the exercise.
