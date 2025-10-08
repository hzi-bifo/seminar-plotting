# Step 0: Python Basics and Prerequisites

**⏱️ Time**: 30-45 minutes (self-paced reading)
**Target**: Students new to Python or needing a refresher
**Format**: Read this guide before the workshop

---

## 🎯 What You'll Learn

By the end of this guide, you'll understand:
- What libraries are and how to import them
- Basic function syntax in Python
- File paths and how Python finds files
- Reading CSV/TSV files with different delimiters
- Basic data types (strings, numbers, lists)
- Command line navigation essentials

---

## 📚 Part 1: Libraries and Imports

### What is a Library?

A **library** (or **package**) is a collection of pre-written code that someone else created to make your life easier. Think of it like a toolbox:

- **`pandas`** - Tools for working with spreadsheet-like data (tables)
- **`matplotlib`** - Tools for creating plots and charts
- **`numpy`** - Tools for mathematical operations

### How to Import Libraries

```python
import pandas as pd          # Import pandas, nickname it 'pd'
import matplotlib.pyplot as plt   # Import matplotlib's plotting tools
import numpy as np           # Import numpy, nickname it 'np'
```

**Why use nicknames like `pd` and `np`?**
- Shorter to type
- Industry standard convention (everyone uses these nicknames)
- Makes code more readable

### Importing Specific Functions

Sometimes you only need one tool from the toolbox:

```python
from pathlib import Path     # Only import the Path function
```

**💡 Key Point**: You must import libraries before using them! Python doesn't load them automatically.

---

## 🔧 Part 2: Functions and Basic Syntax

### What is a Function?

A **function** is like a mini-program that does a specific task. You "call" a function by writing its name followed by parentheses `()`.

### Built-in Functions

Python has functions available without importing anything:

```python
# len() counts characters/items
my_name = "Python Learner"
name_length = len(my_name)    # Returns 14

# sum() adds numbers
my_list = [1, 2, 3, 4, 5]
total = sum(my_list)          # Returns 15
```

### Library Functions (Dot Notation)

Functions from libraries use **dot notation**:

```
library_name.function_name(arguments)
```

Examples:

```python
import pandas as pd
import numpy as np

# Read a CSV file using pandas
df = pd.read_csv('data.csv')

# Calculate average using numpy
average = np.mean([1, 2, 3])  # Returns 2.0
```

### Function Arguments

Functions can take **arguments** (inputs) inside the parentheses:

```python
# No arguments
print()

# One argument
print("Hello!")

# Multiple arguments
print("The answer is:", 42)

# Named arguments
pd.read_csv('data.csv', sep='\t')  # 'sep' is a named argument
```

---

## 📂 Part 3: File Paths

### Absolute Paths

The **complete address** from your computer's root:

```
Mac/Linux:  /Users/yourname/Documents/project/data/file.csv
Windows:    C:\Users\yourname\Documents\project\data\file.csv
```

### Relative Paths

Address **relative to where your script is running**:

```
first_day/data/file.csv
```

This means: "Starting from where I am now, go into the `first_day` folder, then the `data` folder, and find `file.csv`"

### Why Use Relative Paths?

✅ **Portable** - Works on any computer
✅ **Shareable** - Code works for everyone
❌ Absolute paths only work on YOUR computer

### Checking Where You Are

```python
import os
current_dir = os.getcwd()  # Get Current Working Directory
print(current_dir)
```

When you run:
```bash
python first_day/scripts/step01_load_single_mouse.py
```

Python looks for files starting from your **current working directory** (usually the `omm/` folder).

**💡 Golden Rule**: Always run scripts from the project root (the `omm/` folder), not from inside `first_day/`.

---

## 📄 Part 4: Reading Files with Different Delimiters

### What is a Delimiter?

A **delimiter** is the character that separates values in a text file.

