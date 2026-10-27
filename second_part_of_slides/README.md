# Plots, independent Day 3 prototype

Open **index.html** in a browser. No server, installation, internet connection, course files, or build step is needed to play. Copy this whole folder elsewhere to keep it independent. Nothing is published automatically.

## Teaching flow

The main sequence contains 20 plots, selected for a small interpretive challenge rather than a conspicuous typo, missing label, or arithmetic mistake.

1. **Easy: spot the problem**, nine cases, including three additional guided walkthroughs (distribution, pairing, and heatmap). The original six cover: truncated bars, overlapping pie categories, circle areas, different denominators, missing observations shown as zero, and overlapping points. Each reveals a corrected version after answering; the overlapping-points case instead provides a five-stage scatterplot walkthrough.
2. **Simple good plots**, four examples: ranking, directly labelled lines, paired measurements, and aligned panels. Questions ask why the design supports a particular comparison.
3. **Same data, different plots**, seven comparisons covering distributions, pairing, time spacing, heatmap scales, ranking, biological replicates, and error-bar interpretation.
4. **Optional: complex figures**, a bacterial dual-axis comparison plus three paper/layout examples, separate from the main sequence.
5. **Biology design comparisons**, three same-data pairs: overlapping cell markers, microbial composition, and relative cell-line growth. Each gives feedback about which version supports the stated question.

All 42 cards work offline. External research links require internet. Retired examples remain in the source and assets for reuse, but are excluded from the game. The overlapping-category pie remains because it tests whether categories can form a whole; the pie with mismatched slice sizes remains excluded.

Ask students to vote before clicking. The cards are deliberately unscored. Revisit a card to retain its selected answer, or use **Overview → Reset answers** for a fresh session. Reloading also clears answers. All controls work with the keyboard. Source links open separately; use those to inspect full scientific captions.

The feedback intentionally distinguishes misleading encodings from valid displays that are less suitable for the given question. Dense is not synonymous with good. Neither journal prestige nor visual polish replaces checking the evidence.

## Files and editing

- `index.html`, `style.css`, `app.js`: standalone interface, navigation, and feedback.
- `content.js`: all questions, choices, feedback, citations, and discussion prompts.
- `assets/`: local figure images, including attributed published examples.
- `data/`: the original synthetic data shared by each comparison pair.
- `generate_plots.R`: reproducible original plots using base R only; seed 42. Run `Rscript generate_plots.R` **from this directory** to rebuild the teaching images and CSVs. It does not download or change the published figures.
- `generate_good_plots.R`: additional polished plots and diagnostic pairs using base R. Run `Rscript generate_good_plots.R` from this directory.
- `generate_biology_plots.R`: biological-replicate and error-bar comparisons.
- `generate_biology_replacements.R`: bacterial counts, cell markers, microbial composition, relative cell-line growth, and paired cytokine measurements. Each pair uses the same underlying data, also saved as CSV. Run either script from this directory with `Rscript`.
- `generate_scatter_walkthrough.R`: same-cell scatterplots with large points, smaller points, transparency, hollow points, and marginal histograms. Run from this directory with `Rscript`; coordinates are saved in `data/scatter-cells.csv`.
- `SOURCES.md`: provenance, reuse terms, and research notes.

The local deck includes Day 2 heatmap topics and Day 3 figure-design lessons, including a generative-tools exercise that revisits the earlier course data. No frameworks or external fonts, no tracking, and no persistence beyond the current page session.

## Data and interpretation

Most original figures are simulated teaching examples, not experimental results. The Section 11 generative-tools exercise instead reuses the existing Day 1 and Day 2 course datasets; see `example_plot/README.md` for provenance and sample structure. The distribution, pairing, time, heatmap, and ranking comparisons each use identical input data in both versions. The layout pair contains the same four panels with different allocations of space; its datasets are separate examples, not a single biological study. Box plots use base R defaults (median, hinges, whiskers up to 1.5 IQR). In the distribution point plot, horizontal lines indicate means.

The opening truncated bar and invalid pie are intentionally flawed. The independently scaled heatmaps and equally spaced visit plot are deliberate contrasts. Do not reuse those images as preferred design examples without their explanation.

If hosting later, retain the published-figure credits and licence links. No repository-wide licence is assumed for the new code; choose one before publishing it as a separate project.

## Suggested short lesson

Start with the overlapping-category pie, circle areas, and laboratory contamination rates. Discuss missing observations or overlapping points next. Use the good examples to ask what the design makes easy to compare, then choose one or two same-data pairs. Keep the complex paper figures optional.

