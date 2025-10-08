# Day 1: Introduction to Python Data Visualization
## Theoretical Concepts and Workshop Overview

**Presenter Notes**: Use these slides to introduce theoretical concepts before hands-on coding

---

# Slide 1: Welcome & Objectives

## Day 1: Python for Microbiome Data Visualization

### What We'll Cover Today
- ✅ Load and inspect tabular data with pandas
- ✅ Create publication-quality plots with matplotlib
- ✅ Apply transformations (log scale) for biological data
- ✅ Compare experimental groups
- ✅ Make accessible, colorblind-friendly figures

### Who This Is For
- First-year PhD students
- No prior Python experience required
- Focus on practical skills, not programming theory

---

# Slide 2: Why Python for Data Science?

## Advantages Over Excel/GraphPad/SPSS

| Feature | Python | Excel | GraphPad |
|---------|--------|-------|----------|
| **Reproducibility** | ✅ Script = exact record | ❌ Manual clicks | ⚠️ Limited |
| **Scalability** | ✅ 1,000s of files | ❌ Slow, crashes | ❌ Limited |
| **Automation** | ✅ Run on new data | ❌ Manual redo | ⚠️ Limited |
| **Customization** | ✅ Infinite options | ❌ Templates only | ⚠️ Fixed styles |
| **Cost** | ✅ Free, open-source | 💰 License | 💰💰 Expensive |

### Real-World Example
"I have 200 samples. How long to create the same plot for each?"
- Excel: Days (manual work)
- Python: Minutes (one script, run 200 times)

---

# Slide 3: The Three Core Libraries

## Our Toolbox for Today

### 1. **pandas** 🐼
**What**: Spreadsheet-like data manipulation
**When**: Loading CSVs, filtering, grouping, calculating statistics
```python
df = pd.read_csv('data.csv')
df.groupby('treatment').mean()
```

### 2. **matplotlib** 📊
**What**: Creating plots and figures
**When**: Line plots, scatter plots, bar charts, heatmaps
```python
plt.plot(x, y)
plt.xlabel('Day')
plt.show()
```

### 3. **numpy** 🔢
**What**: Mathematical operations
**When**: Calculations, transformations (log, sqrt, etc.)
```python
log_values = np.log10(values)
```

---

# Slide 4: The Data Science Workflow

## Five Steps (Repeat as Needed)

```
1. INGEST  →  2. INSPECT  →  3. SUMMARIZE  →  4. VISUALIZE  →  5. REFINE
   ↑                                                                   ↓
   └───────────────────────────────────────────────────────────────────┘
```

### Applied to Our Workshop

1. **INGEST**: Load CSV file with `pd.read_csv()`
2. **INSPECT**: Check with `.head()`, `.info()`, `.describe()`
3. **SUMMARIZE**: Group by treatment, calculate means
4. **VISUALIZE**: Plot with `plt.plot()`
5. **REFINE**: Add labels, colors, log scale, annotations

**Key Point**: You'll iterate through this cycle multiple times per analysis!

---

# Slide 5: Understanding Tidy Data

## What is "Tidy" (Long-Form) Data?

### ❌ Wide Format (Spreadsheet-Friendly)
| Mouse | Day_0 | Day_1 | Day_2 | Day_3 |
|-------|-------|-------|-------|-------|
| M1    | 100   | 200   | 150   | 120   |
| M2    | 95    | 210   | 160   | 115   |

### ✅ Tidy Format (Python-Friendly)
| Mouse | Day | Value |
|-------|-----|-------|
| M1    | 0   | 100   |
| M1    | 1   | 200   |
| M1    | 2   | 150   |
| M2    | 0   | 95    |
| M2    | 1   | 210   |

**Why Tidy?**
- Easy to filter: `df[df['Day'] == 0]`
- Easy to group: `df.groupby('Mouse')`
- Easy to plot: `plt.plot(df['Day'], df['Value'])`

**All datasets in this workshop are already tidy!**

---

# Slide 6: Why Log Transformations?

## Biological Data Often Spans Orders of Magnitude

### Example: Bacterial Abundance
```
Mouse 1: 10,000,000 cells
Mouse 2: 1,000 cells
Mouse 3: 100 cells
```

### Problem: Can't See All Mice on Same Plot
On a linear scale, Mouse 3 is invisible!

### Solution: Log₁₀ Transformation
```
Mouse 1: log₁₀(10,000,000) = 7
Mouse 2: log₁₀(1,000) = 3
Mouse 3: log₁₀(100) = 2
```

Now all mice are visible and differences are interpretable!

### What Log₁₀ Means
- Each unit = 10× change
- log₁₀(100) = 2
- log₁₀(1000) = 3  ← One unit difference = 10× change

