# Teaching Guide – Using the Complete Workshop Package

## 📋 Quick Start for Instructors

This guide helps you use all the materials effectively for maximum student learning.

---

## 🎯 Three-Tier Approach

### Tier 1: Theory (Before Workshop)
**File**: `slides.md`
**Timing**: 15-20 minutes
**Format**: Present as slides or review as notes

**Purpose**: Set theoretical foundation before hands-on coding

**Key slides to emphasize**:
- Slide 3: The three core libraries
- Slide 5: Tidy data format
- Slide 6: Log transformations (crucial!)
- Slide 9: Colorblind accessibility
- Slide 11: Common mistakes

### Tier 2: Prerequisites (Homework or Pre-Session)
**File**: `step00.md`
**Timing**: 30-45 minutes (student self-paced)
**Format**: Markdown reading guide

**Purpose**: Get absolute beginners up to speed

**How to assign**:
1. Email to students 2-3 days before workshop
2. Say: "If you're new to Python, please read `step00.md` before Day 1"
3. Emphasize it's OPTIONAL for experienced students
4. Mention `step00_interactive.py` for extra practice

### Tier 3: Hands-On Workshop (Main Event)
**Files**: `step01.py` through `step11.py`
**Timing**: 3-4 hours
**Format**: Live coding with instructor

**Teaching strategy**:
1. Project script on screen
2. Walk through code line-by-line
3. Run together
4. Discuss output
5. Encourage modifications

---

## 📅 Sample Workshop Schedule

### Option A: Full Day Workshop (6 hours)

**9:00 - 9:20** (20 min)
- Present `slides.md` (theoretical concepts)
- Answer questions

**9:20 - 9:45** (25 min)
- Quick `step00.md` review for those who didn't do homework
- Set up environments together

**9:45 - 10:30** (45 min)
- **Hour 1**: Steps 1-2 (Load data, first plot)
- *Break* (10 min)

**10:40 - 11:30** (50 min)
- **Hour 2**: Steps 3-4 (Multiple mice, overlays)
- *Break* (10 min)

**11:40 - 12:40** (60 min)
- **Hour 3**: Steps 5-7 (Transformations, annotations)
- *Lunch* (60 min)

**1:40 - 2:40** (60 min)
- **Hour 4**: Steps 8-10 (Multi-group analysis)
- *Break* (10 min)

**2:50 - 3:30** (40 min)
- **Bonus**: Step 11 (Colorblind-friendly)
- Assignment overview
- Q&A

### Option B: Two Half-Days

**Day 1 (3 hours)**
- Slides + Step 0 review (30 min)
- Steps 1-7 (2.5 hours)

**Day 2 (2 hours)**
- Steps 8-11 (1.5 hours)
- Assignment work time (30 min)

### Option C: Self-Paced Online

**Pre-Work**:
- Read `step00.md`
- Watch recorded `slides.md` presentation

**Week 1**: Steps 1-7
**Week 2**: Steps 8-11
**Week 3**: Assignment due

---

## 🎓 Teaching Tips by Student Level

### For Absolute Beginners

**Before Workshop**:
- ✅ MUST read `step00.md`
- ✅ SHOULD run `step00_interactive.py`
- ✅ Test environment setup in advance

**During Workshop**:
- Pair with more experienced students
- Encourage using `step00.md` as reference
- Expect slower pace on Steps 1-3
- May skip Steps 8-10 if time-constrained

**Red flags**:
- "What's a library?" → Send to `step00.md` Part 1
- "Where do I type this?" → Review command line basics
- Import errors → Environment not set up

### For Intermediate Students

**Before Workshop**:
- ⚠️ Can skip `step00.md` 
- ✅ Review `slides.md` for context

**During Workshop**:
- Move through Steps 1-7 at normal pace
- Challenge with Steps 8-11
- Encourage customization and experimentation

**Extension activities**:
- "Try plotting a different strain"
- "Add error bars to the plot"
- "Change to a different color palette"

### For Advanced Students

**Before Workshop**:
- ❌ Skip `step00.md` entirely
- ⚠️ Skim `slides.md` for biological context

**During Workshop**:
- May find Steps 1-4 too slow
- Focus on Steps 5-11 (advanced techniques)
- Assign as peer helpers

**Extension activities**:
- "Implement seaborn instead of matplotlib"
- "Add statistical tests (t-test, ANOVA)"
- "Create an interactive plot with plotly"

---

## 🔧 Technical Setup Checklist

### 1 Week Before

- [ ] Test all scripts on YOUR machine
- [ ] Verify all plots generate correctly
- [ ] Send `step00.md` to students as homework
- [ ] Share environment setup instructions

### 1 Day Before

- [ ] Confirm room has projector + internet
- [ ] Test screen sharing (if virtual)
- [ ] Prepare backup: USB with materials
- [ ] Have reference plots ready to show

### Day Of

- [ ] Arrive 15 min early
- [ ] Test projector/screen share
- [ ] Have `slides.md` open and ready
- [ ] Keep `step00.md` in separate window for quick reference
- [ ] Terminal window ready to go

---

## 🆘 Troubleshooting Common Issues

### "I can't install pandas"

**Causes**:
- No pip installed
- Permission errors
- Wrong Python version

