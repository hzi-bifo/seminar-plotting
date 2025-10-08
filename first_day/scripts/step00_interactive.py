"""
Step 0: Python Basics and Prerequisites

This is a gentle introduction for students who need a refresher on Python fundamentals
before diving into the main workshop. If you're comfortable with Python, feel free to
skip to step01_load_single_mouse.py

Learning goals:
- Understand what libraries/packages are and how to import them
- Learn basic function calling syntax
- Read files with different delimiters (CSV, TSV, custom)
- Work with file paths (absolute vs relative)
- Understand basic data types (strings, numbers, lists)
- Navigate the command line
"""

print("=" * 70)
print("WELCOME TO STEP 0: PYTHON BASICS")
print("=" * 70)
print()
print("This script will teach you the fundamental concepts needed for")
print("the workshop. Follow along and read the comments carefully!")
print()

# =============================================================================
# PART 1: What are libraries and how do we import them?
# =============================================================================
print("=" * 70)
print("PART 1: Libraries and Imports")
print("=" * 70)
print()

print("A LIBRARY (or PACKAGE) is a collection of pre-written code that")
print("someone else created to make your life easier.")
print()
print("Think of it like a toolbox:")
print("  - 'pandas' is a toolbox for working with spreadsheet-like data")
print("  - 'matplotlib' is a toolbox for creating plots and charts")
print("  - 'numpy' is a toolbox for mathematical operations")
print()

# Importing a library
import pandas as pd  # 'pd' is a nickname we give to pandas (shorter to type!)
import numpy as np   # 'np' is the standard nickname for numpy

print("✅ We just imported two libraries:")
print("   import pandas as pd     <- Now we can use 'pd' to access pandas functions")
print("   import numpy as np      <- Now we can use 'np' to access numpy functions")
print()

# You can also import specific functions from a library
from pathlib import Path  # Import just the Path function from pathlib

print("✅ We can also import specific parts:")
print("   from pathlib import Path  <- Only import what we need")
print()

# =============================================================================
# PART 2: Calling functions and understanding syntax
# =============================================================================
print("=" * 70)
print("PART 2: Functions and Basic Syntax")
print("=" * 70)
print()

print("A FUNCTION is like a mini-program that does a specific task.")
print("You 'call' a function by writing its name followed by parentheses ()")
print()

# Built-in functions (available without importing anything)
my_name = "Python Learner"
name_length = len(my_name)  # len() counts the characters

print(f"Example: len('{my_name}') = {name_length}")
print()

# Functions with arguments (inputs)
print("Functions can take ARGUMENTS (inputs) inside the parentheses:")
print()
print("  my_list = [1, 2, 3, 4, 5]")
print("  total = sum(my_list)      <- sum() adds all numbers in the list")
print()

my_list = [1, 2, 3, 4, 5]
total = sum(my_list)
print(f"Result: sum({my_list}) = {total}")
print()

# Functions from libraries use the library name prefix
print("Library functions use DOT NOTATION:")
print("  library_name.function_name(arguments)")
print()
print("Example: np.mean([1, 2, 3]) calculates the average using numpy")
average = np.mean([1, 2, 3])
print(f"Result: {average}")
print()

# =============================================================================
# PART 3: File paths (absolute vs relative)
# =============================================================================
print("=" * 70)
print("PART 3: File Paths - How to Tell Python Where Files Are")
print("=" * 70)
print()

print("ABSOLUTE PATH: The complete address from your computer's root")
print("  Example (Mac/Linux): /Users/yourname/Documents/data/file.csv")
print("  Example (Windows):   C:\\Users\\yourname\\Documents\\data\\file.csv")
print()

print("RELATIVE PATH: Address relative to where your script is running")
print("  Example: first_day/data/file.csv")
print("           ^-- This means 'look in the first_day folder, then data folder'")
print()

print("💡 TIP: Use relative paths in your scripts so they work on any computer!")
print()

# Let's check where we are right now
import os
current_dir = os.getcwd()  # 'cwd' = Current Working Directory
print(f"Your current working directory: {current_dir}")
print()
print("When you run: python first_day/scripts/step00_python_basics.py")
print("Python looks for files starting from:", current_dir)
print()

# =============================================================================
# PART 4: Reading files with different delimiters
# =============================================================================
print("=" * 70)
print("PART 4: Reading Files with Different Delimiters")
print("=" * 70)
print()

