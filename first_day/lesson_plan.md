# Day 1: Plotting YL32 Abundance – Instructor Guide

This module introduces first-year PhD students to Python-based data exploration and visualization using a small microbiome time-series dataset. The goal is to build confidence reading data, computing simple summaries, and producing incremental plots that culminate in a log-transformed, multi-mouse line chart.

**🎯 For Students**: See [README.md](README.md) for the full workshop guide with setup instructions, troubleshooting, and assignment details.

---

## Teaching Format

This lesson uses **individual Python scripts** (located in [`scripts/`](scripts/)) rather than a Jupyter notebook. This approach:
- ✅ Encourages students to read code before running it
- ✅ Builds familiarity with command-line execution
- ✅ Makes it easier to track which step produces which output
- ✅ Prepares students for reproducible research workflows

### How to Teach

1. **Project the script** on screen and walk through the code line-by-line
2. **Ask prediction questions**: "What do you think this will produce?"
3. **Run the script** together: `python first_day/scripts/stepXX_....py`
4. **Discuss the output** (console or plot)
5. **Encourage experimentation**: "Try changing this parameter and re-run"

---

## Dataset

- **Source files**: [`first_day/data/`](data/)
  - `yl32_vancomycin_mouse1.csv` – Single mouse starter (4 columns, ~10 rows)
  - `yl32_vancomycin.csv` – All 4 vancomycin-treated mice (4 columns, ~40 rows)
  - `yl32_all_groups.csv` – All treatment groups + water control (5 columns, ~160 rows)
  - `multi_strain_timeseries.csv` – 12 strains across all groups for assignment (16 columns, ~160 rows)

- **Columns**:
  - `day`: days post-antibiotic treatment (int)
  - `mouse`: anonymized replicate identifier (`Mouse 1`–`Mouse 4`)
  - `post_antibiotic`: Boolean flag indicating measurements taken after antibiotic dosing (True/False)
  - `yl32`: raw (non-log) abundance counts for the YL32 isolate
  - `group`: treatment group (vancomycin, ampicillin, metronidazole, water)

---

## Environment Setup (5 minutes)

Guide students through:

```bash
# Navigate to project directory
cd /path/to/omm/first_day

# Create virtual environment
python -m venv .venv

# Activate
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows

# Install packages
pip install pandas matplotlib numpy

# Verify
python -c "import pandas; import matplotlib; print('Ready!')"
```

**Common issues**:
- Wrong Python version → check `python --version` (need 3.8+)
- Permission errors → use `python3 -m venv` instead
- PATH issues → use `python -m pip install` instead of just `pip`

---

## Pre-Workshop (Optional) – Python Fundamentals (30-45 min)

**Target audience**: Students with little or no Python experience

**Learning objectives**: Understand basic Python syntax, libraries, file operations, and command line

### Step 0: Python Basics and Prerequisites

**Script**: [`scripts/step00_python_basics.py`](scripts/step00_python_basics.py)

**When to use**:
- Send to students 1-2 days before the workshop
- Offer as pre-session warmup (30 min before main workshop starts)
- Reference material for strugglers during the workshop
- Self-paced learning for remote students

**Teaching points**:
- **What are libraries?** Explain the toolbox analogy (pandas = spreadsheet tools, matplotlib = plotting tools)
- **Import syntax**: `import pandas as pd` (explain the "as pd" nickname convention)
- **Function calling**: `function_name(arguments)` vs `library.function(arguments)`
- **File paths**: Absolute vs relative, why we use relative paths in scripts
- **Delimiters**: CSV (comma), TSV (tab), custom separators
- **Data types**: Strings, integers, floats, booleans, lists, dictionaries
- **Command line basics**: pwd, ls/dir, cd, running Python scripts

**Hands-on activities**:
1. Create and read simple CSV and TSV files
2. Check current working directory
3. Load data with pandas
4. Calculate basic statistics (mean, median, sum)
5. Create a new column
6. Save modified data to file