Current collection: 9 diagnostics and walkthroughs, 4 good examples, 7 same-data comparisons, 4 optional complex figures, and 3 biology design comparisons plus 4 advanced walkthroughs plus one published follow-up (32 total). “Good” depends on the question and audience.

The employment/unemployment redesign is excluded. `generate_biology_plots.R` builds the two life-science additions from synthetic teaching measurements (also saved as CSV). These illustrate published guidance, rather than reproduce research findings.

Non-biological examples (including the Office for National Statistics and Full Fact cases) are excluded from the active game. Their assets and attribution records are retained for reference. Published life-science figures remain in the optional section.

The scatterplot walkthrough uses **Next step** and **Previous step** after answering. The selected step is retained when revisiting the plot and cleared by Reset answers. Hollow points are an alternative, not a guaranteed improvement; marginal histograms show each variable separately and do not replace the joint scatterplot.

`generate_more_walkthroughs.R` builds three four-stage examples: means → box plots → violins → violins with cells; means → dots → paired donors → changes; rainbow heatmap → diverging scale → meaningful ordering → contrast-aware numbers. Run from this directory with `Rscript`. All underlying measurements are saved in the corresponding `walkthrough-*.csv` files. The paired change view transforms values explicitly to after minus before; heatmap values are never row-scaled.

## Plot-type reference

The overview links to **What plot types are there?** (`#plot-types`): scatter, bar, line, histogram, box, violin, heatmap, paired, density, ternary, pie/donut, Venn, Sankey, and stacked bar plots. Each type has two biology examples, use guidance, a caveat, and a walkthrough link where applicable. This reference is separate from the 42-card quiz. `gallery.js` holds its content and rendering. `generate_gallery.R` creates the additional histogram and dose-distribution images and their synthetic CSVs; run from this directory using base R. All gallery images are original course examples and work offline.

## Advanced walkthroughs

The overview links directly to two seven-step lessons, also accessible through **Advanced: step-by-step improvements**. Time courses progress from twelve coloured traces to condition colours, faint individual lines, mean overlays, mean ± SD bands, shared-scale panels, and redundant shape/line encoding. Publication layout follows the same experiment across four panels, improving alignment, consistent visual meanings, legend placement, space, panel letters/caption, and final-size legibility.

`generate_advanced_walkthroughs.R` recreates all 14 images and `data/advanced-growth.csv` using base R (seed 204). Six independent cultures per condition are measured repeatedly at five times. The SD bands describe between-culture spread at each time, not inferential uncertainty. The initial layouts are intentionally awkward. Final PNGs are teaching previews; publication exports should use vector output or the journal’s required resolution.

The heatmap walkthrough also compares seven discrete colour bins against the continuous scale. Bin edges are −3, −2, −1, −0.5, 0.5, 1, 2, and 3; the central white bin denotes a range, not exactly zero. Exact values and the continuous scale return in the final step.

The colour, shape, and emphasis walkthrough compares seven encodings of the same 48 independent cultures (two conditions, four consecutive experimental days). `generate_emphasis_walkthrough.R` generates its figures and `visual-emphasis.csv` (seed 302). It distinguishes an encoding poorly matched to a question from incorrect data, and includes an alternative using panels and redundant condition encoding.

The publication walkthrough now has eight steps: align the numerical y-axis ranges before giving A full width above compact B–D panels. Baseline spread appears small on the common scale; D remains explicitly labelled as change.

The final emphasis step maps numeric experimental day to a continuous sequential colour scale, with condition encoded by shape. Only days 1–4 are observed, and cultures are independent across days; this is not a longitudinal four-day growth dataset.

The emphasis walkthrough ends with day on the x-axis and connected condition means, keeping independent culture measurements as faint dots. Individual cultures are not connected across days. This view omits starting OD600 and explicitly explains that tradeoff.

`generate_gallery_extra.R` builds the additional density, composition, set, and flow figures with base R. Density curves reuse `gallery-fluorescence.csv`; composition, set and flow values are included in their `gallery-*.csv` files. The gallery is a selection, not an exhaustive taxonomy of plots.

Day is no longer represented by four shapes in the emphasis walkthrough. The temporal example uses sequential colour for day and shape for condition, followed by ordered panels and a time-axis view. The treatment-highlight alternative explicitly omits day and is labelled unsuitable for studying progression.

`generate_stacked_bars.R` creates absolute and 100% stacked bars from the same synthetic cell counts in `gallery-stacked-counts.csv`. Equal sampled volume (1 mL) makes absolute counts comparable; samples 1 and 2 demonstrate identical proportions with different totals.

## Taxon-profile ordering

`generate_abundance_walkthrough.R` generates seven stages for 12 samples and eight taxa, with raw reads and metadata saved in `abundance-profiles.csv` (seed 413). It compares relative-abundance profiles in arbitrary order, metadata order, global Bray–Curtis average-linkage order, and within-metadata clustering order. Bray–Curtis is calculated on proportions using sum(abs(p−q))/sum(p+q), with all eight taxa retained. The final heatmap uses global cluster order and a shared 0–60% scale, without row scaling. Read depth is not absolute bacterial abundance.

## Expanded gallery

The reference now includes 27 families and 54 examples, grouped into relationships/profiles, distributions, comparisons/uncertainty, time/composition, matrices/genomics, and sets/flows/networks. A category selector narrows the overview. It is intentionally broad, not a claim to cover every possible plot. `generate_gallery_broad.R` creates radar, ECDF, ridgeline, dot/lollipop, point-and-interval, area, bubble, volcano, MA, correlation, UpSet, network, and PCA examples using synthetic data and included CSVs.

Gene examples use 120 simulated log2 expression features with six samples per condition, Welch t tests and BH adjustment; PCA uses centred, unscaled gene features from that same matrix. These demonstrate plotting conventions, not a recommended count-based differential-expression pipeline. Interval plots show 95% t intervals on means. Bubble areas scale with prevalence. Network edges are toy associations; layouts do not encode extra measurements.

The emphasis walkthrough compares 2×2 facets with a single row ordered Day 1–4. The row has common limits, aligned horizontal guides, one labelled y-axis, shared axis titles, and one legend. Its wider aspect ratio trades mobile point size for direct chronological reading order.

After the taxon-profile walkthrough, the next card presents Figure 2 from the Human Microbiome Project Consortium (Nature, 2012), using the user-supplied image unchanged. A short question connects body-site grouping and aligned taxonomic/functional panels to the lesson. The original figure and caption are linked; no unverified within-site clustering method is attributed to the figure.

Two function-over-decoration walkthroughs compare decorative gradients with functional highlighting, and overloaded point encodings with focused views. `generate_function_walkthrough.R` creates the images plus CSVs. The scatterplot retains the existing independent-culture measurements and adds synthetic inoculum-volume metadata. Removing an encoding is distinguished from discarding data or controlling for confounding. These original examples link to Office for National Statistics and Datawrapper guidance. Total collection: 34 cards.

`generate_3d_example.R` adds a perspective-pie → flat-pie → aligned-bar walkthrough using unchanged 40/35/25 cell counts. The pie/donut gallery also displays the 3D/2D comparison and links to this lesson. These deliberately decorative 3D sidewalls do not encode extra data.

`generate_3d_bars.R` creates an intentionally awkward depth-staggered bar chart and its shared-baseline 2D counterpart from the identical counts 42, 38, 35, and 31. The walkthrough is linked from the overview and bar-plot gallery.

`generate_overlap_comparison.R` creates a four-list Euler-style overlap and two UpSet views from the same 13 non-empty exclusive intersections, saved in `overlap-intersections.csv`. The comparison is linked from both the Venn and UpSet galleries. Missing geometric regions represent empty combinations in this constructed dataset; areas do not encode counts.

## Additional biological and genomic plot types

The gallery now includes 33 families, adding survival/Kaplan–Meier, forest, Bland–Altman, raincloud, sequence-logo, and genome-track examples. `generate_gallery_special.R` uses base R plus the recommended `survival` package; `generate_sequence_logos.py` uses only Python’s standard library and writes SVGs. Both scripts run from this directory. All data are synthetic; CSVs are included.

Survival examples use germination as the event and independent administrative follow-up censoring, with pointwise 95% log-log limits. Forest intervals use supplied illustrative standard errors and the normal approximation. Agreement limits are mean difference ± 1.96 SD. Sequence logos use 100 sequences per position, a uniform DNA background, no small-sample correction, and compare base frequency with information (2 − entropy). Genome tracks use schematic exons and explicitly labelled strand directions.

Every plot-type page has a short, type-specific Do / Don’t section. Longer interpretation caveats remain available under Reading notes; advice is stored in `plotAdvice` in `gallery.js`.

Grouped / side-by-side bars are included under Time and composition. `generate_grouped_bars.R` reuses the exact counts from the stacked-bar example and shows absolute counts and within-sample percentages as separate category bars. The gallery now includes 34 families.