print("A DELIMITER is the character that separates values in a text file:")
print("  CSV (Comma-Separated Values):  value1,value2,value3")
print("  TSV (Tab-Separated Values):    value1    value2    value3")
print("  Custom delimiter (like '|'):   value1|value2|value3")
print()

# Let's create a simple example file to practice with
example_csv = """name,age,favorite_color
Alice,25,blue
Bob,30,green
Charlie,22,red"""

example_tsv = """name\tage\tfavorite_color
Alice\t25\tblue
Bob\t30\tgreen
Charlie\t22\tred"""

# Save to files (we'll read them back in a moment)
with open("first_day/data/example.csv", "w") as f:
    f.write(example_csv)

with open("first_day/data/example.tsv", "w") as f:
    f.write(example_tsv)

print("✅ Created two example files:")
print("   first_day/data/example.csv  (comma-separated)")
print("   first_day/data/example.tsv  (tab-separated)")
print()

# Reading a CSV file
print("Reading a CSV file with pandas:")
print("  df = pd.read_csv('first_day/data/example.csv')")
print()

df_csv = pd.read_csv("first_day/data/example.csv")
print(df_csv)
print()

# Reading a TSV file (need to specify the delimiter)
print("Reading a TSV file (tab-separated):")
print("  df = pd.read_csv('first_day/data/example.tsv', sep='\\t')")
print("                                                   ^-- '\\t' means 'tab'")
print()

df_tsv = pd.read_csv("first_day/data/example.tsv", sep="\t")
print(df_tsv)
print()

print("💡 KEY POINT: pd.read_csv() can read ANY delimiter!")
print("   Just use the 'sep' parameter to specify what separates your values.")
print()

# =============================================================================
# PART 5: Basic data types and structures
# =============================================================================
print("=" * 70)
print("PART 5: Data Types - Understanding What Python 'Sees'")
print("=" * 70)
print()

print("Python has several basic data types:")
print()

# String (text)
my_string = "Hello, world!"
print(f"STRING (text):    '{my_string}'    <- Use quotes for text")
print(f"  Type: {type(my_string)}")
print()

# Integer (whole number)
my_integer = 42
print(f"INTEGER (number): {my_integer}       <- No quotes for numbers")
print(f"  Type: {type(my_integer)}")
print()

# Float (decimal number)
my_float = 3.14159
print(f"FLOAT (decimal):  {my_float}   <- Numbers with decimal points")
print(f"  Type: {type(my_float)}")
print()

# Boolean (True/False)
my_bool = True
print(f"BOOLEAN:          {my_bool}      <- Only True or False")
print(f"  Type: {type(my_bool)}")
print()

# List (collection of items)
my_list = ["apple", "banana", "cherry"]
print(f"LIST:             {my_list}  <- Use square brackets []")
print(f"  Type: {type(my_list)}")
print(f"  Access items: my_list[0] = '{my_list[0]}'  <- First item is index 0!")
print()

# Dictionary (key-value pairs)
my_dict = {"name": "Alice", "age": 25, "city": "Boston"}
print(f"DICTIONARY:       {my_dict}")
print(f"  Type: {type(my_dict)}")
print(f"  Access values: my_dict['name'] = '{my_dict['name']}'")
print()

# =============================================================================
# PART 6: Command line basics
# =============================================================================
print("=" * 70)
print("PART 6: Command Line Basics")
print("=" * 70)
print()

print("The COMMAND LINE (or TERMINAL) is where you type text commands")
print("to tell your computer what to do.")
print()

print("Common commands you'll use:")
print()
print("  pwd              <- Print Working Directory (where am I?)")
print("  ls               <- List files in current directory (Mac/Linux)")
print("  dir              <- List files in current directory (Windows)")
print("  cd folder_name   <- Change Directory (move into a folder)")
print("  cd ..            <- Go up one level (to parent folder)")
print("  python script.py <- Run a Python script")
print()

print("Example workflow:")
print()
print("  $ pwd                    # Check where you are")
print("  /Users/yourname/Desktop")
print()
print("  $ cd omm                 # Move into the omm folder")
print("  $ pwd                    # Check again")
print("  /Users/yourname/Desktop/omm")
print()
print("  $ ls                     # See what's in this folder")
print("  first_day/  README.md")
print()
print("  $ python first_day/scripts/step00_python_basics.py")
print("  # Now running this script!")
print()

# =============================================================================
# PART 7: Practical exercise - Putting it all together
# =============================================================================
print("=" * 70)
print("PART 7: Mini Exercise - Let's Practice!")
print("=" * 70)
print()

print("We're going to:")
print("1. Read a CSV file")
print("2. Inspect its contents")
print("3. Calculate some basic statistics")
print("4. Save results to a new file")
print()

# Step 1: Read the file
print("Step 1: Read the example.csv file we created earlier")
df = pd.read_csv("first_day/data/example.csv")
print(df)
print()

# Step 2: Inspect the data
print("Step 2: Check the shape (rows and columns)")
print(f"  df.shape = {df.shape}  <- (rows, columns)")
print()

print("Step 3: Check column names")
print(f"  df.columns = {list(df.columns)}")
print()

print("Step 4: Check data types")
print("  df.dtypes:")
print(df.dtypes)
print()

# Step 5: Calculate statistics
print("Step 5: Calculate the average age")
average_age = df["age"].mean()
print(f"  Average age: {average_age}")
print()

# Step 6: Create a new column
print("Step 6: Add a new column (is_young = age < 25)")
df["is_young"] = df["age"] < 25
print(df)
print()

# Step 7: Save to a new file
print("Step 7: Save the modified data to a new file")
df.to_csv("first_day/data/example_modified.csv", index=False)
print("  ✅ Saved to: first_day/data/example_modified.csv")
print()

# =============================================================================
# SUMMARY AND NEXT STEPS
# =============================================================================
print("=" * 70)
print("CONGRATULATIONS! You've learned the basics!")
print("=" * 70)
print()

print("📚 KEY CONCEPTS COVERED:")
print()
print("✅ Libraries and imports (pandas, numpy)")
print("✅ Function syntax and calling")
print("✅ File paths (absolute vs relative)")
print("✅ Reading files with different delimiters")
print("✅ Basic data types (strings, numbers, lists, dictionaries)")
print("✅ Command line navigation")
print("✅ Reading and manipulating data with pandas")
print()

print("=" * 70)
print("QUICK REFERENCE CHEAT SHEET:")
print("=" * 70)
print()
print("Import libraries:")
print("  import pandas as pd")
print("  import matplotlib.pyplot as plt")
print("  import numpy as np")
print()
print("Read a CSV file:")
print("  df = pd.read_csv('path/to/file.csv')")
print()
print("Read a TSV file:")
print("  df = pd.read_csv('path/to/file.tsv', sep='\\t')")
print()
print("Inspect data:")
print("  df.head()       # First 5 rows")
print("  df.info()       # Column types and counts")
print("  df.describe()   # Summary statistics")
print("  df.shape        # (rows, columns)")
print("  df.columns      # Column names")
print()
print("Access columns:")
print("  df['column_name']   # Get one column")
print("  df[['col1', 'col2']]  # Get multiple columns")
print()
print("Basic statistics:")
print("  df['column'].mean()    # Average")
print("  df['column'].median()  # Median")
print("  df['column'].sum()     # Total")
print("  df['column'].min()     # Minimum")
print("  df['column'].max()     # Maximum")
print()

print("=" * 70)
print("NEXT STEPS:")
print("=" * 70)
print()
print("Now that you understand the basics, you're ready for the main workshop!")
print()
print("Run the next script:")
print("  python first_day/scripts/step01_load_single_mouse.py")
print()
print("💡 TIP: If you get stuck, come back to this script for reference.")
print()

print("=" * 70)
print("TROUBLESHOOTING:")
print("=" * 70)
print()
print("If you see 'ModuleNotFoundError: No module named pandas':")
print("  → Run: pip install pandas matplotlib numpy")
print()
print("If you see 'FileNotFoundError':")
print("  → Check that you're running from the correct directory")
print("  → Use: pwd (Mac/Linux) or cd (Windows) to check where you are")
print("  → You should be in the 'omm' folder, not 'omm/first_day'")
print()
print("If you're confused about a function:")
print("  → Use help(function_name) to see documentation")
print("  → Example: help(pd.read_csv)")
print()

print("=" * 70)
print("ADDITIONAL RESOURCES:")
print("=" * 70)
print()
print("📖 Python for Beginners:")
print("   https://www.python.org/about/gettingstarted/")
print()
print("📖 Pandas Tutorial:")
print("   https://pandas.pydata.org/docs/getting_started/intro_tutorials/")
print()
print("📖 Command Line Basics:")
print("   https://tutorial.djangogirls.org/en/intro_to_command_line/")
print()
print("📖 Real Python (excellent tutorials):")
print("   https://realpython.com/")
print()

print("=" * 70)
print("Good luck with the workshop! 🚀")
print("=" * 70)