| Format | Delimiter | Example |
|--------|-----------|---------|
| CSV | Comma (`,`) | `Alice,25,blue` |
| TSV | Tab (`\t`) | `Alice    25    blue` |
| Custom | Any character | `Alice|25|blue` |

### Reading CSV Files

**Comma-separated values** (default):

```python
import pandas as pd

df = pd.read_csv('first_day/data/yl32_vancomycin.csv')
```

### Reading TSV Files

**Tab-separated values** (need to specify):

```python
df = pd.read_csv('first_day/data/example.tsv', sep='\t')
#                                                 ^^^^^^
#                                        Tell pandas it's tab-separated
```

### Reading Custom Delimiters

```python
# Pipe-separated file
df = pd.read_csv('data.txt', sep='|')

# Semicolon-separated file
df = pd.read_csv('data.txt', sep=';')
```

**💡 Key Point**: `pd.read_csv()` can read ANY delimiter! Just use the `sep` parameter.

---

## 🔢 Part 5: Basic Data Types

Python has several basic data types:

### Strings (Text)

```python
my_string = "Hello, world!"   # Use quotes for text
print(type(my_string))        # <class 'str'>
```

### Integers (Whole Numbers)

```python
my_integer = 42               # No quotes for numbers
print(type(my_integer))       # <class 'int'>
```

### Floats (Decimal Numbers)

```python
my_float = 3.14159
print(type(my_float))         # <class 'float'>
```

### Booleans (True/False)

```python
my_bool = True                # Capital T and F
print(type(my_bool))          # <class 'bool'>
```

### Lists (Collections)

```python
my_list = ["apple", "banana", "cherry"]
print(my_list[0])             # "apple" <- First item is index 0!
print(my_list[1])             # "banana"
```

**Important**: Python counts from **0**, not 1!

### Dictionaries (Key-Value Pairs)

```python
my_dict = {
    "name": "Alice",
    "age": 25,
    "city": "Boston"
}
print(my_dict["name"])        # "Alice"
```

---

## 💻 Part 6: Command Line Basics

The **command line** (or **terminal**) is where you type text commands to tell your computer what to do.

### Essential Commands

| Command | What it Does | Example |
|---------|--------------|---------|
| `pwd` | Print Working Directory (where am I?) | `pwd` |
| `ls` | List files (Mac/Linux) | `ls` |
| `dir` | List files (Windows) | `dir` |
| `cd folder_name` | Change Directory (move into folder) | `cd first_day` |
| `cd ..` | Go up one level (to parent folder) | `cd ..` |
| `python script.py` | Run a Python script | `python step01.py` |

### Example Workflow

```bash
$ pwd                          # Check where you are
/Users/yourname/Desktop

$ cd omm                       # Move into the omm folder
$ pwd                          # Check again
/Users/yourname/Desktop/omm

$ ls                           # See what's in this folder
first_day/  README.md

$ python first_day/scripts/step01_load_single_mouse.py
# Now running the script!
```

**💡 Pro Tip**: Type `cd ` (with a space), then drag a folder into the terminal window. It will auto-fill the path!

---

## 🔍 Part 7: Working with Pandas DataFrames

A **DataFrame** is like a spreadsheet in Python. Here are the essential operations:

### Load a CSV File

```python
import pandas as pd

df = pd.read_csv('first_day/data/yl32_vancomycin.csv')
```

### Inspect the Data

```python
# See first 5 rows
df.head()

# See structure (columns, types, memory)
df.info()

# Get summary statistics
df.describe()

# Check shape (rows, columns)
print(df.shape)               # (40, 4) means 40 rows, 4 columns

# List column names
print(df.columns)
```

### Access Columns

```python
# Get one column
yl32_values = df['yl32']

# Get multiple columns
subset = df[['day', 'yl32']]
```

### Calculate Statistics

```python
# Average
df['yl32'].mean()

# Median
df['yl32'].median()

# Sum
df['yl32'].sum()

# Minimum and maximum
df['yl32'].min()
df['yl32'].max()
```

