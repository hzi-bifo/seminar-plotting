"""
Step 8: Load the multi-group dataset (all treatment groups)

Learning goals:
- Work with datasets containing multiple treatment groups
- Understand experimental design with controls
- Compare sample sizes across groups
"""

import pandas as pd

# Load the full multi-group dataset
all_groups = pd.read_csv("first_day/data/yl32_all_groups.csv")

print("First 15 rows:")
print(all_groups.head(15))
print("\n" + "="*60 + "\n")

# Check treatment groups
print("Treatment groups and sample counts:")
print(all_groups["group"].value_counts())
print("\n" + "="*60 + "\n")

# Check mice per group
print("Mice per treatment group:")
group_mice = all_groups.groupby("group")["mouse"].nunique()
print(group_mice)
print("\n" + "="*60 + "\n")

# Summary by group and day
print("Sample counts by group and day:")
counts = all_groups.groupby(["group", "day"]).size().reset_index(name="n_replicates")
print(counts)
print("\n" + "="*60 + "\n")

# Discussion questions
print("DISCUSSION QUESTIONS:")
print("1. Why does the water group have fewer measurements?")
print("2. What is the purpose of the water control group?")
print("3. How many different antibiotics were tested?")
print("4. Why keep the post_antibiotic flag in the dataset?")
