#---
# Task 1
## Individual exploration of the `prcomp` function
  
# In this task you will begin by simply exploring the different parameters used 
# in the `prcomp` function as well as alternative libraries for running a PCA in R. 
# Most of the code is provided, but playing around with changing specific 
# parameters and note how that might change the output.

# Prior to testing the different libraries please run the following code block 
# to create a test dataframe from the penguins library. Also feel free to adjust
# or change the data input itself as we've seen above.

#---
# Loading the Data and libraries

library(dplyr)
  
#install.packages("palmerpenguins") # Can install the palmerpenguins package or use read.csv
#library(palmerpenguins)

penguins <- read.csv("/seminar-plotting/second_day_part1/data/penguins.csv")

head(penguins)

#---
# Data Preprocessing

df <- penguins %>%
  select(bill_length_mm, bill_depth_mm, flipper_length_mm, body_mass_g) %>% # This line here uses `dpylr` to manipulate the dataframe and keep only numerical columns
  na.omit() # Here we omit the rows that contain NAs or missing information

#---
# 1. `prcomp()`

# This is the most common and recommended base R function for PCA. 
# We have thoroughly explored this in the previous sections, but feel free to 
# try it yourself using the `df` dataframe created above.

prcomp_pca <- prcomp(df, center = TRUE, scale = TRUE)
summary(prcomp_pca)

# Key arguments for `prcomp`:
  
#  |Parameter    |Description|
#  |-------------|-----------|
#  | x           | Your data frame or matrix (numeric only — no factors).|
#  |center = TRUE|	Centers variables to mean 0. Essential if variables have different means.|
#  |scale = TRUE | Scales variables to unit variance (recommended if variables have different units/scales).|
#  |retx = TRUE  | Returns the rotated data (scores for each principal component).|
#  |tol          |Tolerance for excluding components with near-zero variance.|

#---
# 2. princomp()
# An older base R function, its less commonly used now but still valid.

princomp_pca <- princomp(df, cor = TRUE)
summary(princomp_pca)

# Key arguments for `princomp`:
  
#  |Parameter     |Description|
#  |--------------|-----------|
#  |cor = TRUE	  |Equivalent to scaling.|
#  |scores = TRUE	|Returns principal component scores.|

#---
# 3. `PCA()` from FactoMineR
# A popular package for PCA with many plotting and reporting options.

install.packages("FactoMineR")
library(FactoMineR)

PCA_pca <- PCA(df, scale.unit = TRUE, graph = FALSE)
summary(PCA_pca)

# Key arguments for `PCA()`:
  
#  |Parameter	              |Description|
#  |------------------------|-----------|
#  |scale.unit = TRUE	      | Standardizes variables.|
#  |ncp                   	|Number of principal components to compute.|
#  |graph = TRUE/FALSE	    |Whether to show automatic plots.|
#  |quali.sup / quanti.sup	|Indicate supplementary (non-active) variables.|