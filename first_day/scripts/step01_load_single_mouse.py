"""
Step 1: Load and inspect the single-mouse starter file

Learning goals:
- Load CSV data using pandas
- Inspect DataFrame structure with .head(), .info(), .describe()
- Understand column types and data ranges
"""

import pandas as pd

# Load the single-mouse dataset
mouse1 = pd.read_csv("first_day/data/yl32_vancomycin_mouse1.csv")

# Display first few rows
print("First 5 rows of Mouse 1 data:")
print(mouse1.head())
print("\n" + "="*60 + "\n")

# Show DataFrame structure
print("DataFrame structure:")
print(mouse1.info())
print("\n" + "="*60 + "\n")

# Summary statistics
print("Summary statistics:")
print(mouse1.describe())
print("\n" + "="*60 + "\n")

# Discussion questions for students:
print("DISCUSSION QUESTIONS:")
print("1. How many timepoints do we have?")
print("2. What is the range of YL32 abundance values?")
print("3. When does the post_antibiotic flag turn True?")
print("4. Are the days evenly spaced?")
