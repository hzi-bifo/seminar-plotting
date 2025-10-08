# Day 1: Introduction to Python Data Visualization with Microbiome Time-Series Data

A hands-on workshop for first-year PhD students learning Python-based data exploration and visualization.

## 🎯 Learning Objectives

By the end of this session, you will be able to:

1. **Load and inspect** CSV datasets using pandas
2. **Compute summary statistics** and understand data distributions
3. **Create publication-quality plots** using matplotlib
4. **Apply log transformations** to handle wide-ranging abundance data
5. **Compare multiple experimental groups** using faceted visualizations
6. **Annotate plots** with experimental metadata (e.g., treatment timing)

## 📋 Prerequisites

### Recommended Background
- Basic familiarity with Python syntax (variables, functions, loops)
- Comfortable using the command line/terminal
- No prior experience with pandas or matplotlib required!

### 🆘 New to Python? Start Here!

If you're completely new to Python or need a refresher on the basics, **start with Step 0** before the main workshop:

👉 **[`step00.md`](step00.md)** - Read this first! (30-45 min)
A comprehensive guide covering:
- What libraries are and how to import them
- Basic function calling syntax
- Reading files with different delimiters (CSV, TSV)
- File paths (absolute vs relative)
- Basic data types and structures
- Command line navigation
- Practical exercises with pandas
- Self-assessment questions

**Optional Hands-On**: After reading, try [`step00_interactive.py`](scripts/step00_interactive.py) for practice exercises

This is self-paced and includes lots of examples. You can revisit it anytime as a reference!

## 🔧 Environment Setup

### 1. Create and activate a virtual environment

```bash
# Navigate to the project directory
cd /path/to/omm/first_day

# Create virtual environment
python -m venv .venv

# Activate it
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows
```

### 2. Install required packages

```bash
pip install pandas matplotlib numpy
```

### 3. Verify installation

```bash
python -c "import pandas as pd; import matplotlib.pyplot as plt; import numpy as np; print('Setup successful!')"
```

## 📊 Dataset Description

### Files

All data files are located in [`first_day/data/`](data/):

| File | Description | Rows | Columns |
|------|-------------|------|---------|
| `yl32_vancomycin_mouse1.csv` | Single mouse starter dataset | ~10 | 4 |
| `yl32_vancomycin.csv` | All 4 vancomycin-treated mice | ~40 | 4 |
| `yl32_all_groups.csv` | All treatment groups + water control | ~160 | 5 |
| `multi_strain_timeseries.csv` | 12 strains across all groups (assignment) | ~160 | 16 |

### Column Definitions

- **`day`**: Days post-antibiotic treatment (integer)
- **`mouse`**: Anonymized replicate identifier (`Mouse 1` – `Mouse 4`)
- **`post_antibiotic`**: Boolean flag (`True`/`False`) indicating measurements after antibiotic dosing
- **`yl32`**: Raw (non-log) abundance counts for the YL32 bacterial strain
- **`group`**: Treatment group (`vancomycin`, `ampicillin`, `metronidazole`, `water`)

### Experimental Context

This dataset comes from a microbiome perturbation experiment where mice were treated with different antibiotics and their gut bacterial communities were monitored over time. The **YL32 strain** is one member of the *Oligo-Mouse-Microbiota* (OMM) – a simplified, defined bacterial community used for controlled experiments.

## 📚 Lesson Plan

### **Pre-Workshop (Optional): Python Fundamentals** (30-45 min)

For students new to Python or needing a refresher on the basics.

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 0 | [`step00_python_basics.py`](scripts/step00_python_basics.py) | Libraries, imports, file I/O, data types, command line basics | Console + 2 example files |

**Key Concepts**: What libraries are, function syntax, file paths, delimiters, basic pandas operations

**Note**: This step is **optional** but highly recommended for beginners. Experienced Python users can skip directly to Step 1.

---

### **Hour 1: Read and Inspect** (30 min)

Build familiarity with pandas and the dataset structure.

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 1 | [`step01_load_single_mouse.py`](scripts/step01_load_single_mouse.py) | Load CSV, use `.head()`, `.info()`, `.describe()` | Console output |
| 2 | [`step02_first_plot.py`](scripts/step02_first_plot.py) | Create basic line plot with matplotlib | [`mouse1_raw.png`](plots/mouse1_raw.png) |

**Key Concepts**: DataFrame structure, column types, summary statistics, basic plotting

---

### **Hour 2: Expand to Multiple Replicates** (45 min)

Work with the full vancomycin cohort (4 mice).

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 3 | [`step03_load_all_mice.py`](scripts/step03_load_all_mice.py) | Use `.groupby()` for summaries across replicates | Console output |
| 4 | [`step04_plot_all_mice.py`](scripts/step04_plot_all_mice.py) | Overlay multiple lines, add legend | [`all_mice_raw.png`](plots/all_mice_raw.png) |