**We use log₁₀ for: bacterial counts, gene expression, cytokines, antibody titers**

---

# Slide 7: Matplotlib Anatomy

## Every Plot Has These Components

```
         Title
    ┌─────────────────┐
    │                 │
y-  │     Data Points │  Legend
a-  │     and Lines   │  ┌────┐
x-  │                 │  │ M1 │
i-  │                 │  │ M2 │
s   │                 │  └────┘
    └─────────────────┘
         x-axis
```

### Essential Elements
1. **Figure** - The entire canvas
2. **Axes** - The plotting area (can have multiple per figure)
3. **Data** - Points, lines, bars, etc.
4. **Labels** - x-axis, y-axis, title
5. **Legend** - What each color/marker means
6. **Annotations** - Extra info (arrows, text, markers)

**Our workshop builds complexity gradually, starting with just lines!**

---

# Slide 8: Object-Oriented vs State-Based Plotting

## Two Ways to Create Plots in Matplotlib

### 1️⃣ State-Based (Quick & Dirty)
```python
plt.plot(x, y)
plt.xlabel('Day')
plt.title('My Plot')
plt.show()
```
**Pro**: Fast for simple plots
**Con**: Hard to customize, confusing with multiple plots

### 2️⃣ Object-Oriented (Recommended!)
```python
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_xlabel('Day')
ax.set_title('My Plot')
plt.show()
```
**Pro**: Full control, explicit, works with complex figures
**Con**: Slightly more typing

**We use object-oriented style in this workshop!**

---

# Slide 9: Colorblind Accessibility

## ~8% of Men Have Color Vision Deficiency

### ❌ Bad: Red-Green Pairs
Most common type is red-green colorblindness (deuteranopia)

### ✅ Good: Okabe-Ito Palette
Designed specifically for colorblind accessibility

<div style="display: flex; gap: 10px;">
  <div style="background: #E69F00; padding: 10px; color: white;">Orange</div>
  <div style="background: #56B4E9; padding: 10px;">Sky Blue</div>
  <div style="background: #009E73; padding: 10px; color: white;">Bluish Green</div>
  <div style="background: #F0E442; padding: 10px;">Yellow</div>
  <div style="background: #0072B2; padding: 10px; color: white;">Blue</div>
  <div style="background: #D55E00; padding: 10px; color: white;">Vermillion</div>
  <div style="background: #CC79A7; padding: 10px;">Pink</div>
  <div style="background: #999999; padding: 10px; color: white;">Gray</div>
</div>

### Redundant Encoding (Best Practice!)
Don't rely on color alone:
- Use different **markers** (○, □, △, ◇)
- Use different **line styles** (──, - -, -.-, ··)
- Add **text labels** when possible

**Step 11 covers this in detail!**

---

# Slide 10: Reproducibility Best Practices

## Why Scripts > Manual Work

### The Reproducibility Crisis
- 70% of researchers can't reproduce others' results
- 50% can't reproduce their OWN results!

### How Python Helps

✅ **Script = Exact Record**
```python
# Every step documented
df = pd.read_csv('data.csv')
df = df[df['treatment'] == 'vancomycin']
df['log_value'] = np.log10(df['value'])
```

✅ **Version Control (Git)**
- Track changes over time
- Collaborate without conflicts
- Return to any previous version

✅ **Self-Documenting**
```python
# Comments explain WHY
df = df[df['value'] > 0]  # Remove zeros before log transform
```

✅ **Reusable**
Same script works on new data tomorrow, next month, next year!

---

# Slide 11: Common Mistakes to Avoid

## Pitfalls We'll Help You Navigate

### 1. File Path Errors
❌ `pd.read_csv('data.csv')`  ← Where is it?
✅ `pd.read_csv('first_day/data/yl32_vancomycin.csv')`  ← Clear path

### 2. Forgetting Imports
❌ `df = read_csv('data.csv')`  ← NameError!
✅ `import pandas as pd` first

### 3. Index Confusion
❌ `my_list[1]` to get first item
✅ `my_list[0]`  ← Python counts from 0!

### 4. Log of Zero
❌ `np.log10(0)`  ← Returns -∞ or error
✅ Filter out zeros first, or use pseudocount

### 5. No Axis Labels
❌ Plot with no labels
✅ Always add `xlabel`, `ylabel`, `title`

**We'll encounter and fix these during the workshop!**

---

# Slide 12: Today's Dataset

## YL32 Abundance in OMM Mice

### Experimental Design
- **Model**: Oligo-Mouse-Microbiota (OMM) - 12 defined bacterial strains
- **Intervention**: 3 antibiotics + water control
- **Sampling**: Daily fecal pellets, 10 days
- **Measurement**: qPCR for YL32 strain abundance

