# Quick Start Guide – Day 1 Workshop

**⏱️ Time to complete**: 3–4 hours

## Setup (5 minutes)

```bash
# 1. Navigate to project directory
cd /path/to/omm/first_day

# 2. Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# OR: .venv\Scripts\activate  # Windows

# 3. Install packages
pip install pandas matplotlib numpy

# 4. Verify installation
python -c "import pandas; import matplotlib; print('✅ Ready to go!')"
```

## Running the Scripts

Each script is numbered and builds on the previous one. Run them in order:

```bash
# From the project root (omm/ directory)

# NEW TO PYTHON? Start here first! (30-45 min)
python first_day/scripts/step00_python_basics.py

# Main workshop scripts:
python first_day/scripts/step01_load_single_mouse.py
python first_day/scripts/step02_first_plot.py
python first_day/scripts/step03_load_all_mice.py
python first_day/scripts/step04_plot_all_mice.py
python first_day/scripts/step05_log_transform.py
python first_day/scripts/step06_jittered_replicates.py
python first_day/scripts/step07_annotate_antibiotic.py
python first_day/scripts/step08_load_all_groups.py      # Optional
python first_day/scripts/step09_facet_by_group.py       # Optional
python first_day/scripts/step10_compare_group_means.py  # Optional
python first_day/scripts/step11_colorblind_friendly.py  # Bonus: Accessibility!
```

### Pro Tips

- **New to Python?** Run `step00_python_basics.py` first – it's designed for absolute beginners
- **Read the script first** before running it (open in your text editor)
- **Predict what will happen** – what kind of plot will it make?
- **Run the script** and compare to your prediction
- **Experiment** – modify colors, markers, or labels and re-run
- **Stuck?** Revisit `step00` as a reference for basic concepts

## What Each Script Does

| Script | Output | What You'll Learn |
|--------|--------|-------------------|
| `step00_python_basics.py` | Console + 2 files | **For beginners:** Libraries, functions, file I/O, command line |
| `step01_load_single_mouse.py` | Console | Load CSV, inspect data structure |
| `step02_first_plot.py` | `plots/mouse1_raw.png` | Create basic line plot |
| `step03_load_all_mice.py` | Console | Use `.groupby()` for summaries |
| `step04_plot_all_mice.py` | `plots/all_mice_raw.png` | Overlay multiple lines |
| `step05_log_transform.py` | `plots/all_mice_log10.png` | Apply log transformation |
| `step06_jittered_replicates.py` | `plots/all_mice_log10_jitter.png` | Scatter + line plots |
| `step07_annotate_antibiotic.py` | `plots/all_mice_log10_jitter_annotated.png` | Add annotations |
| `step08_load_all_groups.py` | Console | Multi-group datasets |
| `step09_facet_by_group.py` | `plots/all_groups_log10_facets.png` | Faceted plots |
| `step10_compare_group_means.py` | `plots/all_groups_log10_mean.png` | Compare treatments |
| `step11_colorblind_friendly.py` | 5 plots (comparison + reference) | **Accessible colors & palettes** |

## Troubleshooting

### "FileNotFoundError: No such file or directory"
**Problem**: Running script from wrong directory
**Solution**: Make sure you're in the `omm/` directory, not `omm/first_day/`

```bash
pwd  # Should show /path/to/omm
```

### "ModuleNotFoundError: No module named 'pandas'"
**Problem**: Virtual environment not activated
**Solution**: Re-run activation command

```bash
source .venv/bin/activate  # You should see (.venv) in your terminal prompt
```

### Plot window doesn't appear
**Problem**: Matplotlib backend issue (common on macOS/Linux)
**Solution**: The plot is still saved! Check `first_day/plots/` folder

```bash
ls -lh first_day/plots/
```

## Next Steps

1. **Complete the assignment**: See [README.md](README.md#post-lecture-assignment) for details
2. **Experiment with the code**: Try different strains, colors, or plot types
3. **Review concepts**: Can you explain what each line of code does?

## Getting Help

- **During workshop**: Raise your hand or ask in the chat
- **After workshop**: Email instructor or post in course forum
- **Online**: [Stack Overflow](https://stackoverflow.com/questions/tagged/pandas), [Reddit r/learnpython](https://www.reddit.com/r/learnpython/)

---

**Full Documentation**: [README.md](README.md)
**Instructor Guide**: [lesson_plan.md](lesson_plan.md)