**Key Concepts**: Tidy data, groupby operations, visualization challenges with raw-scale data

---

### **Hour 3: Transformations and Advanced Plotting** (60 min)

Address scale issues and create publication-ready figures.

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 5 | [`step05_log_transform.py`](scripts/step05_log_transform.py) | Apply log10 transformation, create new columns | [`all_mice_log10.png`](plots/all_mice_log10.png) |
| 6 | [`step06_jittered_replicates.py`](scripts/step06_jittered_replicates.py) | Scatter plots, jitter, overlay mean/median | [`all_mice_log10_jitter.png`](plots/all_mice_log10_jitter.png) |
| 7 | [`step07_annotate_antibiotic.py`](scripts/step07_annotate_antibiotic.py) | Annotate experimental events with vertical lines | [`all_mice_log10_jitter_annotated.png`](plots/all_mice_log10_jitter_annotated.png) |

**Key Concepts**: Log transformations, scatter + line combinations, metadata annotations, custom legends

---

### **Hour 4 (Optional): Compare Treatment Groups** (60 min)

Explore how different antibiotics affect YL32 differently.

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 8 | [`step08_load_all_groups.py`](scripts/step08_load_all_groups.py) | Work with multi-group datasets | Console output |
| 9 | [`step09_facet_by_group.py`](scripts/step09_facet_by_group.py) | Create subplot grids (facets) | [`all_groups_log10_facets.png`](plots/all_groups_log10_facets.png) |
| 10 | [`step10_compare_group_means.py`](scripts/step10_compare_group_means.py) | Multi-level groupby, compare trajectories | [`all_groups_log10_mean.png`](plots/all_groups_log10_mean.png) |

**Key Concepts**: Faceted plots, shared axes, comparing treatment effects, controls

---

### **Bonus: Colorblind-Friendly Visualization** (30 min)

Learn accessibility best practices for scientific figures.

| Step | Script | What You'll Learn | Output |
|------|--------|-------------------|--------|
| 11 | [`step11_colorblind_friendly.py`](scripts/step11_colorblind_friendly.py) | Accessible color palettes, redundant encoding, perceptually uniform colormaps | 4 comparison plots + reference guide |

**Key Concepts**: Colorblind accessibility (~8% of population), Okabe-Ito palette, redundant encoding (color + marker + line style), avoiding red-green pairs, perceptually uniform colormaps (viridis, cividis), testing with colorblind simulators

**Why This Matters**: Making your science accessible to everyone, including reviewers, collaborators, and readers with color vision deficiencies. Many journals now require or recommend colorblind-friendly figures.

---

## 🚀 How to Run the Scripts

Each script is self-contained and can be run independently:

```bash
# From the project root directory

# If you're new to Python, start here:
python first_day/scripts/step00_python_basics.py   # Optional, for beginners

# Then proceed with the main workshop:
python first_day/scripts/step01_load_single_mouse.py
python first_day/scripts/step02_first_plot.py
# ... and so on
```

### Workflow Tips

1. **Run scripts in order** – each builds on concepts from the previous one
2. **Read the script first** – examine the code before running to predict what will happen
3. **Modify and experiment** – try changing colors, markers, or filtering different subsets
4. **Compare outputs** – check that your plots match the reference images in [`plots/`](plots/)

## 🔍 Expected Outputs

All plots are saved to [`first_day/plots/`](plots/). Here's what each should show:

| Plot | Key Features |
|------|--------------|
| `mouse1_raw.png` | Single mouse trajectory, peak around day 4 |
| `all_mice_raw.png` | 4 overlapping lines, hard to see low-abundance mice |
| `all_mice_log10.png` | Log-scale makes all mice visible, parallel trends |
| `all_mice_log10_jitter.png` | Individual points jittered, mean/median overlays |
| `all_mice_log10_jitter_annotated.png` | Adds vertical lines for post-antibiotic timepoints |
| `all_groups_log10_facets.png` | 2×2 grid comparing 4 treatment groups |
| `all_groups_log10_mean.png` | Single panel with group-level means |
| `colors_bad_example.png` | ❌ Problematic red-green color scheme |
| `colors_okabe_ito.png` | ✅ Colorblind-friendly Okabe-Ito palette |
| `colors_redundant_encoding.png` | ✅✅ Color + marker + line style |
| `colors_sequential_comparison.png` | Sequential colormap comparison |
| `colors_palette_reference.png` | Cheat sheet of accessible palettes |

## 🐛 Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `FileNotFoundError: [Errno 2] No such file or directory: 'first_day/data/...'` | Running script from wrong directory | Run from project root: `python first_day/scripts/stepXX_....py` |
| `ModuleNotFoundError: No module named 'pandas'` | Packages not installed | Activate venv and run `pip install pandas matplotlib numpy` |
| `/Users/pmu15/.../.venv/bin/python: No module named ...` | Wrong Python interpreter | Check: `which python` should show `.venv/bin/python` |
| Plot window doesn't appear | Backend issue (macOS/Linux) | Add `plt.ion()` before plots or use `plt.savefig()` + view saved file |
| `RuntimeWarning: invalid value encountered in log10` | Log of zero/negative values | Expected for this dataset – pandas handles gracefully |

### Debugging Tips

1. **Check your working directory**:
   ```bash
   pwd  # Should show /path/to/omm
   ```

2. **Verify data files exist**:
   ```bash
   ls first_day/data/*.csv
   ```

3. **Print intermediate results**:
   ```python
   print(df.head())  # Add print statements to inspect data
   ```

4. **Use Python's interactive mode**:
   ```bash
   python -i first_day/scripts/step01_load_single_mouse.py
   # After script runs, you can inspect variables: >>> mouse1.info()
   ```

## 📝 Post-Lecture Assignment

### Explore Additional Strains

After the live session, work with [`multi_strain_timeseries.csv`](data/multi_strain_timeseries.csv), which contains 12 bacterial strains:

**Strain columns**: `KB1`, `YL2`, `KB18`, `YL27`, `YL31`, `YL32`, `YL44`, `YL45`, `I46`, `I48`, `I49`, `YL58`

### Assignment Tasks

#### Task 1: Single-Strain Analysis (Required)

Pick a strain other than YL32 and recreate the day-by-day plots from the lesson.

```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load data
assignment = pd.read_csv("first_day/data/multi_strain_timeseries.csv")

# Choose your strain
target = "YL27"  # Change to any strain from the list above

# Extract relevant columns
subset = assignment[["group", "day", "mouse", "post_antibiotic", target]]
subset = subset.rename(columns={target: "abundance"})

# Add log transformation
subset = subset.assign(log10_abundance=np.log10(subset["abundance"]))

# Create your plots following the lesson examples...
```

**Deliverable**: A script that produces at least 2 plots for your chosen strain.

#### Task 2: Multi-Strain Comparison (Optional)

Compare 2–3 strains simultaneously using data reshaping.

```python
# Reshape to long format
value_cols = ["YL27", "I46", "KB1"]  # Choose any strains
tidy = (assignment
        .melt(id_vars=["group", "day", "mouse", "post_antibiotic"],
              value_vars=value_cols,
              var_name="strain",
              value_name="abundance"))

# Now you can color lines by strain or facet by treatment + strain
```

**Deliverable**: A faceted plot or multi-line plot comparing strains.

#### Task 3: Quantitative Analysis (Optional)

Compute and visualize:
- Fold changes between baseline and post-antibiotic timepoints
- Maximum/minimum abundance per strain per group
- Recovery rates (days to return to 50% of baseline)

### Submission Guidelines

Submit a `.py` script or Jupyter notebook containing:

1. **Code**: Well-commented and runnable
2. **Plots**: Saved to `first_day/plots/assignment_*.png`
3. **Interpretation**: Brief comments (1–2 sentences per plot) describing what the data show

**Optional**: Include additional annotations like max/min labels, fold-change callouts, or shaded regions for intervention windows.

## 🎓 Learning Goals Recap

After completing this module, you should be comfortable:

- ✅ Loading CSV files with pandas
- ✅ Inspecting data structure and computing summaries
- ✅ Creating line plots, scatter plots, and faceted figures
- ✅ Applying mathematical transformations (log10)
- ✅ Overlaying multiple data layers (points + lines + annotations)
- ✅ Interpreting experimental metadata in visualizations
- ✅ Adapting code to new datasets and research questions

## 📖 Further Resources

### Python & Data Science

- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html)
- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) (free online)

### Microbiome-Specific

- [QIIME2 Tutorials](https://docs.qiime2.org/) – popular microbiome analysis platform
- [Seaborn](https://seaborn.pydata.org/) – higher-level plotting library (great for microbiome data)
- [Plotnine](https://plotnine.readthedocs.io/) – ggplot2-style plotting in Python

### Version Control

- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub for Research](https://docs.github.com/en/get-started)

## 🆘 Getting Help

- **During the workshop**: Raise your hand or ask in the chat
- **After the workshop**: Email the instructor or post in the course forum
- **Online communities**: [Stack Overflow](https://stackoverflow.com/questions/tagged/pandas), [Reddit r/learnpython](https://www.reddit.com/r/learnpython/)

---

**Instructor Contact**: [Add your contact info here]
**Course Website**: [Add course website here]
**Last Updated**: 2025-10-08