### Create New Columns

```python
import numpy as np

# Add a log-transformed column
df['log10_yl32'] = np.log10(df['yl32'])

# Add a boolean column
df['is_high'] = df['yl32'] > 1000
```

### Group and Aggregate

```python
# Calculate mean by day
daily_mean = df.groupby('day')['yl32'].mean()

# Multiple aggregations
summary = df.groupby('day').agg({
    'yl32': ['mean', 'median', 'std']
})
```

---

## ✅ Quick Reference Cheat Sheet

### Import Libraries

```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
```

### Read Files

```python
# CSV file
df = pd.read_csv('path/to/file.csv')

# TSV file
df = pd.read_csv('path/to/file.tsv', sep='\t')
```

### Inspect Data

```python
df.head()         # First 5 rows
df.info()         # Structure
df.describe()     # Statistics
df.shape          # (rows, columns)
df.columns        # Column names
```

### Access Data

```python
df['column_name']              # Get one column
df[['col1', 'col2']]          # Get multiple columns
df['column_name'].mean()       # Calculate mean
```

### Command Line

```bash
pwd                            # Where am I?
ls                             # What's here? (Mac/Linux)
cd folder_name                 # Move into folder
cd ..                          # Go up one level
python script.py               # Run Python script
```

---

## 🎯 Self-Assessment

Can you answer these questions?

1. **What's the difference between a CSV and TSV file?**
   <details><summary>Answer</summary>
   Only the delimiter: CSV uses commas, TSV uses tabs. Both are plain text files.
   </details>

2. **Why do we write `import pandas as pd` instead of just `import pandas`?**
   <details><summary>Answer</summary>
   The 'as pd' creates a shorter nickname, so we can write pd.read_csv() instead of pandas.read_csv()
   </details>

3. **What does `df.shape` return?**
   <details><summary>Answer</summary>
   A tuple of (rows, columns), like (40, 4) for 40 rows and 4 columns
   </details>

4. **What is the first index in a Python list?**
   <details><summary>Answer</summary>
   0 (not 1!) - Python counts from zero
   </details>

5. **Should you use absolute or relative paths in your scripts?**
   <details><summary>Answer</summary>
   Relative paths - they work on any computer
   </details>

---

## 🚀 Next Steps

### Practice Exercise (Optional)

Try this before moving to Step 1:

1. Create a simple CSV file with 3 columns: `name`, `value1`, `value2`
2. Read it with pandas
3. Add a new column `value3 = value1 + value2`
4. Save to a new file

**If you can do this**, you're ready for the main workshop!

See [`step00_interactive.py`](scripts/step00_interactive.py) for a hands-on version you can run.

### Ready for the Workshop?

Move on to:
- **[Step 1: Load and Inspect Data](scripts/step01_load_single_mouse.py)**

Still confused? That's okay!
- Re-read sections that are unclear
- Try the interactive script
- Ask questions during the workshop

---

## 📚 Additional Resources

### Python Basics
- [Python for Beginners](https://www.python.org/about/gettingstarted/) - Official Python tutorial
- [Real Python](https://realpython.com/) - Excellent tutorials and guides

### Pandas
- [Pandas Tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/) - Official 10-minute intro
- [Pandas Cheat Sheet](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf) - Quick reference

### Command Line
- [Command Line Crash Course](https://tutorial.djangogirls.org/en/intro_to_command_line/) - Beginner-friendly
- [Linux/Mac Terminal Guide](https://ubuntu.com/tutorials/command-line-for-beginners)

### Getting Help
- [Stack Overflow](https://stackoverflow.com/questions/tagged/pandas) - Search for answers
- [Reddit r/learnpython](https://www.reddit.com/r/learnpython/) - Ask questions

---

**Last Updated**: 2025-10-08
**Next**: [Step 1 - Load Single Mouse Data](scripts/step01_load_single_mouse.py)