The grouped/stacked comparison walkthrough reuses `gallery-stacked-counts.csv` and the existing gallery images. Its three steps distinguish category comparison, totals with components, and within-sample percentages. It is linked from both bar-family pages; the stacked gallery also retains its advanced taxon-ordering link.

Every gallery type includes a design comparison with expandable interpretation. Alternatives are not universally labelled bad/good; captions identify comparisons with different datasets or scope. Scatter additions cover independent observations, selective labels/callouts, overlap and PCoA. Rebuild the seven new scatter images with `Rscript generate_scatter_gallery.R`.

Every one of the 34 plot families now starts with a matched-data “Less clear / Clearer for this question” example and expandable feedback. Existing matched repairs are retained for scatter, bars, boxes, violins, heatmaps, paired data, circular plots and set intersections. `Rscript generate_gallery_repairs.R` generates 24 further pairs; `python3 generate_logo_repair.py` generates the logo-label pair. These intentionally flawed starting views are teaching examples, not recommended templates. Original alternative views remain under More examples where appropriate.

### Published good plots
Four new cards (39–42) are reachable through **Good plots: published figures** and individual homepage links. Each names a single panel to inspect, gives brief biological context, and asks about one design decision. The figures are dense on purpose; this is a guided reading exercise, not a recommendation to copy every detail.

- Mouse lemur atlas, Nature (2025), Figure 3: dot size versus expression shade.
- Mouse lemur atlas, Nature (2025), Figure 2: shared cell-type colours link an embedding and an ordered heatmap.
- Intestinal immune microniches, Nature (2024), Figure 2: relative composition alongside sampled counts.
- Intestinal immune microniches, Nature (2024), Figure 1: example measurements beside summaries.

`published.js` contains the teaching questions and attribution. Original images are saved locally, unchanged. `data/published-figure-sources.json` records downloads, licences and checksums. The linked papers provide full captions and methods. The four published cards do not renumber the existing lessons.

## Consistent figures

The overview links to **Do and don’t: consistent figures** (`#consistency`). The walkthrough begins with one three-panel figure containing several design inconsistencies. Each click fixes one issue and retains earlier fixes: font family, font sizes, line widths, alignment and spacing, colour meanings, marker sizes, then axis scales. Boxed side-by-side views compare consecutive versions; the final slide compares the original with the completed figure. All stages use the same illustrative measurements for marker-positive T cells, B cells and monocytes. `consistency.js` renders the offline SVG examples directly; no build step is required.

## Crowded point-plot walkthrough

`#point-consistency` progressively repairs a plot of 180 fixed simulated independent cultures: remove recording-order connections, reduce marker size, introduce transparency, map colour and shape to condition, remove excessive IDs, and explain axes. Boxed comparisons, actual settings diffs and CSV download accompany the walkthrough. `point-consistency.js` contains the data and renderer.

## Presentation navigation

The home page groups the course into four numbered sections: plot families, good/bad plots, progressive improvements, and published figures. Plot families are paginated four at a time in a 2×2 slide layout, with click-to-reveal design comparisons and collapsible supplementary guidance. The former `#library` index redirects to the main presentation overview.

## Day 3: Use generative tools

Section 11 (`#section-11`, also `#generative-tools`) opens an eight-slide
exercise: an intentionally inconsistent six-panel figure, individual panel
files, and four copyable prompts: create a schematic HTML guide, inspect and
improve it with SVG schematics, regenerate panels with another agent, and
assemble the final figure. It reuses the Day 1 abundance/qPCR
data, Day 2 PCA inputs and Day 2 SNP heatmap data.

`example_plot/` contains six panel subfolders, each with a CSV, R or Python
script, PDF, PNG and README. Its main README explains data provenance,
sample structure and reproduction. `example_plot.zip` is the portable exercise
download. Run `python3 example_plot/render_all.py` to regenerate all outputs
and refresh the archive; dependencies are in `example_plot/requirements.txt`
plus the R package ggplot2. The starting version is deliberately unoptimized.

## Hands-on R data functions

The Day 2 hands-on walkthrough includes a working-directory slide followed by eight short function slides after
“Start with the supplied files”: import, preview, column types, filtering,
group counts, missing values, matrix conversion and per-sample missingness.
Start at `#day2-heatmaps/r-working-directory`, also linked from the assignment roadmap.
Examples use dataset 2 and run sequentially from
`second_day_part2/scripts/individual_notebooks`; each slide includes an
expected-output reveal and a practice question.
