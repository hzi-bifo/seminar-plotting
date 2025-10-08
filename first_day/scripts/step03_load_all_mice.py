"""
Step 3: Load and explore the full vancomycin cohort (all 4 mice)

Learning goals:
- Work with multi-replicate datasets
- Understand "tidy" (long-form) data structure
- Use .groupby() for group-level summaries
"""

import pandas as pd

# Load all mice
all_mice = pd.read_csv("first_day/data/yl32_vancomycin.csv")

print("First 10 rows of the full dataset:")
print(all_mice.head(10))
print("\n" + "="*60 + "\n")

# Check how many measurements per mouse
print("Number of measurements per mouse:")
print(all_mice["mouse"].value_counts().sort_index())
print("\n" + "="*60 + "\n")

# Group-level summary statistics by day
print("Computing daily mean and median across all mice:")
summary = (all_mice
           .groupby("day")
           .agg(mean_yl32=("yl32", "mean"),
                median_yl32=("yl32", "median"),
                std_yl32=("yl32", "std"),
                count=("yl32", "count"))
           .reset_index())

print(summary)
print("\n" + "="*60 + "\n")

# Discussion questions
print("DISCUSSION QUESTIONS:")
print("1. Why is this dataset in 'long' format (one row per measurement)?")
print("2. How does the standard deviation change over time?")
print("3. What's the difference between mean and median at each timepoint?")
print("4. Why might we prefer median over mean for this type of data?")