**Solutions**:
1. `python -m pip install pandas` (use module form)
2. `python3 -m pip install pandas` (specify Python 3)
3. Check version: `python --version` (need 3.8+)

### "FileNotFoundError"

**Cause**: Running from wrong directory

**Solution**:
```bash
pwd  # Check where you are
cd /path/to/omm  # Navigate to project root
python first_day/scripts/step01_load_single_mouse.py
```

### "ModuleNotFoundError"

**Cause**: Virtual environment not activated

**Solution**:
```bash
source first_day/.venv/bin/activate  # Mac/Linux
first_day\.venv\Scripts\activate     # Windows
```

### "Plot doesn't show"

**Cause**: Backend issues on some systems

**Solution**: 
- Plot IS saved to `plots/` folder
- Use `plt.savefig()` and check files
- Add `plt.ion()` at top of script

---

## 📊 Using slides.md

### Converting to PowerPoint

**Option 1**: Use Pandoc (command line)
```bash
pandoc slides.md -o slides.pptx
```

**Option 2**: Use online converter
- https://www.markdowntopdf.com/
- https://md2pptx.github.io/

**Option 3**: Present directly from Markdown
- Use Marp (VS Code extension)
- Use reveal.js
- Use slides.com

### Customization Tips

**Add your institution's branding**:
```markdown
# Slide 1: Welcome

![Logo](university_logo.png)

## Workshop at XYZ University
```

**Add speaker notes**:
```markdown
# Slide 5: Tidy Data

<!-- 
Speaker notes: 
- Emphasize this is fundamental to pandas
- Show example from their research domain
-->
```

---

## 📝 Assessment Ideas

### Formative (During Workshop)

1. **Concept checks** (after each hour):
   - "What does `.groupby()` do?"
   - "Why use log scale for this data?"

2. **Code predictions**:
   - "What will this line output?"
   - "What happens if we change this parameter?"

3. **Debugging exercises**:
   - Introduce intentional error
   - Students find and fix

### Summative (Assignment)

**Provided in materials**:
- Analyze multi-strain dataset
- Create 2+ plots for different strain
- Use colorblind-friendly palette
- Write interpretation (2-3 sentences per plot)

**Grading rubric** (from README.md):
- Code runs: 25%
- Plots created: 25%
- Well-commented: 20%
- Interpretation: 20%
- Colorblind palette (bonus): +10%

### Advanced Extensions

1. **Statistical analysis**:
   - Add t-tests comparing groups
   - Calculate effect sizes
   - Report p-values on plots

2. **Interactive visualizations**:
   - Convert to plotly
   - Add hover tooltips
   - Create dashboard

3. **Publication-ready figures**:
   - Multi-panel figures
   - Consistent styling
   - High-resolution output

---

## 🎯 Learning Objectives Checklist

By end of workshop, students should be able to:

**Technical Skills**:
- [ ] Import pandas, matplotlib, numpy
- [ ] Load CSV with `pd.read_csv()`
- [ ] Inspect data with `.head()`, `.info()`, `.describe()`
- [ ] Filter rows and select columns
- [ ] Group data with `.groupby()`
- [ ] Calculate statistics (mean, median, std)
- [ ] Create line plots
- [ ] Apply log transformations
- [ ] Add labels, legends, annotations
- [ ] Save figures
- [ ] Use colorblind-safe palettes

**Conceptual Understanding**:
- [ ] Explain tidy data format
- [ ] Justify when to use log scale
- [ ] Identify visualization best practices
- [ ] Understand reproducibility benefits
- [ ] Recognize accessibility needs

**Practical Application**:
- [ ] Adapt code to new datasets
- [ ] Debug common errors
- [ ] Find help resources
- [ ] Plan analysis workflow

---

## 📞 Post-Workshop Follow-Up

### Immediate (Day 1)

- [ ] Share slides and code via email/LMS
- [ ] Remind about assignment deadline
- [ ] Share recording (if applicable)
- [ ] Send feedback survey

### Week 1

- [ ] Answer questions on forum
- [ ] Share additional resources
- [ ] Provide example assignment solution

### Week 2

- [ ] Grade assignments
- [ ] Share common mistakes found
- [ ] Plan Day 2 workshop based on feedback

---

## 📚 Adapting Materials

### For Different Domains

**Change dataset, keep structure**:
- Genomics: Gene expression over time
- Immunology: Cytokine levels by treatment
- Ecology: Species abundance by habitat
- Chemistry: Reaction kinetics

**Keep**:
- Log transformations (universal in biology)
- Tidy data format
- Reproducibility principles
- Colorblind accessibility

### For Different Skill Levels

**Beginners** (extend):
- Add more Step 0 content
- Slow down Steps 1-4
- Skip Steps 8-11
- Provide more templates

**Advanced** (condense):
- Skip Step 0 entirely
- Speed through Steps 1-4
- Focus on Steps 5-11
- Add statistical testing

---

## ✅ Success Metrics

Workshop is successful if:

- [ ] 80%+ students complete environment setup
- [ ] 70%+ students complete Steps 1-7
- [ ] 50%+ students attempt Steps 8-11
- [ ] 90%+ can load and plot their own data
- [ ] Positive feedback on surveys
- [ ] Students use skills in their research

---

**Last Updated**: 2025-10-08
**Questions?**: See README.md or contact instructor
