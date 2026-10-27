// Adapted from the supplied PowerPoint, slides 148–181.
const day2HeatmapSlides = [
  {
    "id": "encoding",
    "title": "What a heatmap encodes",
    "note": "Rows and columns identify items. Colour represents one value at their intersection.",
    "source": [
      149
    ],
    "images": [
      {
        "file": "slide-165-0.png",
        "label": "Rows: features · columns: samples"
      }
    ],
    "bullets": [
      "Read the colour key before comparing cells.",
      "Look for patterns, blocks and co-variation. Clustering is optional."
    ],
    "group": "Reading heatmaps",
    "extra": "",
    "credit": []
  },
  {
    "id": "principle",
    "title": "Measurements, ordering and groups",
    "note": "Reordering brings similar profiles together without changing the measurements.",
    "source": [
      150
    ],
    "images": [
      {
        "file": "slide-150-0.png",
        "label": "Input matrix, clustered matrix and grouped display"
      }
    ],
    "bullets": [],
    "group": "Reading heatmaps",
    "extra": "",
    "credit": [
      [
        "Original source in the deck",
        "https://www.nature.com/articles/nmeth.1902"
      ]
    ]
  },
  {
    "id": "when",
    "title": "When a heatmap helps",
    "note": "A matrix is useful when the question is about patterns across many items.",
    "source": [
      151
    ],
    "images": [],
    "bullets": [
      "Gene expression across samples or conditions",
      "Resistance-gene presence or absence across isolates",
      "Taxon abundance across environments",
      "Pairwise similarity, distance or correlation"
    ],
    "group": "Reading heatmaps",
    "extra": "",
    "credit": []
  },
  {
    "id": "alternatives",
    "title": "When another display helps",
    "note": "Choose the display for the comparison you want the reader to make.",
    "source": [
      152
    ],
    "images": [],
    "bullets": [
      "Exact values or uncertainty: a table or points with intervals",
      "A small or sparse matrix: consider a dot plot or direct labels",
      "Several measurements per cell: separate panels or encodings",
      "Different units: separate scales or a clearly explained transformation"
    ],
    "group": "Reading heatmaps",
    "extra": "<p class=\"day2-note\">Small, sparse or ordinal matrices can still work as heatmaps. These are design choices, not automatic exclusions.</p>",
    "credit": []
  },
  {
    "id": "published",
    "title": "Heatmaps in biological research",
    "note": "Compare the row labels, column annotations and colour keys.",
    "source": [
      153
    ],
    "images": [
      {
        "file": "slide-153-0.png",
        "label": "Genome-wide expression"
      },
      {
        "file": "slide-153-1.png",
        "label": "Microbiome profiles"
      }
    ],
    "bullets": [],
    "group": "Reading heatmaps",
    "extra": "",
    "credit": [
      [
        "Eisen et al., expression clustering",
        "https://doi.org/10.1073/pnas.95.25.14863"
      ],
      [
        "Microbiome example",
        "https://doi.org/10.1038/nature23889"
      ]
    ]
  },
  {
    "id": "vaccination",
    "title": "A heatmap across place and time",
    "note": "The same matrix idea works beyond gene expression.",
    "source": [
      154
    ],
    "images": [
      {
        "file": "slide-154-0.png",
        "label": "Vaccination example from the original deck"
      }
    ],
    "bullets": [],
    "group": "Reading heatmaps",
    "extra": "",
    "credit": [
      [
        "Example and original context",
        "https://r-graph-gallery.com/vaccination-heatmap.html"
      ]
    ]
  },
  {
    "id": "zscore",
    "title": "Why standardise rows?",
    "note": "A row z-score expresses each value relative to that row’s mean and variability.",
    "source": [
      155
    ],
    "images": [],
    "bullets": [
      "Compare patterns despite different baselines and scales.",
      "Absolute expression or abundance is no longer visible.",
      "Label the transformation and use a clear colour key."
    ],
    "group": "Scaling and z-scores",
    "extra": "<p class=\"day2-note\">A diverging palette centred at zero suits z-scores. If colour limits clip extremes, state the limits.</p>",
    "credit": []
  },
  {
    "id": "zheat",
    "title": "Before and after row scaling",
    "note": "The same measurements answer a different question after standardisation.",
    "source": [
      156
    ],
    "images": [
      {
        "file": "slide-156-0.png",
        "label": "Original values"
      },
      {
        "file": "slide-156-1.png",
        "label": "Row z-scores"
      }
    ],
    "bullets": [],
    "group": "Scaling and z-scores",
    "extra": "",
    "credit": []
  },
  {
    "id": "zprofiles",
    "title": "Profiles before and after scaling",
    "note": "Baseline differences can hide shared changes across samples.",
    "source": [
      156
    ],
    "images": [
      {
        "file": "slide-156-3.png",
        "label": "Original profiles"
      },
      {
        "file": "slide-156-2.png",
        "label": "Standardised profiles"
      }
    ],
    "bullets": [],
    "group": "Scaling and z-scores",
    "extra": "",
    "credit": []
  },
  {
    "id": "formula",
    "title": "Calculating a row z-score",
    "note": "Subtract the row mean, then divide by the row standard deviation.",
    "source": [
      157
    ],
    "images": [],
    "bullets": [],
    "group": "Scaling and z-scores",
    "extra": "<div class=\"day2-formula\">z<sub>ri</sub> = (x<sub>ri</sub> − μ<sub>r</sub>) / s<sub>r</sub></div><div class=\"day2-definitions\"><p><strong>x<sub>ri</sub></strong><br>Value in row r, column i</p><p><strong>μ<sub>r</sub></strong><br>Mean of row r</p><p><strong>s<sub>r</sub></strong><br>Standard deviation of row r</p></div><p class=\"day2-note\">A constant row has zero standard deviation: its z-scores are undefined. Handle it explicitly.</p>",
    "credit": []
  },
  {
    "id": "zstats",
    "title": "What row scaling changes",
    "note": "Each nonconstant row has mean approximately zero and standard deviation one.",
    "source": [
      158
    ],
    "images": [],
    "bullets": [],
    "group": "Scaling and z-scores",
    "extra": "<table class=\"day2-table\"><thead><tr><th>Feature</th><th>Mean before</th><th>SD before</th><th>Mean after</th><th>SD after</th></tr></thead><tbody><tr><td>1</td><td>10.00</td><td>0.71</td><td>≈ 0</td><td>1</td></tr><tr><td>2</td><td>50.00</td><td>0.71</td><td>≈ 0</td><td>1</td></tr><tr><td>3</td><td>90.00</td><td>0.71</td><td>≈ 0</td><td>1</td></tr><tr><td>4</td><td>50.16</td><td>3.58</td><td>≈ 0</td><td>1</td></tr><tr><td>5</td><td>30.60</td><td>0.77</td><td>≈ 0</td><td>1</td></tr></tbody></table><p class=\"day2-note\">Statistics from the original example, rounded for display.</p>",
    "credit": []
  },
  {
    "id": "dendrogram",
    "title": "What a dendrogram shows",
    "note": "Hierarchical clustering records successive merges of items and groups.",
    "source": [
      159
    ],
    "images": [
      {
        "file": "slide-159-0.png",
        "label": "Clustered expression example"
      },
      {
        "file": "slide-159-1.png",
        "label": "A dendrogram"
      }
    ],
    "bullets": [
      "Distance defines similarity between items.",
      "Linkage defines how distances between groups are calculated."
    ],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "distance",
    "title": "Distance defines “similar”",
    "note": "Choose the distance for the biological question.",
    "source": [
      160
    ],
    "images": [],
    "bullets": [],
    "group": "Clustering",
    "extra": "<table class=\"day2-table\"><tr><th>Distance</th><th>Emphasises</th><th>Trade-off</th></tr><tr><td>Euclidean</td><td>Differences in level and pattern</td><td>Sensitive to scale and outliers</td></tr><tr><td>1 − Pearson correlation</td><td>Similarity of profile shape</td><td>Discards level and positive scale differences</td></tr><tr><td>1 − Spearman correlation</td><td>Similarity of ranks</td><td>Ties and rank changes matter; magnitudes are lost</td></tr></table>",
    "credit": []
  },
  {
    "id": "linkage",
    "title": "Linkage defines the next merge",
    "note": "The same distances can produce different trees.",
    "source": [
      161
    ],
    "images": [],
    "bullets": [
      "Single: nearest pair between groups; can produce chains.",
      "Complete: farthest pair; encourages compact groups but is sensitive to outliers.",
      "Ward: smallest increase in within-cluster sum of squares; use Euclidean geometry."
    ],
    "group": "Clustering",
    "extra": "<p class=\"day2-note\">Choose a method for its assumptions, not because it makes attractive blocks.</p>",
    "credit": []
  },
  {
    "id": "data-type",
    "title": "Match the distance to the data",
    "note": "The measurement type matters as much as the appearance of the heatmap.",
    "source": [
      162
    ],
    "images": [],
    "bullets": [
      "Profile shape: consider correlation or rank correlation.",
      "Absolute differences: consider Euclidean or Manhattan distance.",
      "Binary presence/absence: consider Jaccard distance.",
      "Nonnegative abundance: consider Bray–Curtis with appropriate preprocessing."
    ],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "raw-order",
    "title": "The original matrix order",
    "note": "Use this as the reference before changing the clustering.",
    "source": [
      163
    ],
    "images": [
      {
        "file": "slide-163-0.png",
        "label": "Original matrix"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "distance-pattern",
    "title": "Correlation or Euclidean distance",
    "note": "The same data can yield different row orders.",
    "source": [
      163
    ],
    "images": [
      {
        "file": "slide-163-1.png",
        "label": "Average linkage · correlation distance"
      },
      {
        "file": "slide-163-2.png",
        "label": "Average linkage · Euclidean distance"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "distance-transform",
    "title": "Scaling changes the clustering too",
    "note": "Changing preprocessing or distance changes what “close” means.",
    "source": [
      163
    ],
    "images": [
      {
        "file": "slide-163-3.png",
        "label": "Average linkage · Euclidean on row z-scores"
      },
      {
        "file": "slide-163-4.png",
        "label": "Average linkage · Bray–Curtis on counts"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "linked-views",
    "title": "A heatmap and its profiles",
    "note": "A line view can help explain the patterns visible as colour blocks.",
    "source": [
      164,
      165
    ],
    "images": [
      {
        "file": "slide-164-0.png",
        "label": "Linked heatmap and profile view"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": [
      [
        "Original source in the deck",
        "https://www.nature.com/articles/nmeth.1902"
      ]
    ]
  },
  {
    "id": "same-data",
    "title": "Same data, different display",
    "note": "Use the heatmap for an overview; use profiles to follow changes across conditions.",
    "source": [
      165
    ],
    "images": [
      {
        "file": "slide-165-0.png",
        "label": "Heatmap"
      },
      {
        "file": "slide-165-1.png",
        "label": "Parallel profiles"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "design-order",
    "title": "Order samples with the design in mind",
    "note": "Keep meaningful groups explicit; cluster within groups when appropriate.",
    "source": [
      166
    ],
    "images": [
      {
        "file": "slide-166-0.png",
        "label": "Random row and column order"
      },
      {
        "file": "slide-166-1.png",
        "label": "Split by condition; cluster within groups"
      }
    ],
    "bullets": [],
    "group": "Clustering",
    "extra": "",
    "credit": []
  },
  {
    "id": "palettes",
    "title": "Palette pitfalls",
    "note": "Rainbow and red–green scales can make patterns harder to read. Non-uniform lightness means equal changes in value do not look equally large: bright bands can stand out and suggest boundaries that are not in the data.",
    "source": [
      169
    ],
    "images": [
      {
        "file": "slide-169-0.png",
        "label": "Rainbow scale"
      },
      {
        "file": "slide-169-1.png",
        "label": "Red–green scale"
      }
    ],
    "bullets": [],
    "group": "Colour and perception",
    "extra": "",
    "credit": []
  },
  {
    "id": "lightness",
    "title": "Colour lightness affects emphasis",
    "note": "Bright colours can attract attention even when they do not represent the largest values.",
    "source": [
      170
    ],
    "images": [
      {
        "file": "slide-170-0.png",
        "label": "Palette comparison from the original deck"
      }
    ],
    "bullets": [],
    "group": "Colour and perception",
    "extra": "",
    "credit": []
  },
  {
    "id": "midpoint",
    "title": "A diverging scale needs a meaningful centre",
    "note": "Use a sequential scale for ordered magnitudes unless there is a meaningful reference value.",
    "source": [
      171
    ],
    "images": [
      {
        "file": "slide-171-0.png",
        "label": "A diverging palette on positive values"
      }
    ],
    "bullets": [],
    "group": "Colour and perception",
    "extra": "<p class=\"day2-note\">A meaningful centre can be a baseline other than zero. State it explicitly.</p>",
    "credit": []
  },
  {
    "id": "shared-scale",
    "title": "Comparable panels need comparable colour keys",
    "note": "The same colour should represent the same value when panels invite direct comparison.",
    "source": [
      172
    ],
    "images": [
      {
        "file": "slide-172-0.png",
        "label": "Panel A · independent scale"
      },
      {
        "file": "slide-172-1.png",
        "label": "Panel B · independent scale"
      }
    ],
    "bullets": [],
    "group": "Colour and perception",
    "extra": "",
    "credit": []
  },
  {
    "id": "interpolation",
    "title": "Interpolation changes the visual impression",
    "note": "For discrete measurements, crisp cells show what was actually measured.",
    "source": [
      173
    ],
    "images": [
      {
        "file": "slide-173-0.png",
        "label": "Bilinear interpolation suggests smooth transitions"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "aspect",
    "title": "Panel shape changes the appearance of blocks",
    "note": "Choose the aspect ratio deliberately and keep labels readable.",
    "source": [
      174
    ],
    "images": [
      {
        "file": "slide-174-0.png",
        "label": "Stretched heatmap cells"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "<p class=\"day2-note\">Rectangular cells are not automatically wrong. Avoid inferring geometric relationships from arbitrary row and column spacing.</p>",
    "credit": []
  },
  {
    "id": "scaling-tradeoff",
    "title": "State what the colours now mean",
    "note": "After row scaling, colours compare deviations within each row, not absolute levels between features.",
    "source": [
      175
    ],
    "images": [
      {
        "file": "slide-175-0.png",
        "label": "Row z-scores: pattern emphasised, absolute magnitude lost"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "direction",
    "title": "Keep colour direction consistent",
    "note": "A dark cell should not mean high in one panel and low in the next without an explicit reason.",
    "source": [
      176
    ],
    "images": [
      {
        "file": "slide-176-0.png",
        "label": "Dark blue means high"
      },
      {
        "file": "slide-176-1.png",
        "label": "Dark blue means low"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "outlier",
    "title": "An extreme value can dominate the scale",
    "note": "Check whether a few extremes hide variation in the rest of the matrix.",
    "source": [
      177
    ],
    "images": [
      {
        "file": "slide-177-0.png",
        "label": "One extreme compresses the visible variation"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "<p class=\"day2-note\">Consider a justified transformation or disclosed colour limits. Keep the data intact and indicate values beyond the scale.</p>",
    "credit": []
  },
  {
    "id": "bins",
    "title": "Continuous colours or bins?",
    "note": "Bins simplify the display, but values within each bin become visually indistinguishable.",
    "source": [
      178
    ],
    "images": [
      {
        "file": "slide-178-0.png",
        "label": "Continuous colour scale"
      },
      {
        "file": "slide-178-1.png",
        "label": "Six quantile bins"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "missing",
    "title": "Missing values need their own appearance",
    "note": "A missing measurement is not the same as zero.",
    "source": [
      179
    ],
    "images": [
      {
        "file": "slide-179-0.png",
        "label": "White is ambiguous"
      },
      {
        "file": "slide-179-1.png",
        "label": "Grey identifies missing values"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "correlation",
    "title": "A symmetric matrix can show one triangle",
    "note": "When both halves repeat the same information, one triangle can leave room for values.",
    "source": [
      180
    ],
    "images": [
      {
        "file": "slide-180-0.png",
        "label": "Full correlation matrix"
      },
      {
        "file": "slide-180-1.png",
        "label": "Triangle plus numeric values"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": []
  },
  {
    "id": "circular",
    "title": "Circular heatmaps",
    "note": "A circular layout can combine annotations and trees; compare its readability with a rectangular alternative.",
    "source": [
      181
    ],
    "images": [
      {
        "file": "slide-181-0.png",
        "label": "Circular layout"
      },
      {
        "file": "slide-181-1.png",
        "label": "Circular annotations"
      }
    ],
    "bullets": [],
    "group": "Pitfalls and special cases",
    "extra": "",
    "credit": [
      [
        "Source cited in the original deck",
        "https://doi.org/10.3389/fmicb.2022.990850"
      ]
    ]
  },
  {
    "id": "practice",
    "title": "Hands-on heatmaps",
    "note": "Continue with the existing Day 2 Part 2 notebooks.",
    "source": [
      148
    ],
    "images": [],
    "bullets": [],
    "group": "Practice",
    "extra": "<nav class=\"day2-practice\"><a href=\"../second_day_part2/html/01_explore_data.html\" target=\"_blank\" rel=\"noopener\">Explore the data ↗</a><a href=\"../second_day_part2/html/02_simple_heatmap.html\" target=\"_blank\" rel=\"noopener\">Build a simple heatmap ↗</a><a href=\"../second_day_part2/html/03_heatmap_annotations.html\" target=\"_blank\" rel=\"noopener\">Add annotations ↗</a><a href=\"../second_day_part2/html/04_full_heatmap.html\" target=\"_blank\" rel=\"noopener\">Build the complete heatmap ↗</a><a href=\"../second_day_part2/html/day2_exercises.html\" target=\"_blank\" rel=\"noopener\">Exercises ↗</a></nav>",
    "credit": []
  }
];
