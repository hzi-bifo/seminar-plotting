# Day 1 Workshop – File Structure

## 📁 Directory Overview

```
first_day/
├── README.md                    # 📘 Student guide (start here!)
├── lesson_plan.md               # 👨‍🏫 Instructor guide with teaching tips
├── QUICKSTART.md                # ⚡ Quick reference for students
├── STRUCTURE.md                 # 📋 This file
├── .gitignore                   # Git ignore rules
│
├── data/                        # 📊 All datasets
│   ├── yl32_vancomycin_mouse1.csv        # Single mouse (starter)
│   ├── yl32_vancomycin.csv               # All vancomycin mice
│   ├── yl32_all_groups.csv               # All treatment groups
│   └── multi_strain_timeseries.csv       # Assignment dataset (12 strains)
│
├── scripts/                     # 🐍 Python scripts (run in order)
│   ├── step01_load_single_mouse.py       # Load CSV, inspect data
│   ├── step02_first_plot.py              # Create basic line plot
│   ├── step03_load_all_mice.py           # Groupby summaries
│   ├── step04_plot_all_mice.py           # Overlay multiple lines
│   ├── step05_log_transform.py           # Apply log transformation
│   ├── step06_jittered_replicates.py     # Scatter + line plots
│   ├── step07_annotate_antibiotic.py     # Add annotations
│   ├── step08_load_all_groups.py         # Multi-group datasets
│   ├── step09_facet_by_group.py          # Faceted plots
│   └── step10_compare_group_means.py     # Compare treatments
│
└── plots/                       # 📈 Reference output plots
    ├── mouse1_raw.png
    ├── all_mice_raw.png
    ├── all_mice_log10.png
    ├── all_mice_log10_jitter.png
    ├── all_mice_log10_jitter_annotated.png
    ├── all_groups_log10_facets.png
    └── all_groups_log10_mean.png
```

## 🎯 For Students

**Start here**: [README.md](README.md)

Quick workflow:
1. Read [QUICKSTART.md](QUICKSTART.md) for setup
2. Run scripts 1–7 in order (required)
3. Run scripts 8–10 if time permits (optional)
4. Complete assignment using `multi_strain_timeseries.csv`

## 👨‍🏫 For Instructors

**Start here**: [lesson_plan.md](lesson_plan.md)

Key resources:
- **Teaching format**: Project scripts on screen, run together, discuss output
- **Time allocation**: 30 min (Hour 1) + 45 min (Hour 2) + 60 min (Hour 3) + 60 min (Hour 4, optional)
- **Backup plan**: Pre-generated plots in `plots/` folder
- **Common errors**: See troubleshooting section in lesson plan

## 📊 Dataset Details

| File | Rows | Purpose | Required? |
|------|------|---------|-----------|
| `yl32_vancomycin_mouse1.csv` | ~10 | Starter dataset (1 mouse) | Yes (Steps 1–2) |
| `yl32_vancomycin.csv` | ~40 | Full vancomycin cohort (4 mice) | Yes (Steps 3–7) |
| `yl32_all_groups.csv` | ~160 | All treatments + control | Optional (Steps 8–10) |
| `multi_strain_timeseries.csv` | ~160 | 12 strains for assignment | Assignment only |

## 🐍 Script Dependencies

### Core Steps (Required)
- **Step 1**: No dependencies
- **Step 2**: Requires Step 1 concepts
- **Step 3**: Requires pandas basics from Step 1
- **Step 4**: Requires groupby from Step 3
- **Step 5**: Requires plotting from Step 4
- **Step 6**: Requires log transform from Step 5
- **Step 7**: Builds on Step 6

### Optional Steps
- **Step 8**: Independent (can skip Steps 1–7 if needed)
- **Step 9**: Requires Step 8
- **Step 10**: Requires Step 8

## 🔧 Environment Requirements

**Python version**: 3.8+
**Required packages**:
- `pandas` >= 1.3.0
- `matplotlib` >= 3.3.0
- `numpy` >= 1.20.0

Install all:
```bash
pip install pandas matplotlib numpy
```

## 📝 Outputs

### Console Outputs (Steps 1, 3, 8)
- DataFrame info (`.info()`)
- Summary statistics (`.describe()`)
- Group-level aggregations (`.groupby()`)
- Discussion questions

### Plot Outputs (Steps 2, 4, 5, 6, 7, 9, 10)
- Saved to `plots/` directory
- Resolution: 150 DPI
- Format: PNG
- Filenames match step numbers

## 🎓 Learning Progression

**Hour 1**: Pandas basics → First plot
**Hour 2**: Multi-replicate data → Overlays
**Hour 3**: Transformations → Annotations
**Hour 4**: Multi-group comparisons → Facets

## 🆘 Common Issues

| Issue | Fix |
|-------|-----|
| Script can't find data files | Run from `omm/` root, not `omm/first_day/` |
| Import errors | Activate virtual environment |
| Plots don't show | Check `plots/` folder – they're saved automatically |

## 📚 Additional Resources

- **Full student guide**: [README.md](README.md)
- **Instructor guide**: [lesson_plan.md](lesson_plan.md)
- **Quick reference**: [QUICKSTART.md](QUICKSTART.md)

---

**Last Updated**: 2025-10-08