### Scientific Questions
1. How do different antibiotics affect YL32?
2. How long does suppression last?
3. When does recovery begin?
4. Is there variability between mice?

### Your Task
Create plots that communicate these biological insights clearly!

---

# Slide 13: Workshop Structure

## Hour-by-Hour Breakdown

### Pre-Workshop (Optional)
**Step 0**: Python basics for absolute beginners (30-45 min)

### Hour 1: Foundations (30 min)
- Load CSV files
- Inspect data structure
- Create first line plot

### Hour 2: Replicates (45 min)
- Work with multiple mice
- Use `.groupby()` for summaries
- Overlay multiple lines

### Hour 3: Advanced Techniques (60 min)
- Apply log₁₀ transformations
- Add jittered scatter points
- Annotate experimental events

### Hour 4: Multi-Group Comparisons (Optional, 60 min)
- Compare treatment effects
- Create faceted plots
- Statistical thinking

### Bonus: Accessibility (30 min)
- Colorblind-friendly palettes
- Redundant encoding
- Professional figure standards

---

# Slide 14: Learning Objectives Recap

## By the End of Today, You Will Be Able To:

### Technical Skills
- ✅ Load CSV files with `pd.read_csv()`
- ✅ Inspect data with `.head()`, `.info()`, `.describe()`
- ✅ Calculate summary statistics with `.groupby()`
- ✅ Create line plots with `matplotlib`
- ✅ Apply log transformations with `numpy`
- ✅ Add labels, legends, and annotations
- ✅ Save publication-ready figures

### Conceptual Understanding
- ✅ Understand tidy data format
- ✅ Know when to use log scale
- ✅ Recognize visualization best practices
- ✅ Appreciate reproducibility benefits
- ✅ Understand accessibility principles

### Career Skills
- ✅ Read scientific Python code
- ✅ Adapt examples to your own data
- ✅ Debug common errors
- ✅ Find help resources

---

# Slide 15: Getting Help

## You're Not Alone!

### During the Workshop
- 🙋 Raise your hand or ask in chat
- 👥 Work with neighbors
- 📖 Reference Step 0 guide
- 💬 No question is too basic!

### After the Workshop
- 📧 Email the instructor
- 💬 Course forum/Slack channel
- 📚 Reread the guides (README, step00.md)
- 🔄 Re-run scripts with modifications

### Online Resources
- **Stack Overflow** - Search for error messages
- **Pandas Documentation** - Official reference
- **Real Python** - Excellent tutorials
- **Reddit r/learnpython** - Friendly community

### Philosophy
**Everyone was a beginner once. Struggling = learning!**

---

# Slide 16: Let's Get Started!

## Pre-Flight Checklist

### ✅ Environment Setup
```bash
cd /path/to/omm/first_day
python -m venv .venv
source .venv/bin/activate
pip install pandas matplotlib numpy
```

### ✅ Test Installation
```bash
python -c "import pandas; import matplotlib; print('Ready!')"
```

### ✅ Mindset
- Experiment freely (you can't break anything!)
- Read error messages carefully (they're helpful!)
- Copy-paste is learning (then modify to understand)
- Collaborate with neighbors

---

## 🚀 Open Your Terminal and Let's Begin!

**First Command**:
```bash
python first_day/scripts/step01_load_single_mouse.py
```

---

# Appendix: Quick Reference

## Essential Commands

### Import Libraries
```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
```

### Load Data
```python
df = pd.read_csv('path/to/file.csv')
```

### Inspect Data
```python
df.head()       # First 5 rows
df.info()       # Structure
df.describe()   # Statistics
```

### Plot Data
```python
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
plt.savefig('output.png')
plt.show()
```

### Transform Data
```python
df['log_value'] = np.log10(df['value'])
```

---

# Appendix: Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `ModuleNotFoundError: No module named 'pandas'` | Library not installed | `pip install pandas` |
| `FileNotFoundError: [Errno 2] No such file` | Wrong file path | Check path, use `pwd` to see location |
| `KeyError: 'column_name'` | Column doesn't exist | Check spelling, use `df.columns` to list |
| `IndexError: list index out of range` | Accessing item that doesn't exist | Check list length with `len()` |
| `TypeError: unsupported operand type` | Wrong data type | Check with `type()`, convert if needed |

---

**End of Slides**

**Presenter**: Use these as a 15-20 minute introduction before hands-on work
**Format**: Can be presented as slides, PDF, or read as notes
**Timing**: ~2 minutes per slide, adjust based on audience questions

---

**Last Updated**: 2025-10-08