**Expected output**:
- Console output with educational messages
- 2 example files created: `example.csv`, `example.tsv`
- 1 modified file: `example_modified.csv`

**Discussion questions**:
1. Why do we use nicknames like 'pd' for pandas?
   → Shorter to type, industry standard convention
2. What's the difference between a CSV and TSV file?
   → Only the delimiter (comma vs tab), same concept
3. Why use relative paths instead of absolute paths?
   → Makes code portable across different computers
4. What does index 0 mean when accessing lists?
   → Python counts from 0, so first item is [0], second is [1], etc.

**Pro tips for instructors**:
- **Don't skip this for true beginners!** It prevents confusion in the main workshop
- Have students run it themselves before Day 1 (homework assignment)
- Can be condensed to 15-20 min if students just read through without typing
- Keep a copy open during workshop to reference when students get stuck
- Emphasize that this is **reference material** they can revisit anytime

**Common beginner mistakes to address**:
- Forgetting to import libraries before using them
- Mixing up quotation marks (strings vs variable names)
- Confusion about list indexing starting at 0
- File path errors (running from wrong directory)
- Not understanding the difference between `=` (assignment) and `==` (comparison)

**Assessment idea**:
Ask students to complete a simple task:
1. Create a CSV file with 3 columns (name, value1, value2)
2. Read it with pandas
3. Add a new column (value3 = value1 + value2)
4. Save to a new file

If they can do this, they're ready for Step 1!

---

## Hour 1 – Read and Inspect the Data (30 min)

**Learning objectives**: Load CSV data, inspect structure, create first plot

### Step 1: Load the single-mouse starter file

**Script**: [`scripts/step01_load_single_mouse.py`](scripts/step01_load_single_mouse.py)

**Teaching points**:
- Introduce `pd.read_csv()` – emphasize the importance of file paths
- Show `.head()`, `.info()`, `.describe()` as the "first three things you always do"
- Point out the `post_antibiotic` flag as an example of metadata traveling with measurements
- Encourage questions: *Are days evenly spaced? How large are the counts?*

**Discussion questions** (printed by script):
1. How many timepoints do we have?
2. What is the range of YL32 abundance values?
3. When does the post_antibiotic flag turn True?
4. Are the days evenly spaced?

**Expected output**: Console output showing DataFrame info and statistics

---

### Step 2: Create your first line plot

**Script**: [`scripts/step02_first_plot.py`](scripts/step02_first_plot.py)

**Teaching points**:
- Introduce `matplotlib` figure/axis paradigm: `fig, ax = plt.subplots()`
- Explain `ax.plot()` vs `plt.plot()` (object-oriented vs state-based)
- Emphasize axis labels and titles for publication-quality figures
- Show `plt.savefig()` for reproducibility

**Customization challenges**:
- Change marker style to `'s'` (square) or `'^'` (triangle)
- Modify colors: `color='red'` or `color='#FF5733'`
- Adjust figure size: `figsize=(10, 6)`

**Expected output**: [`plots/mouse1_raw.png`](plots/mouse1_raw.png)

**Key observation**: Dramatic peak around day 4, then decline

---

## Hour 2 – Expand to the Full Vancomycin Cohort (45 min)

**Learning objectives**: Work with multi-replicate data, use `.groupby()`, overlay multiple lines

### Step 3: Load and explore all mice

**Script**: [`scripts/step03_load_all_mice.py`](scripts/step03_load_all_mice.py)

**Teaching points**:
- Discuss "tidy data" (long-form) vs wide-form
- Introduce `.groupby()` and `.agg()` for group-level summaries
- Show how `.value_counts()` reveals sample distribution
- Explain mean vs median (median is robust to outliers)

**Discussion questions**:
1. Why is this dataset in 'long' format?
2. How does the standard deviation change over time?
3. What's the difference between mean and median at each timepoint?
4. Why might we prefer median over mean?

