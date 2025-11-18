################################################################################
# Practice Script: R Basics with the Palmer Penguins Dataset
################################################################################

#---------------------------------------------
# 0. Load the penguins dataset
#---------------------------------------------

# Install if needed
# install.packages("palmerpenguins")
library(palmerpenguins)
library(dplyr)

#---------------------------------------------
# 1. View the dataset
#---------------------------------------------

# What do the first 5 rows of the `penguin` dataset look like? 
# The `head` function is helpful here. And the dataset is called "penguin", so 
# you can try `head(data)`where data is the dataset name.

# Answer:


# Using the `summary` function, what is the mean value of the bill_length_mm column?

# Answer:



#---------------------------------------------
# 2. Manipulation of the dataset
#---------------------------------------------

# Next lets remove the NA values within the dataframe. How many rows are in the 
# dataset prior to removing the NA values? To find the number of rows in the 
# dataframe we can use the `str` function such as: 

#````
# str(data)
#````

# Answer:



# How many rows are in the dataset after removing the NA values? 
# To remove the NA values use dpylr in the following format, but replace data with 
# the name of your dataframe:

# ````
# new_data <- data %>% na.omit()
# ````

# And then once again use the `str` function (or an alternative) to find the new
# number of rows.

# Answer:



# Finally, can you create a separate dataframe of only the "species", "island",
# and "body_mass_g" columns? To do so use the use the `select` function from dplyr
# in the following format:

# ````
# data_select <- data %>% select(colum_name, column_name)
# ````

# Answer:


