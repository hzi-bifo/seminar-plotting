# Task 2
## PCA Group Work

# Utilizing the dataset from the paper (), you will work in small groups to run 
# a PCA and create a scree plot and biplot to visualize the results. Use the 
# below code as a reference if need be or work with python if you are more 
# familiar with python libraries for this analysis. We will go over group results 
# briefly.

### Information on the data being used for this analysis

# **Understanding the data:**
  
#  * Metadata / categorical columns:
#  * Mouse replicate
#  * Mouse
#  * timepoint after AB application
#  * Day
#  * Group

# **Quantitative measurements:**
  
#  * Raw abundances: KB1, YL2, etc.
#  * Log-transformed values: log10 KB1, log10 YL2, etc.

# PCA only works on numeric data, so we’ll focus on the numeric columns 
# (either the raw counts or the log-transformed ones — usually log-transformed 
# is better for microbiome or abundance data to reduce skew).

#---
# 1. Prepare the data

library(dplyr)

df_mouse <- read.csv("/second_day_part1/data/mmc2.csv", stringsAsFactors = FALSE)
head(df_mouse)

# Remove NA values and then take only the log 10 values with the mouse and day 
# metadata. We use the log10 abundance values in this case.

# Remove the NA values from the dataframe:
df_na_removed <- na.omit(df_mouse)

# Keep only log columns + mouse + day
small_df <- df_na_removed %>% select(Mouse, Day, starts_with("log10"))
head(small_df)

# Now we want to make the dataset per mouse with abundance values per day. 
# We use the tidyr package a part of `dpylr`.

wide <- tidyr::pivot_wider(
  small_df,
  names_from = Day,
  values_from = starts_with("log10"),
  names_glue = "{.value}_Day{Day}"
)

head(wide)

# Note we do see some NA values here because the 1682 mouse only has values from 
# day 0 to day 9, after that it has no measurements. Thus when we rotate the 
# dataframe we get missing values for those reads.

# Check to see if there is the same number of mice once the table has been pivoted:
cat("Number of Mice pre-pivot: ")
length(unique(small_df$Mouse)) # We take the number `length` of the unique Mouse IDs in the column "Mouse"

cat("Number of mice post-pivot: ")
length(unique(wide$Mouse))

# Next we want to get the day 0 to day 9 difference in abundance values. 
# Of course you can look at other time differences as well.

# Here's a breakdown of the code:

#   1. `mutate(across(...))`
#     * mutate() creates new columns.
#     * across() tells mutate: apply the same operation to multiple columns.

#  2. `contains("Day9")`
#     * This selects every column whose name contains "Day9".

#   3. The function: `~ . - get(sub("_Day9","_Day0", cur_column()))`
#     * cur_column() - Returns the current column name, e.g. "KB1_Day9".
#     * sub("_Day9","_Day0", cur_column()) - Replaces "Day9" with "Day0".
#       * "KB1_Day9" → "KB1_Day0"
#       * "YL2_Day9" → "YL2_Day0"
#     * get(...) - Retrieves that column from the dataframe.
#     * The .~ means:
#       * . = the value of the current Day9 column
#       * get(...) = the matching Day0 column

# **So the expression does: Day9_value - Day0_value**

#   4. `.names = "{.col}_delta9"`
#     * This tells mutate() how to name the new column.

delta_df <- wide %>%
  mutate(across(contains("Day9"),
                ~ . - get(sub("_Day9","_Day0", cur_column())),
                .names = "{.col}_delta9"))

head(delta_df)

# Keeping mouse column for metadata but selecting the columns containing the difference in abundances
day9_delta <- delta_df %>% select(Mouse, contains("delta"))
day9_delta <- na.omit(day9_delta)

# Now creating a separate dataframe for the numerical only values to be used in the PCA
day9_delta_only <- day9_delta %>% select(contains("delta"))

head(day9_delta_only)

#---
# 2. Running the PCA
# Here we use the `prcomp` function to run a PCA:

pca_result_delta <- prcomp(day9_delta_only, center = TRUE, scale = TRUE)
summary(pca_result_delta)

#---
# 3. Visualizations:

# Scree Plot
# Use ggplot to create a scree plot of the variance for each principal component.

install.packages("ggfortify")
library(ggplot2)
library(ggfortify)

# Getting the variance explained by each PC
eig_vals_pulse <- pca_result_delta$sdev^2
var_explained_pulse <- eig_vals_pulse / sum(eig_vals_pulse)
cat("Variance explained: ")
var_explained_pulse

qplot(c(1:13), var_explained_pulse) + # Here we input the data to be plotted x = vector(1,2,3,4), y = the variance
  geom_line() + # We specify that we want a line plot
  xlab("Principal Component") + # Specify the x labels
  ylab("Variance Explained") + # Specify the y axis labels
  ggtitle("Scree Plot") + # Create a title for the plot
  ylim(0, 1) # Show everything from 0 to 1

# Biplot
# Use ggplot to create a biplot of the first PC. Same as what we saw in the 
# examples that we did above. The plot below is sufficient, though please play 
# around with some of the features in ggplot to make it more readable all in all 
# (as is seen with the second biplot).

# Getting the metadata for coloring in the plot
metadata <- df_na_removed %>% select(Mouse, Group)
metadata_mice <- unique.data.frame(metadata)

# Creating the biplot
autoplot(pca_result_delta,
         data = metadata_mice,
         colour = 'Group',
         loadings = TRUE,
         loadings.label = TRUE,
         loadings.label.size = 3)

# Here is an example of a more complex biplot, colored by treatment and the 
# mouse point are increased in size as well as arrows changed to black with 
# improved labeling to reduce overlapping. Feel free to change and play around 
# with the settings here to see what best represents the data in the way you want.

autoplot(pca_result_delta,
         data = metadata_mice,
         colour = 'Group',
         loadings = TRUE,
         loadings.label = TRUE,   # Add loadings labels
         loadings.label.size = 3, # Adjust label size for readability
         loadings.colour = "black", # Make the loadings labels black for better contrast
         loadings.label.repel = TRUE, # Use repelling labels to avoid overlaps
         size = 4,                # Adjust the size of the points
         alpha = 0.7) +           # Adjust transparency to make points more distinguishable
  labs(title = "PCA Biplot with Day 9 vs Day 0 Abundance Differences",
       x = paste("PC1 (", round(53.6, 1), "%)", sep = ""),
       y = paste("PC2 (", round(21.7, 1), "%)", sep = "")) +
  theme_minimal() +
  theme(legend.position = "right",  # Move the legend to the right
        legend.title = element_blank(),
        plot.title = element_text(hjust = 0.5, size = 14)) # Center title

#---
# 4. Interpretation:

# 1. PCA Axes:
#   * The PC1 axis (horizontal) explains 53.6% of the variation in your data. 
#     It seems to separate most of the data into distinct groups.
#   * The PC2 axis (vertical) explains 21.7% of the variation, and it likely 
#     helps to distinguish some additional patterns that were not captured by PC1.

# 2. Points (Samples):
#   * Each colored point represents a sample from a group (Ciprofloxacin, 
#     Tetracyclin, Vancomycin, or water).
#   * The points seem to be clustered based on the treatment group. This suggests 
#     that the treatment (antibiotic) strongly influences the composition of the 
#     microbial community as measured by the taxa.

# 3. Arrows (Biplot Vectors):
#   * The arrows represent individual taxa and their log abundance at day 9 
#     compared to day 0. The direction of the arrow shows the taxon’s association 
#     with the principal components (PC1 and PC2).
#   * A longer arrow suggests a stronger contribution of that taxa to the variation 
#     in the dataset. For example, taxa with longer arrows are more influential 
#     in explaining the spread of samples along the principal components.

# 4. Interpretation of Axis Separation:
#   * The group with the most separation along PC1 is likely the water samples 
#     (purple), which are distant from the other groups, suggesting they are the 
#     most different.
#   * Ciprofloxacin, Tetracyclin, and Vancomycin show less variation between them 
#     in this PCA space, but they still exhibit some clustering, which indicates 
#     they might share similar microbial community changes.

# 5. Goodness of Plot:
#   * The percentages (PC1: 53.6%, PC2: 21.7%) indicate that the plot captures a 
#     good amount of the variance (approximately 75.3%), which is good for a PCA.
#   * The plot clearly shows clustering by group, which is a positive outcome, 
#     indicating that the treatments (antibiotics) likely have distinct effects 
#     on the microbial composition.