**Expected output**: Console output with summary statistics by day

---

### Step 4: Overlay all mice in a single plot

**Script**: [`scripts/step04_plot_all_mice.py`](scripts/step04_plot_all_mice.py)

**Teaching points**:
- Use `for mouse, subset in df.groupby("mouse"):` to iterate over groups
- Introduce legends: `label=` parameter + `ax.legend()`
- **Identify the visualization problem**: wide range makes low-abundance mice invisible

**Discussion questions**:
1. Which mouse has the highest peak?
2. Can you easily see dynamics for mice with lower abundance?
3. What visualization problem does the wide range create?
4. How might a log transformation help?

**Expected output**: [`plots/all_mice_raw.png`](plots/all_mice_raw.png)

**Key observation**: Some mice are "squashed" at the bottom of the plot – motivates log transformation

---

## Hour 3 – Introduce Transformations and Refinements (60 min)

**Learning objectives**: Apply log transformation, create scatter plots, add annotations

### Step 5: Apply log10 transformation

**Script**: [`scripts/step05_log_transform.py`](scripts/step05_log_transform.py)

**Teaching points**:
- Explain why microbiologists use log scale (orders of magnitude)
- Introduce `numpy` for math operations: `np.log10()`
- Show `.assign()` to create new columns
- Compare raw vs log visualization side-by-side (could project both)

**Concept check**:
- "What does a log10 value of 5 mean in raw counts?" → 10^5 = 100,000
- "What's the difference between log10(100) and log10(1000)?" → 1 order of magnitude

**Expected output**: [`plots/all_mice_log10.png`](plots/all_mice_log10.png)

**Key observation**: All mice now visible, trends are parallel

---

### Step 6: Add jittered scatter points with mean/median overlays

**Script**: [`scripts/step06_jittered_replicates.py`](scripts/step06_jittered_replicates.py)

**Teaching points**:
- Introduce `ax.scatter()` vs `ax.plot()`
- Explain **jitter**: random x-offset to prevent overlapping points
- Show how to combine scatter + line in one plot
- Discuss **alpha** (transparency) for overlapping points

**Discussion questions**:
1. Why do we add jitter to the x-axis?
2. When do mean and median diverge most?
3. What does this tell you about outliers or skewness?
4. Which summary statistic better represents the trend?

**Expected output**: [`plots/all_mice_log10_jitter.png`](plots/all_mice_log10_jitter.png)

---

### Step 7: Highlight post-antibiotic timepoints

**Script**: [`scripts/step07_annotate_antibiotic.py`](scripts/step07_annotate_antibiotic.py)

**Teaching points**:
- Use `ax.axvline()` to add vertical reference lines
- Show how to filter metadata: `df.loc[df["post_antibiotic"], "day"].unique()`
- Discuss the importance of **linking biology to data patterns**
- Introduce custom legend entries with `Line2D`

**Discussion questions**:
1. What happens to YL32 abundance after antibiotic treatment?
2. How long does it take for recovery to begin?
3. Why is it important to annotate experimental interventions?
4. What other metadata might be useful? (diet changes, cage moves, etc.)

**Expected output**: [`plots/all_mice_log10_jitter_annotated.png`](plots/all_mice_log10_jitter_annotated.png)

**Key observation**: Abundance drops sharply after antibiotic, then recovers

---

## Hour 4 (Optional) – Compare Treatment Groups (60 min)

**Learning objectives**: Work with multi-group data, create faceted plots, compare treatments

### Step 8: Load the multi-group dataset

**Script**: [`scripts/step08_load_all_groups.py`](scripts/step08_load_all_groups.py)

**Teaching points**:
- Introduce experimental controls (water group)
- Discuss unbalanced designs (water has fewer measurements)
- Show multi-level groupby: `.groupby(["group", "day"])`

**Discussion questions**:
1. Why does water have fewer measurements?
2. What is the purpose of the water control?
3. How many different antibiotics were tested?

**Expected output**: Console output with group summaries

---

### Step 9: Create faceted plots by treatment group

**Script**: [`scripts/step09_facet_by_group.py`](scripts/step09_facet_by_group.py)

**Teaching points**:
- Introduce `plt.subplots(2, 2)` for multi-panel figures
- Show `sharex=True, sharey=True` for consistent scales
- Demonstrate `.ravel()` to flatten 2D array of axes
- Discuss when to use facets vs overlays

**Discussion questions**:
1. Which antibiotic causes the most dramatic YL32 suppression?
2. How does the water control differ from antibiotic groups?
3. Do all antibiotics affect YL32 similarly?
4. What recovery patterns do you observe?

**Expected output**: [`plots/all_groups_log10_facets.png`](plots/all_groups_log10_facets.png)

**Key observation**: Different antibiotics have different effects on YL32

---

### Step 10: Compare group-level mean trajectories

**Script**: [`scripts/step10_compare_group_means.py`](scripts/step10_compare_group_means.py)

**Teaching points**:
- Show how to aggregate across both group and day
- Introduce color dictionaries for consistent styling
- Discuss treatment effects relative to control
- Preview statistical testing (t-tests, ANOVA) for future lessons

**Discussion questions**:
1. Which treatment suppresses YL32 most strongly relative to water?
2. At what day do treatment groups begin to diverge?
3. Do any treatments enrich YL32 compared to water?
4. What would a statistical test tell us beyond this plot?

**Expected output**: [`plots/all_groups_log10_mean.png`](plots/all_groups_log10_mean.png)

---

## Bonus Section – Colorblind-Friendly Visualization (30 min)

**Learning objectives**: Create accessible figures, use colorblind-safe palettes, implement redundant encoding

### Step 11: Apply accessibility best practices

**Script**: [`scripts/step11_colorblind_friendly.py`](scripts/step11_colorblind_friendly.py)

**Teaching points**:
- **Impact**: ~8% of men, ~0.5% of women have color vision deficiency (red-green most common)
- **Professional requirement**: Many journals require or recommend colorblind-friendly figures
- **Show bad vs good examples**: Red-green pairs vs Okabe-Ito palette
- **Redundant encoding**: Use color + marker + line style together
- **Sequential data**: Perceptually uniform colormaps (viridis, cividis) vs problematic (jet, rainbow)

**Key palettes to introduce**:
1. **Okabe-Ito** (8 colors) – Gold standard for categorical data
2. **Paul Tol** (Bright/Muted) – Alternative colorblind-safe palettes
3. **Viridis/Cividis** – Sequential data (heatmaps, continuous scales)

**Discussion questions**:
1. Why is red-green the most problematic color combination?
2. What is "redundant encoding" and why does it matter?
3. When to use sequential vs categorical color schemes?
4. How can you test if your plot is accessible?

**Testing tools**:
- **Color Oracle** (free desktop app) – Simulates different types of colorblindness
- **Coblis** (web-based) – Upload and test your plots
- **Grayscale test** – Convert to grayscale and verify readability

**Expected outputs**:
- [`plots/colors_bad_example.png`](plots/colors_bad_example.png) – Red-green problematic example
- [`plots/colors_okabe_ito.png`](plots/colors_okabe_ito.png) – Okabe-Ito palette
- [`plots/colors_redundant_encoding.png`](plots/colors_redundant_encoding.png) – Color + marker + line
- [`plots/colors_sequential_comparison.png`](plots/colors_sequential_comparison.png) – Colormap comparison
- [`plots/colors_palette_reference.png`](plots/colors_palette_reference.png) – Quick reference guide

**Practical exercise**:
Ask students to review their previous plots and identify:
- Which colors might be problematic?
- How could redundant encoding improve accessibility?
- What would the plot look like in grayscale?

**Additional resources**:
- [Okabe & Ito color universal design](https://jfly.uni-koeln.de/color/)
- [Paul Tol's color schemes](https://personal.sron.nl/~pault/)
- [Color Oracle simulator](https://colororacle.org/)
- [Matplotlib colormap guide](https://matplotlib.org/stable/tutorials/colors/colormaps.html)

---

## Post-Lecture Assignment – Explore Additional Strains

Hand out [`data/multi_strain_timeseries.csv`](data/multi_strain_timeseries.csv) with 12 strains:
`KB1`, `YL2`, `KB18`, `YL27`, `YL31`, `YL32`, `YL44`, `YL45`, `I46`, `I48`, `I49`, `YL58`

### Assignment tasks (detailed in [README.md](README.md)):

1. **Single-strain analysis** (required): Recreate plots for a non-YL32 strain
2. **Multi-strain comparison** (optional): Use `.melt()` to compare 2–3 strains
3. **Quantitative analysis** (optional): Compute fold changes, recovery rates

### Grading rubric suggestion:

| Criterion | Points |
|-----------|--------|
| Code runs without errors | 25% |
| Produces at least 2 plots | 25% |
| Code is well-commented | 20% |
| Interpretation/discussion (2–3 sentences per plot) | 20% |
| Uses colorblind-friendly palette (bonus) | +10% |

---

## Wrap-Up and Reflection (10 min)

### Key workflow to emphasize:

1. **Ingest**: Load data with `pd.read_csv()`
2. **Inspect**: Use `.head()`, `.info()`, `.describe()`
3. **Summarize**: Apply `.groupby()` and `.agg()`
4. **Visualize**: Create plots with `matplotlib`
5. **Refine**: Add transformations, annotations, styling

### Skills checklist for students:

- ✅ I can load CSV files and inspect their structure
- ✅ I can compute summary statistics (mean, median, std)
- ✅ I can create line plots and scatter plots
- ✅ I can apply mathematical transformations (log10)
- ✅ I can compare multiple groups using facets or overlays
- ✅ I can annotate plots with experimental metadata
- ✅ I can save figures for reports/publications

### Looking ahead:

- **Next session preview**: Statistical testing (t-tests, linear models), heatmaps, clustering
- **Reproducibility**: Save scripts in version control (Git), use descriptive variable names
- **Documentation**: Comment your code, save plots with informative filenames

---

## Troubleshooting Guide for Instructors

### Common student errors:

| Error | Cause | Solution |
|-------|-------|----------|
| `FileNotFoundError` | Running script from wrong directory | Show `pwd` and `cd` to navigate |
| `ModuleNotFoundError: No module named 'pandas'` | Virtual environment not activated | Re-run `source .venv/bin/activate` |
| Plot window doesn't appear | Backend issue on macOS/Linux | Add `plt.ion()` before plots or use `plt.savefig()` only |
| `KeyError: 'yl32'` | Typo in column name | Show `.columns` to list all column names |
| `ValueError: could not convert string to float` | Wrong data type | Show `.dtypes` and discuss type coercion |

### Backup plan if time runs short:

- **Minimum viable lesson**: Steps 1–5 (load data → first plot → log transformation)
- **Skip if needed**: Steps 8–10 (multi-group comparison) can become homework
- **Pre-run scripts**: If demo fails, have pre-generated plots ready to show

---

## Additional Resources for Instructors

### Python & Data Science:
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html)
- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)

### Microbiome Analysis:
- [QIIME2](https://docs.qiime2.org/) – industry-standard microbiome pipeline
- [Microbiome data visualization best practices](https://www.nature.com/articles/s41592-020-0822-z)

### Teaching Tips:
- Use **live coding** (not slides) to keep students engaged
- Encourage **pair programming** for debugging
- Give students **5-min breaks** every hour
- Create a **shared document** for questions/notes (Google Doc, Slack)

---

**Last Updated**: 2025-10-08
**Instructor**: [Add your name/contact]
