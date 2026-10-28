// Original course examples; gallery routes do not alter quiz answers.
const plotTypes = [
  {id:'scatter',name:'Scatter plot',use:'Explore the relationship between two numeric measurements.',watch:'Overlapping points can hide density. Association alone does not establish cause.',examples:[
    ['scatter-step-3.png','Two proteins in single cells','Each dot is a cell: protein A on the horizontal axis and protein B on the vertical axis. Transparency reveals crowded regions.'],
    ['scatter-step-5.png','Scatter plot with marginal histograms','The same cells, with counts along the top and right. Read each protein’s distribution separately while retaining their joint relationship.']],lesson:'What is hidden in this cloud of cells?'},
  {id:'bar',name:'Bar plot',use:'Compare counts, proportions, or other quantities across categories.',watch:'Start the value axis at zero. Means alone hide variability; use dots or distributions for individual measurements.',examples:[
    ['good-ranking.png','Counts by condition','Horizontal bars compare colony counts from one plate per condition. Length encodes the count; the long category labels remain readable.'],
    ['biology-markers-b.png','Percentages with overlapping categories','Each bar is the percentage of 100 cells positive for a marker. A cell may express several markers, so the percentages need not sum to 100.']]},
  {id:'line',name:'Line plot',use:'Show change along an ordered variable, usually time.',watch:'Use true time spacing. Connect observations only when the ordering has a meaningful interpretation.',examples:[
    ['good-lines.png','Two cultures over time','Days are on the horizontal axis and colony counts on the vertical axis. Direct labels identify the two cultures.'],
    ['good-panels.png','Separate panels with a shared scale','Each panel tracks a different culture. Identical axes make the shapes and magnitudes comparable without overlapping lines.']]},
  {id:'histogram',name:'Histogram',use:'See the shape, spread, and concentrations of one numeric variable.',watch:'Bin width changes the appearance. Try more than one width before interpreting apparent peaks.',examples:[
    ['gallery-hist-5.png','Narrower bins: 5 units','Protein fluorescence from 240 cells. The horizontal axis gives fluorescence; bar height counts cells within each interval.'],
    ['gallery-hist-10.png','Wider bins: 10 units','The same 240 cells and axis limits. Wider intervals give a coarser view of the distribution; no measurements were removed.']]},
  {id:'box',name:'Box plot',use:'Compare medians and spread across groups in a compact display.',watch:'Boxes can hide multiple peaks. The box spans the middle 50%; these whiskers extend to observations within 1.5 interquartile ranges.',examples:[
    ['distribution-step-2.png','Compare two cell populations','Reporter signal in 80 cells per condition. The median and spread differ in what they reveal; a box alone does not show the full distribution shape.'],
    ['gallery-box.png','Box plots with the observations','Cytokine concentrations in 40 independent samples per dose group. Dots show the underlying measurements; horizontal jitter separates them.']],lesson:'Do similar averages mean similar cells?'},
  {id:'violin',name:'Violin plot',use:'Compare distribution shapes when there are enough observations to estimate density.',watch:'Width represents estimated density, not individual observations. Smoothing affects the shape; use dots for small samples.',examples:[
    ['distribution-step-4.png','Two populations with similar means','Reporter signal from 80 cells per condition. The outline reveals different shapes; dots show measurements and the horizontal line marks the median.'],
    ['gallery-violin.png','Distributions across doses','Cytokine concentration in 40 samples per group. All three outlines use the same smoothing bandwidth and width rule, with dots to check the estimate.']],lesson:'Do similar averages mean similar cells?'},
  {id:'heatmap',name:'Heatmap',use:'Find patterns in a matrix, such as measurements across genes and samples.',watch:'Explain the colour scale and any normalisation. Row scaling changes the question; colour similarity is meaningful only with comparable scales.',examples:[
    ['heatmap-step-3.png','Look for response patterns','Rows are genes; columns are control and treated samples. Blue and red show negative and positive log2 fold changes relative to a common reference.'],
    ['heatmap-step-4.png','Read exact values in a small matrix','The same matrix with values printed inside cells. Text contrast adapts to the background. For a large matrix, omit numbers to avoid clutter.']],lesson:'Which genes respond together?'},
  {id:'paired',name:'Paired plot',use:'Show repeated measurements from the same donors, samples, or experimental units.',watch:'Connect only genuinely matched observations. A group-level change does not mean every individual changed in the same direction.',examples:[
    ['paired-step-3.png','Connect before and after','Cytokine concentration before and after treatment in eight donors. Each line joins the same donor’s measurements.'],
    ['paired-step-4.png','Plot each donor’s change','The same data as after minus before. Rows identify donors; points left of zero indicate decreases. This view emphasises change rather than starting levels.']],lesson:'Did every donor improve?'}
];
plotTypes.push(...[
  {
    "id": "density",
    "name": "Density plot",
    "use": "Show a smoothed distribution of a numeric measurement.",
    "watch": "The smoothing bandwidth changes the shape. The total area is one; height is density, not a cell count.",
    "examples": [
      [
        "gallery-density-1.png",
        "Less smoothing",
        "Fluorescence in 240 cells, using a bandwidth of 2 units. Small marks along the axis show individual measurements."
      ],
      [
        "gallery-density-2.png",
        "More smoothing, same cells",
        "Bandwidth is now 6 units. The same axis limits make the loss of local detail visible; smooth peaks are estimates, not separate proven cell populations."
      ]
    ]
  },
  {
    "id": "ternary",
    "name": "Ternary plot",
    "use": "Compare three components that sum to a fixed total, such as 100%.",
    "watch": "Read each component along grid lines parallel to its opposite side. This is not an ordinary x\u2013y plot, and it cannot represent three unrelated measurements.",
    "examples": [
      [
        "gallery-ternary-1.png",
        "Read one sample",
        "S1 contains 60% T cells, 25% B cells, and 15% monocytes. Each vertex represents 100% of its named cell type; the opposite edge represents 0%."
      ],
      [
        "gallery-ternary-2.png",
        "Compare five compositions",
        "Each dot is one sample. The three cell types sum to 100% within every sample. Movement towards a vertex indicates a larger fraction of that cell type."
      ]
    ]
  },
  {
    "id": "circular",
    "name": "Pie / donut chart",
    "use": "Show a few mutually exclusive parts of one whole.",
    "watch": "Angles and areas are harder to compare than aligned bars. Avoid overlapping categories, many slices, and 3D effects. A circular layout is not a reason to choose a chart.",
    "examples": [
      [
        "gallery-circular-1.png",
        "Three cell types in one sample",
        "Of 100 classified cells, 60 are T cells, 25 B cells, and 15 monocytes. Every cell belongs to exactly one category here."
      ],
      [
        "gallery-circular-2.png",
        "The same composition as a donut",
        "The centre displays the total; the ring shows the same three proportions. The hole does not improve precise comparison, use bars when differences between categories are the question."
      ]
    ]
  },
  {
    "id": "venn",
    "name": "Venn diagram",
    "use": "Show membership and overlap between a small number of sets.",
    "watch": "Read the region counts: these circle areas are not proportional. With many sets, an intersection matrix or UpSet plot is usually easier to read.",
    "examples": [
      [
        "gallery-venn-1.png",
        "Overlapping cell markers",
        "Among 100 cells: 40 express only A, 30 only B, 20 both, and 10 neither. The overlap contains the shared cells, not a third independent group."
      ],
      [
        "gallery-venn-2.png",
        "Shared genes between two lists",
        "From 100 tested genes, 25 appear only in list A, 10 only in B, 15 in both, and 50 in neither. Set overlap alone does not establish statistical enrichment."
      ]
    ]
  },
  {
    "id": "sankey",
    "name": "Sankey diagram",
    "use": "Show how quantities flow or split between categories; ribbon thickness represents amount.",
    "watch": "Transitions require matched observations or measured flows. Category membership is not automatically a time transition, and crossings do not indicate interactions.",
    "examples": [
      [
        "gallery-sankey-1.png",
        "Track cell-state transitions",
        "The same 100 cells are classified before and after: 45 stay low, 15 move low to high, 10 move high to low, and 30 stay high. Ribbon and node sizes encode counts."
      ],
      [
        "gallery-sankey-2.png",
        "Link sample source to cell type",
        "Of 100 cells, 50 come from blood and 50 from tissue. Ribbons split each source into T and B cells. These links represent classification, not cells moving between tissues."
      ]
    ]
  }
]);

plotTypes.push({
  id: 'stacked', name: 'Stacked bar plot', lesson: 'Grouped, stacked, or 100% stacked?', relatedLessons: ['Order samples to reveal taxon profiles'],
  use: 'Show how categories contribute to each sample’s total, as counts or as proportions.',
  watch: 'A 100% stack hides total abundance. Compare absolute counts only with a consistent sampling volume or exposure. Middle segments lack a shared baseline; grouped bars can make individual categories easier to compare.',
  examples: [
    ['gallery-stacked-absolute.png', 'Absolute abundance: keep the totals', 'T cells, B cells, and monocytes counted in the same volume (1 mL) for four samples. Bar height gives the total cell count; each segment gives a cell-type count. Sample 2 has twice as many cells as Sample 1 in every category.'],
    ['gallery-stacked-relative.png', 'Relative abundance: every bar sums to 100%', 'The same counts divided by each sample’s total. Samples 1 and 2 now look identical because their proportions match, despite the twofold difference in total abundance. Use this view for composition; retain the counts when total abundance matters.']
  ]
});

plotTypes.push(...[
  {
    "id": "radar",
    "name": "Radar / spider chart",
    "use": "Compare multivariable profiles on radial axes with a common, meaningful scale.",
    "watch": "Spoke order changes polygon shape and area. Do not compare polygon areas as overall performance; dot plots are better for precise values.",
    "examples": [
      [
        "gallery-radar-1.png",
        "Two enzyme-activity profiles",
        "Five assays for two bacterial strains, each expressed as a percentage of its assay-specific reference activity. All spokes use 0–100%; connecting spokes describes a profile, not a trajectory."
      ],
      [
        "gallery-radar-2.png",
        "Separate profiles, same axes",
        "The same values in separate panels reduce overlap. Identical spoke order and limits are essential. A higher value is not automatically biologically better."
      ]
    ]
  },
  {
    "id": "ecdf",
    "name": "Cumulative distribution (ECDF)",
    "use": "Read the fraction of observations at or below any threshold, without bins or smoothing.",
    "watch": "The curve is cumulative, not a density. Larger values shift a distribution to the right; unequal sample sizes do not appear as taller curves.",
    "examples": [
      [
        "gallery-ecdf-1.png",
        "One cell population",
        "Protein fluorescence in 240 cells. At any fluorescence value, the vertical coordinate is the fraction of cells at or below it."
      ],
      [
        "gallery-ecdf-2.png",
        "Compare conditions",
        "Cytokine concentrations from 40 independent samples per condition. Each curve reaches one; compare thresholds or horizontal shifts."
      ]
    ]
  },
  {
    "id": "ridgeline",
    "name": "Ridgeline plot",
    "use": "Compare several distribution shapes on a shared horizontal scale.",
    "watch": "Vertical offsets identify groups, not measurements. Smoothing and overlap can hide features; use common scaling and avoid excessive overlap.",
    "examples": [
      [
        "gallery-ridgeline-1.png",
        "Distributions across doses",
        "Three cytokine distributions use bandwidth 1 ng/mL and the same density-height factor. Each ridge rises from its own baseline."
      ],
      [
        "gallery-ridgeline-2.png",
        "More smoothing",
        "The same measurements with bandwidth 2 ng/mL. Wider smoothing removes detail; ridge height represents estimated density, not sample count."
      ]
    ]
  },
  {
    "id": "dot",
    "name": "Dot / lollipop plot",
    "use": "Compare or rank category values using positions on a shared scale.",
    "watch": "State what each dot represents. A category summary is not an individual observation; stems add emphasis but no extra data.",
    "examples": [
      [
        "gallery-dot-1.png",
        "Rank pathway counts",
        "Dots show annotated gene counts for five pathways, sorted by count."
      ],
      [
        "gallery-dot-2.png",
        "Lollipop version",
        "The same values with stems from zero. Shared positions make ranking straightforward without the visual weight of filled bars."
      ]
    ]
  },
  {
    "id": "interval",
    "name": "Point-and-interval plot",
    "use": "Show estimates together with explicitly defined uncertainty intervals.",
    "watch": "Label SD, SEM, confidence, or credible intervals accurately. Overlapping intervals are not a general test of a difference.",
    "examples": [
      [
        "gallery-interval-1.png",
        "Horizontal estimates and intervals",
        "Mean cytokine concentration and 95% t confidence intervals from 40 independent samples per condition. This orientation leaves room for category labels."
      ],
      [
        "gallery-interval-2.png",
        "Vertical version",
        "The same means and intervals with conditions on the horizontal axis. These intervals describe uncertainty in means, not the range of individual concentrations."
      ]
    ]
  },
  {
    "id": "area",
    "name": "Area / stacked area plot",
    "use": "Show a total changing over time, optionally broken into additive components.",
    "watch": "Filled areas need a meaningful baseline. Middle components lack a common baseline; use separate lines for precise comparisons. Do not imply continuity across unordered samples.",
    "examples": [
      [
        "gallery-area-1.png",
        "Total biomass over time",
        "Total microbial biomass in mg/L over six time points. The filled area emphasises magnitude above zero."
      ],
      [
        "gallery-area-2.png",
        "Components of that total",
        "The same total split into three taxa. Stacked heights add to total biomass; colour identifies components. The curves between time points are visual connections, not extra measurements."
      ]
    ]
  },
  {
    "id": "bubble",
    "name": "Bubble plot",
    "use": "Combine numeric position with a third quantity encoded by symbol area.",
    "watch": "Scale area, not radius, to the quantity. Supply a size key; people compare positions more accurately than bubble sizes.",
    "examples": [
      [
        "gallery-bubble-1.png",
        "Abundance and prevalence",
        "The horizontal axis gives mean relative read abundance for each taxon. Bubble area gives the percentage of samples in which it was detected."
      ],
      [
        "gallery-bubble-2.png",
        "Add explicit values",
        "The same bubbles with prevalence percentages beside them. Labels help when exact values matter; abundance and prevalence answer different questions."
      ]
    ]
  },
  {
    "id": "volcano",
    "name": "Volcano plot",
    "use": "Compare effect magnitude with statistical evidence across many features.",
    "watch": "Statistical evidence is not biological importance. State the effect definition, multiple-testing adjustment, and chosen thresholds; avoid treating cutoffs as universal.",
    "examples": [
      [
        "gallery-volcano-1.png",
        "All tested genes",
        "120 genes measured in six control and six treated samples. Horizontal position is the difference in mean log2 expression; vertical position is −log10 of a BH-adjusted two-sample t-test p-value."
      ],
      [
        "gallery-volcano-2.png",
        "Highlight a stated selection rule",
        "The same genes, highlighting adjusted p < 0.05 and an absolute log2-expression difference of at least 1. Dashed lines show these teaching cutoffs; highlighted genes are not automatically validated findings."
      ]
    ]
  },
  {
    "id": "ma",
    "name": "MA plot",
    "use": "Inspect expression differences against average expression level.",
    "watch": "Low-expression behaviour and preprocessing matter. This example uses mean log2 measurements; it is not a substitute for an appropriate count-data model.",
    "examples": [
      [
        "gallery-ma-1.png",
        "Difference versus average",
        "The same 120-gene comparison as the volcano plot. The x-axis is average log2 expression across conditions; the y-axis is the difference between condition means."
      ],
      [
        "gallery-ma-2.png",
        "Highlight selected genes",
        "The same selection rule as the volcano plot. This view asks whether effects depend on abundance, rather than plotting statistical evidence on the vertical axis."
      ]
    ]
  },
  {
    "id": "correlation",
    "name": "Correlation matrix",
    "use": "Summarise pairwise associations among several numeric measurements.",
    "watch": "Correlation does not establish causation. State the coefficient and sample size; small samples can produce unstable correlations.",
    "examples": [
      [
        "gallery-correlation-1.png",
        "Pairwise gene correlations",
        "Pearson correlations between four genes across six samples. A shared −1 to +1 scale distinguishes negative, near-zero, and positive associations."
      ],
      [
        "gallery-correlation-2.png",
        "Reorder related variables",
        "The same coefficients reordered using average-linkage clustering of 1 minus correlation. Reordering aids pattern reading but adds no new evidence."
      ]
    ]
  },
  {
    "id": "upset",
    "name": "UpSet / intersection plot",
    "use": "Compare exact intersections among several sets with bars and a membership matrix.",
    "watch": "Clarify whether intersections are exact or inclusive. Here A+B excludes C; do not add overlapping inclusive counts as if they were independent.",
    "examples": [
      [
        "gallery-upset-1.png",
        "Three gene lists",
        "Columns identify exact combinations of membership in lists A, B, and C. Black dots show included lists; the bar above counts genes in that exact intersection."
      ],
      [
        "gallery-upset-2.png",
        "Sort intersections by size",
        "The same seven non-empty combinations ranked by gene count. Genes outside all three lists are not displayed. This scales more clearly than overlapping circles as the number of sets grows."
      ]
    ]
  },
  {
    "id": "network",
    "name": "Network diagram",
    "use": "Show entities and relationships, such as proteins connected by recorded associations.",
    "watch": "Explain what an edge means. Layout proximity, line crossings, and node position are not additional measurements unless explicitly encoded.",
    "examples": [
      [
        "gallery-network-1.png",
        "Circular layout",
        "Six proteins and seven undirected recorded associations. Nodes are proteins; edges denote associations, with no direction or weight encoded."
      ],
      [
        "gallery-network-2.png",
        "Layout emphasising connected groups",
        "The same nodes and edges in a different arrangement. The connection between the two groups becomes easier to follow; the layout does not establish two biological pathways."
      ]
    ]
  },
  {
    "id": "pca",
    "name": "PCA / ordination plot",
    "use": "Summarise variation across many measured features in a few coordinates.",
    "watch": "Axes are combinations of features, not individual measurements. Preprocessing affects the result; visible separation is not a significance test.",
    "examples": [
      [
        "gallery-pca-1.png",
        "Samples in expression space",
        "PCA of the same 120-gene, 12-sample log2 expression matrix used in the gene examples. Genes were centred but not scaled; axes report explained variance."
      ],
      [
        "gallery-pca-2.png",
        "Identify individual samples",
        "The same coordinates with sample labels. Labels help locate unusual samples, but become cluttered with large datasets. Loadings would be needed to identify which genes drive an axis."
      ]
    ]
  }
]);

plotTypes.push(...[
  {
    "id": "survival",
    "name": "Survival / Kaplan–Meier curve",
    "use": "Show time until an event while retaining right-censored observations.",
    "watch": "Define the event and censoring. The method assumes censoring is non-informative for the event time; curve separation alone is not a treatment-effect test.",
    "examples": [
      [
        "gallery-survival-1.png",
        "Time until seeds germinate",
        "Thirty seeds per condition. The curve estimates the probability that a seed has not yet germinated. Steps occur at germination events; crosses mark seeds whose observation ended without observed germination."
      ],
      [
        "gallery-survival-2.png",
        "Add uncertainty",
        "The same estimates with pointwise 95% log-log confidence limits. Censoring marks remain visible. Later estimates can be uncertain as fewer seeds remain under observation; these are not simultaneous confidence bands."
      ]
    ]
  },
  {
    "id": "forest",
    "name": "Forest plot",
    "use": "Compare effect estimates and uncertainty across studies, experiments, or subgroups.",
    "watch": "Label the effect scale and reference value: zero for differences, one for ratios. A pooled effect requires a justified model; none is calculated here.",
    "examples": [
      [
        "gallery-forest-1.png",
        "Compare four experiments",
        "Mean differences in growth rate, treatment minus control, with 95% normal-approximation confidence intervals. Negative values indicate lower growth under treatment; the dashed line marks no difference."
      ],
      [
        "gallery-forest-2.png",
        "Order by precision",
        "The same estimates ordered by standard error, with the most precise at the top. All squares have equal size; they do not encode study weight. Reordering changes readability, not the evidence."
      ]
    ]
  },
  {
    "id": "blandaltman",
    "name": "Bland–Altman plot",
    "use": "Inspect agreement between two methods measuring the same samples.",
    "watch": "Strong correlation does not establish agreement. Limits of agreement are not confidence intervals for the mean bias; decide acceptable differences from the application.",
    "examples": [
      [
        "gallery-blandaltman-1.png",
        "Look at paired differences",
        "Forty samples measured by assays A and B. The x-axis is the mean of each pair; the y-axis is B minus A, both in ng/mL. Look for bias, outliers, or a spread that changes with magnitude."
      ],
      [
        "gallery-blandaltman-2.png",
        "Add bias and limits of agreement",
        "The same data with mean difference and mean ± 1.96 standard deviations of differences. These descriptive limits assume roughly normal, independent differences with stable spread; they do not prove that the methods are interchangeable."
      ]
    ]
  },
  {
    "id": "raincloud",
    "name": "Raincloud plot",
    "use": "Combine a distribution estimate, compact summary, and individual observations.",
    "watch": "Explain the layers. Extra layers can become redundant; small datasets may need only dots. Smoothing is an estimate, not additional measurements.",
    "examples": [
      [
        "gallery-raincloud-1.png",
        "One group, three views",
        "Cytokine measurements from 40 control samples. The half-density gives shape, the small box gives median and interquartile range, and dots show every observation. Horizontal position always gives concentration."
      ],
      [
        "gallery-raincloud-2.png",
        "Compare dose groups",
        "The same design for three groups, each with 40 samples. Density bandwidth is 1 ng/mL in all groups. Group offsets and dot jitter are purely for layout; they do not encode another variable."
      ]
    ]
  },
  {
    "id": "seqlogo",
    "name": "Sequence logo",
    "use": "Show base or amino-acid preferences across aligned sequence positions.",
    "watch": "State the alphabet, alignment, background, and height convention. A frequency logo differs from an information logo; a tall stack does not establish binding or function.",
    "examples": [
      [
        "gallery-logo-frequency.svg",
        "Base-frequency logo",
        "One hundred aligned DNA sequences. At each position the stack reaches 1, and each letter’s height gives its frequency. Colours identify A, C, G, and T; letters are stacked by frequency."
      ],
      [
        "gallery-logo-information.svg",
        "Information-content logo",
        "Exactly the same counts. Stack height is 2 minus Shannon entropy, from 0 to 2 bits under a uniform DNA background; each letter receives its frequency times that height. Variable positions shrink, conserved positions stand out. No small-sample correction is applied."
      ]
    ]
  },
  {
    "id": "genome",
    "name": "Genome / coverage tracks",
    "use": "Align measurements and annotations along a shared genomic coordinate.",
    "watch": "Keep coordinate systems and strand labels consistent. Raw read depth depends on sequencing depth; comparisons across libraries may require normalisation.",
    "examples": [
      [
        "gallery-genome-1.png",
        "Coverage with a gene model",
        "Read depth across a 1,000-base example locus. Below, boxes represent exons and arrows show transcript direction: Gene A on the plus strand, Gene B on the minus strand. This is a schematic locus."
      ],
      [
        "gallery-genome-2.png",
        "Compare aligned coverage tracks",
        "Control and treatment coverage share genomic positions and a 0–65 depth scale, with gene models below. Heights are raw read counts in this example; differences alone do not establish differential expression."
      ]
    ]
  }
]);

plotTypes.push({
  id: 'grouped', name: 'Grouped / side-by-side bar plot', lesson: 'Grouped, stacked, or 100% stacked?',
  use: 'Compare several categories within each sample, condition, or discrete time point.',
  watch: 'Grouped bars support comparisons of individual categories; stacked bars emphasise totals or composition. Too many groups or categories make either display crowded.',
  examples: [
    ['gallery-grouped-absolute.png', 'Compare cell-type counts side by side', 'T cells, B cells, and monocytes counted in 1 mL for four samples. Each category has its own bar starting at zero. These are the same counts used in the stacked-bar examples.'],
    ['gallery-grouped-relative.png', 'Compare percentages side by side', 'The same counts divided by each sample’s total. The three bars within each sample sum to 100%, but remain separate for easier category comparisons. Samples 1 and 2 have identical percentages despite different total cell counts.']
  ]
});

const galleryGroups = {
  'Relationships and profiles': ['scatter','bubble','radar','correlation','pca','blandaltman'],
  'Distributions': ['histogram','density','box','violin','ecdf','ridgeline','raincloud'],
  'Comparisons and uncertainty': ['bar','dot','interval','paired','forest'],
  'Time and composition': ['line','area','grouped','stacked','circular','ternary','survival'],
  'Matrices and genomics': ['heatmap','volcano','ma','seqlogo','genome'],
  'Sets, flows and networks': ['venn','upset','sankey','network']
};
plotTypes.find(t=>t.id==='circular').lesson = 'Function over decoration: does 3D help?';
plotTypes.find(t=>t.id==='circular').examples.push(
  ['perspective-step-1.png','Decorative 3D: harder to compare','A different sample: 40% T cells, 35% B cells, and 25% monocytes. The foreground sidewall adds apparent area without encoding additional cells.'],
  ['perspective-step-2.png','The same sample in 2D','Exactly the same 40/35/25 composition, with the same colours and orientation. Removing depth removes an unnecessary visual cue. Follow the walkthrough to compare aligned bars too.']
);

plotTypes.find(t=>t.id==='bar').lesson = 'Function over decoration: 3D bars';
plotTypes.find(t=>t.id==='bar').examples.push(
  ['perspective-bars-1.png','Decorative depth hides a simple comparison','Counts of 42, 38, 35, and 31 colonies. Depth shifts bar baselines and tops on the screen, making the top positions misleading to compare directly.'],
  ['perspective-bars-2.png','The same counts on a shared baseline','Simple 2D bars retain the same values and colour. Every bar begins at zero, so lengths and top positions consistently show the differences.']
);

for (const id of ['venn','upset']) {
  const type = plotTypes.find(t=>t.id===id);
  type.lesson = 'When overlapping circles stop helping';
  type.examples.push(
    ['overlap-complex.png','A crowded four-list overlap','Thirteen non-empty, exact gene-membership combinations. Counts are correct, but tracing the overlapping boundaries is difficult. Circle areas are not proportional; this is an Euler-style layout for these observed memberships.'],
    ['overlap-upset-1.png','The same memberships as an UpSet plot','Each column explicitly shows included and excluded lists. Aligned bars rank the exact intersection counts. No genes or intersections were removed.']
  );
}

const plotAdvice = {
  "grouped": ["Use a zero baseline, consistent category order and colours, and enough space between sample groups.", "Confuse separate category bars with replicates, or treat percentages as absolute abundance."],
  "scatter": [
    "Use clear units and transparency or binning when points overlap.",
    "Treat an association as proof of causation or hide crowded regions."
  ],
  "bar": [
    "Start the value axis at zero and keep category labels readable.",
    "Add decorative depth or show means alone when individual variation matters."
  ],
  "line": [
    "Use true time spacing and identify the series clearly.",
    "Connect unrelated samples as though they were a trajectory."
  ],
  "histogram": [
    "Try several bin widths and use common bin edges for comparisons.",
    "Interpret every small peak as a separate biological population."
  ],
  "box": [
    "Define the whiskers and add observations when sample size allows.",
    "Assume a box reveals distribution shape or that whiskers always show the full range."
  ],
  "violin": [
    "Use consistent smoothing and show the underlying observations where practical.",
    "Present a smooth shape from very few observations as reliable structure."
  ],
  "heatmap": [
    "Label the colour scale, transformations, and sample groups.",
    "Compare colours across different scales or hide row standardisation."
  ],
  "paired": [
    "Connect the same experimental unit across its measurements.",
    "Join unrelated observations or lose the matching identifiers."
  ],
  "density": [
    "Use consistent smoothing and show where the observations lie.",
    "Read density height as a count or treat smoothed peaks as established groups."
  ],
  "ternary": [
    "Use three components with a shared fixed total and label every vertex.",
    "Plot three unrelated measurements as though they were a composition."
  ],
  "circular": [
    "Use a few mutually exclusive parts of one clearly defined whole.",
    "Use 3D perspective, overlapping categories, or many similar slices."
  ],
  "venn": [
    "Label exact region counts and use only a few easily traced sets.",
    "Infer counts from unscaled areas or force many lists into overlapping circles."
  ],
  "sankey": [
    "Define what flows, and make ribbon thickness proportional to its amount.",
    "Imply transitions between unmatched observations or confuse membership with movement."
  ],
  "stacked": [
    "Choose counts or percentages deliberately and keep category colours consistent.",
    "Hide different totals behind 100% bars without explaining the change."
  ],
  "radar": [
    "Keep spoke order and meaningful scales consistent across profiles.",
    "Use polygon area as an overall score or mix incompatible units without explanation."
  ],
  "ecdf": [
    "Label the cumulative fraction and compare values at meaningful thresholds.",
    "Read the curve as a density or assume its height shows sample size."
  ],
  "ridgeline": [
    "Share the horizontal scale and state how densities are smoothed and scaled.",
    "Let overlapping ridges conceal distributions or treat group offsets as measurements."
  ],
  "dot": [
    "Use a shared scale and an order that supports the comparison.",
    "Leave readers guessing whether dots are observations or summaries."
  ],
  "interval": [
    "Name the estimate, interval type, and experimental unit.",
    "Confuse SD with uncertainty in a mean or use overlap as a universal significance test."
  ],
  "area": [
    "Use ordered time and a meaningful zero baseline for filled magnitudes.",
    "Stack non-additive quantities or imply a timeline across unordered samples."
  ],
  "bubble": [
    "Scale symbol area to the quantity and include a readable size key.",
    "Scale radius directly to values or add size merely because another column exists."
  ],
  "volcano": [
    "Define the effect, p-value adjustment, and any selection thresholds.",
    "Equate statistical evidence with biological importance or validation."
  ],
  "ma": [
    "Explain the expression scale and examine abundance-dependent patterns.",
    "Ignore preprocessing or treat the display itself as a differential-expression model."
  ],
  "correlation": [
    "State the coefficient and sample size; use a common −1 to +1 scale.",
    "Infer causation or robust relationships from colour alone."
  ],
  "upset": [
    "Make included and excluded sets explicit and define exact versus inclusive intersections.",
    "Count inclusive overlaps as disjoint groups or omit the membership key."
  ],
  "network": [
    "Define nodes, edges, direction, and any size or weight mappings.",
    "Treat layout proximity or edge crossings as additional biological evidence."
  ],
  "pca": [
    "Report explained variance and preprocessing; inspect metadata and possible batch effects.",
    "Treat visible separation as a statistical test or assume an axis is one measured gene."
  ],
  "survival": [
    "Define the event, mark censoring, and report numbers at risk when interpreting the curves.",
    "Treat censored observations as events or ignore uncertainty in sparsely supported tails."
  ],
  "forest": [
    "Label effect units and intervals, and show the appropriate no-effect reference.",
    "Add a pooled estimate without a justified model or use zero as the reference for ratios."
  ],
  "blandaltman": [
    "Use matched measurements and assess bias, spread, and acceptable differences.",
    "Treat correlation or limits of agreement as proof that methods are interchangeable."
  ],
  "raincloud": [
    "Explain each layer and keep scales and smoothing comparable.",
    "Add redundant layers until individual measurements become harder to read."
  ],
  "seqlogo": [
    "State the alphabet, background, sample size, and whether height means frequency or information.",
    "Treat a tall letter as proof of function or compare different height conventions without explanation."
  ],
  "genome": [
    "Align tracks to the same coordinates and label strand, units, and normalisation.",
    "Compare raw coverage across libraries as though sequencing depth could not differ."
  ]
};


// Comparisons use the same data within each pair unless explicitly stated.
const designComparisons = {
 scatter: [
  ['Few points: should we connect them?', 'gallery-scatter-small-1.png','gallery-scatter-small-2.png','Eight independent cultures: biomass versus enzyme activity.','The connecting line suggests a sequence or trajectory between independent cultures. Separate points show the association without implying that one culture turns into the next.'],
  ['Add a useful callout','gallery-scatter-small-2.png','gallery-scatter-small-3.png','The same eight cultures.','A callout directs attention to C7 without changing or removing the other measurements. It is a descriptive observation, not a statistical outlier test.'],
  ['Which labels help?', 'gallery-scatter-labels-1.png','gallery-scatter-labels-2.png','Forty independent cultures: biomass versus enzyme activity.','Every label competes with the points. Naming just C40 makes the observation under discussion easy to find. Keep all identifiers in the data table; select labels for an explicit reason.'],
  ['PCoA: add relevant sample information','gallery-scatter-pcoa-1.png','gallery-scatter-pcoa-2.png','Six taxon counts in each of 16 soil samples, converted to proportions. PCoA uses Hellinger distances between community profiles.','Colour and shape identify root and bulk-soil samples. Nearby points have more similar profiles in this two-axis approximation; these axes are not individual taxa. Percentages show distance-space variation represented. Separation alone does not establish significance or a causal habitat effect.'],
  ['When points overlap','scatter-step-1.png','scatter-step-3.png','Protein A versus protein B in the same 1,600 cells.','Large opaque points hide density. Smaller transparent points reveal crowded regions; opacity still saturates in very dense areas.']
 ],
 bar: [['Remove decorative depth','perspective-bars-1.png','perspective-bars-2.png','The same four colony counts.','A shared zero baseline makes heights comparable. Perspective adds visual displacement without adding data.']],
 box: [['Look beyond the box','distribution-step-2.png','distribution-step-4.png','The same 80 cells per condition.','Boxes compactly summarise quartiles. The violin and dots expose distribution shape that quartiles can hide; the extra detail is useful when heterogeneity is the question.']],
 violin: [['Show the evidence behind the shape','distribution-step-3.png','distribution-step-4.png','The same 80 cells per condition.','Adding observations lets readers check how much data supports the smoothed outline. With very few measurements, use the dots alone instead of implying a reliable density.']],
 heatmap: [['Make zero meaningful','heatmap-step-1.png','heatmap-step-2.png','The same gene-by-sample log2 fold changes.','A diverging scale centred at zero separates decreases from increases. A rainbow introduces visual boundaries that do not correspond to a biological threshold.']],
 paired: [['Keep the matching visible','paired-step-2.png','paired-step-3.png','The same before-and-after measurements in eight donors.','Connecting each donor reveals individual direction and magnitude. Separate groups conceal which observations belong together.']],
 circular: [['Remove 3D perspective','perspective-step-1.png','perspective-step-2.png','The same 40%, 35%, and 25% cell composition.','The foreground sidewall makes some slices look larger. Flat slices remove this distortion; aligned bars make close values still easier to compare.']],
 venn: [['When circles become hard to read','overlap-complex.png','overlap-upset-1.png','The same exact gene memberships in four lists.','UpSet makes each included and excluded list explicit and aligns intersection counts. A small two-list Venn remains a useful simple alternative.']],
 upset: [['Choose a readable intersection display','overlap-complex.png','overlap-upset-1.png','The same exact gene memberships in four lists.','The membership matrix removes the need to trace crowded region boundaries. Its bars show exact intersections, not inclusive overlaps.']]
};
const comparisonNotes = {
 line: ['Lines or panels?','Overlapping series allow direct comparisons at a time point; panels reduce interference. Keep identical scales when comparing panel heights.'],
 histogram: ['How much binning?','Narrower bins retain detail but look noisier; wider bins can hide structure. Neither width proves a biological subpopulation. Check whether the conclusion survives both.'],
 density: ['How much smoothing?','Less smoothing can turn sampling noise into apparent peaks. More smoothing can merge real structure. Compare the same measurements and keep the bandwidth explicit.'],
 ternary: ['One composition or several?','The first example teaches one sample; the second adds samples. The data scope changes here. Keep all three components and the fixed-total rule visible; do not interpret these axes as ordinary x and y.'],
 sankey: ['Transitions or categories?','These are different datasets: tracked state transitions versus source-to-cell-type membership. A flowing ribbon can imply movement, so explicitly distinguish tracking from classification.'],
 stacked: ['Counts or composition?','Counts retain sample totals. Percentages make composition comparable but hide total abundance. Samples 1 and 2 have identical proportions despite a twofold difference in cell counts.'],
 radar: ['Overlays or separate profiles?','Overlaid polygons support direct comparison but obscure one another. Separate panels reduce overlap; keep spoke order and scales fixed. Polygon area is not an overall biological score.'],
 ecdf: ['One population or group comparisons?','The first example shows fluorescence; the second uses cytokine measurements across groups, so these are not a before-and-after pair. Group curves help compare threshold fractions; their heights do not reveal group sample sizes.'],
 ridgeline: ['Check the smoothing choice','The same dose groups use two bandwidths. Smoother ridges improve readability but can conceal local structure. Shared axes allow comparison; ridge offsets do not encode concentration.'],
 dot: ['Dots or lollipops?','Both show the same ordered counts. Stems emphasise distance from zero; bare dots reduce ink. Keep the order and shared scale, whichever style serves the question.'],
 interval: ['Horizontal or vertical?','The same means and 95% t confidence intervals appear in two orientations. Horizontal intervals leave more room for long group names. Orientation does not change the uncertainty or its interpretation.'],
 area: ['Total or components?','The total makes overall biomass growth easy to follow. Stacking splits that same total into taxa, but middle layers lack a shared baseline. Use separate lines if comparing individual taxon changes is the priority.'],
 bubble: ['Can readers decode the sizes?','The same points and symbol areas are retained. Explicit prevalence labels help read exact values; a size key still explains the mapping. If prevalence is irrelevant to the question, omit the size encoding.'],
 volcano: ['Highlight a declared rule','Showing all genes is a neutral overview. Highlighting a stated effect-size and adjusted-p threshold helps locate candidates. Unselected genes remain visible; highlighted genes are not automatically biologically important.'],
 ma: ['Make selection interpretable','Highlighting the same selection rule adds a useful layer to the same gene results. The zero line anchors direction. A coloured point alone does not explain the statistical model.'],
 correlation: ['Order related variables','The same coefficients are reordered to bring similar variables together. A common −1 to +1 scale and printed values prevent colour from exaggerating weak evidence. Only six samples support these correlations.'],
 network: ['Choose a layout for the question','The same nodes and edges appear in both layouts. Grouping connected nodes reduces visual tracing. Positions are drawing choices: closer nodes do not imply an additional measured relationship.'],
 pca: ['Label samples when identity matters','The same PCA coordinates are shown twice. Sample labels help investigate unusual points or metadata; with many samples, label only those under discussion. The axes summarise expression variation, not measured gene values.'],
 survival: ['Show uncertainty too','The same germination observations support both curves. Confidence intervals show how imprecise the estimated event-time pattern is. Censoring is not an event; sparse tails deserve caution.'],
 forest: ['Choose an informative order','The same experiment estimates and intervals are reordered by precision. This makes interval widths easy to compare, but preserve a meaningful biological order if that is more relevant. Narrow intervals do not imply large effects.'],
 blandaltman: ['Add agreement references','The same paired measurements are retained. Bias and limits of agreement give differences context. These limits describe the data; acceptable disagreement must be specified from the measurement use case.'],
 raincloud: ['Use layers purposefully','The first view shows one dose group; the second adds the others, so the displayed scope changes. Dots show observations, boxes summarise quartiles, and densities show smoothed shape. Remove a layer if it distracts from the comparison.'],
 seqlogo: ['Frequency or information?','Both use exactly the same base counts. Frequency shows base proportions; information height emphasises conserved positions relative to a uniform background. A short information stack does not mean fewer sequences.'],
 genome: ['Align tracks for comparison','The second view adds another coverage track. Shared coordinates and scales make locations and magnitudes comparable. Raw coverage differences can reflect library depth; alignment alone does not normalise it.'],
 grouped: ['Absolute or relative values?','The same cell counts become within-sample percentages. Grouped counts compare quantities; grouped percentages compare shares. State the denominator and keep totals available when they matter.']
};
for (const type of plotTypes) {
 if (!designComparisons[type.id]) {
  const [title,note]=comparisonNotes[type.id];
  designComparisons[type.id]=[[title,type.examples[0][0],type.examples[1][0],type.examples[0][2]+' '+type.examples[1][2],note]];
 }
}

// Every family has a matched less-clear / clearer comparison.
const repairNotes = {
  "line": [
    "Keep time intervals proportional",
    "Two cultures measured at 0, 1, 2, 6 and 12 hours; the vertical axis shows biomass in mg/L.",
    "Equally spacing these time labels compresses the late intervals and distorts growth rates. Using elapsed hours as numeric positions preserves the slopes. Connect points only within the same culture."
  ],
  "histogram": [
    "Avoid bins that hide the structure",
    "The same 240 cells, with fluorescence on the horizontal axis and cell counts on the vertical axis.",
    "Very wide bins conceal much of the distribution. Five-unit bins reveal more detail here. This is not a universal ideal width: compare several choices and check the observations before claiming distinct populations."
  ],
  "density": [
    "Do not turn noise into peaks",
    "The same 240 fluorescence measurements; the rug shows individual cells.",
    "A bandwidth of 0.3 makes many small fluctuations look like peaks. A bandwidth of 4 gives a more readable summary. Smoothing is a choice, not proof of how many biological populations exist."
  ],
  "ternary": [
    "Give readers a way to read proportions",
    "The same five samples; T cells, B cells and monocytes sum to 100% within each sample.",
    "Vertices alone make intermediate proportions difficult to estimate. Grid lines, percentages and explicit 100% endpoints supply a reading guide without changing point locations."
  ],
  "sankey": [
    "Explain what the ribbons encode",
    "The same 100 cells tracked from low/high signal before to low/high signal after treatment.",
    "The first version leaves the denominator and width meaning implicit. Counts and a tracking description make the flows interpretable. Ribbon width counts cells; it does not show the size of a signal change."
  ],
  "stacked": [
    "Keep sample totals visible",
    "The same cell counts from four 1 mL samples, displayed as percentages of T cells, B cells and monocytes.",
    "Both charts show the same proportions. Adding n exposes the different cell totals: S1 and S2 have identical composition but 100 versus 200 cells. Use absolute bars when the totals themselves are the main question."
  ],
  "grouped": [
    "Keep category colours consistent",
    "The same T-cell, B-cell and monocyte counts in four 1 mL samples. Categories stay in the same bar order.",
    "The first chart changes category colours between samples, conflicting with its legend. Fixed colours let readers trace each cell type across groups without repeatedly decoding positions."
  ],
  "radar": [
    "Do not hide one profile behind another",
    "The same enzyme activities for two strains, on a common 0\u2013100% scale.",
    "Opaque overlapping polygons obscure part of the first strain. Separate panels preserve both profiles with identical spoke order and scales. For precise comparisons of each enzyme, a dot plot may be simpler."
  ],
  "ecdf": [
    "Identify the curves",
    "The same cytokine measurements from 40 independent samples per dose group; height is the fraction at or below a concentration.",
    "Unidentified colours cannot tell readers which group crosses a threshold first. A legend, group sample sizes and distinct line styles make the comparison interpretable, including without colour."
  ],
  "ridgeline": [
    "Give distributions enough room",
    "The same cytokine measurements in three dose groups; identical bandwidth and horizontal scale in both versions.",
    "Tall overlapping ridges hide neighbouring distributions. Reducing the common density-height multiplier exposes all three. This changes vertical display scaling, not bandwidth or the concentrations."
  ],
  "dot": [
    "Order categories to help comparison",
    "The same gene counts for five annotated pathways.",
    "An arbitrary order makes the largest and smallest values harder to locate. Sorting supports ranking. Retain a fixed biological order instead when that order is meaningful across figures."
  ],
  "interval": [
    "Define the error bars",
    "The same mean cytokine concentrations and intervals for 40 independent samples per dose group.",
    "\u201cError\u201d is ambiguous. Naming the 95% t confidence intervals and sample size tells readers that these describe uncertainty in group means, rather than the spread of individual measurements."
  ],
  "area": [
    "Do not cover one area with another",
    "The same biomass measurements for three taxa over six time points.",
    "Opaque areas drawn from the same zero baseline obscure lower series. Stacking preserves their additive total and exposes each component. Middle components still lack a common baseline; use lines if their individual trajectories are the priority."
  ],
  "bubble": [
    "Make size interpretable",
    "The same five taxa: horizontal position is mean relative read abundance; symbol area is prevalence across samples.",
    "Without a size key, large circles have no defined meaning. A key and explicit percentages show prevalence. These are sample-occurrence percentages, not additional read abundances."
  ],
  "volcano": [
    "Explain why genes are highlighted",
    "The same 120 genes, with expression difference versus \u2212log10 BH-adjusted p-value.",
    "Unexplained coloured genes invite guesses about the selection rule. Threshold lines and an explicit rule make it reproducible. Crossing the thresholds does not establish biological importance."
  ],
  "ma": [
    "Explain the highlighted subset",
    "The same 120 genes: mean log2 expression versus treatment\u2013control log2 expression difference.",
    "The zero line anchors direction; effect thresholds and the stated adjusted-p rule explain the colours. The plot helps inspect abundance-dependent patterns but does not itself replace the expression-analysis model."
  ],
  "correlation": [
    "Show what the colours mean",
    "The same Pearson correlations between four genes, measured in six samples.",
    "A matrix without a colour key leaves magnitude and sign uncertain. The \u22121 to +1 key, coefficients and sample size make the display readable while reminding students that these estimates have little supporting data."
  ],
  "network": [
    "Reduce crossings, preserve connections",
    "The same six proteins and seven undirected association edges.",
    "A tangled layout makes individual connections difficult to follow. Separating the connected groups reduces crossings without deleting edges. Node proximity is a layout choice, not another measured association."
  ],
  "pca": [
    "Identify groups and samples",
    "The same 12 expression profiles projected onto their first two principal components.",
    "A colour split without a key is difficult to interpret. Group labels, redundant shapes, sample IDs and explained-variance labels make the coordinates interpretable. Inspect preprocessing and batch metadata before assigning a biological explanation."
  ],
  "survival": [
    "Make censoring and uncertainty visible",
    "The same seed germination records from 30 seeds per treatment; height is the probability of not yet germinating.",
    "Bare curves look more certain than they are. Censoring marks and pointwise 95% confidence limits expose incomplete follow-up and estimation uncertainty. The sparse tails still need caution; at-risk counts would add useful detail."
  ],
  "forest": [
    "Show how precise the estimates are",
    "The same treatment\u2013control growth differences from four experiments, in mm/day.",
    "Estimates alone hide precision and their relationship to no effect. Adding 95% normal-approximation intervals and a zero reference makes both visible. An interval crossing zero does not establish equivalence."
  ],
  "blandaltman": [
    "Give disagreement a reference",
    "The same 40 samples measured by assays A and B; x is their mean and y is B minus A.",
    "The cloud alone makes systematic bias and spread hard to judge. Mean bias and limits of agreement (bias \u00b1 1.96 SD of the differences) summarise them. Decide acceptable assay disagreement separately; these lines are not acceptance limits or confidence intervals."
  ],
  "raincloud": [
    "Separate the layers",
    "The same 40 cytokine measurements per dose group, using identical bandwidth, values and jitter in both versions.",
    "Putting dots, boxes and opaque densities on top of each other hides observations. Offsetting a light half-density and the dots lets each layer do a distinct job. Drop a layer if it does not help the question."
  ],
  "genome": [
    "Keep comparable tracks on one scale",
    "The same control and treatment read depths across a 1,000 bp example locus.",
    "Independent vertical limits make peaks look more alike than their heights are. A shared 0\u201365 scale makes raw depths comparable. This does not correct sequencing-depth differences or turn coverage into a tested expression effect."
  ],
  "seqlogo": [
    "State what letter height means",
    "The same base counts from 100 aligned DNA sequences; letter positions and heights are unchanged.",
    "A generic \u201cScore\u201d label cannot distinguish frequency from information. Bits, background and correction details define the height convention. Uniform positions have zero information here; that does not mean no sequences were observed."
  ]
};
for (const [id,[title,context,note]] of Object.entries(repairNotes)) {
 const extension = id==='seqlogo' ? 'svg' : 'png';
 designComparisons[id] = [[title,`repair-${id}-1.${extension}`,`repair-${id}-2.${extension}`,context,note]];
}

// Sample count is a more direct teaching example for bubble area.
const sampleBubble = plotTypes.find(t=>t.id==='bubble');
sampleBubble.use = 'Compare dose and response, with circle area showing how many samples were measured.';
sampleBubble.watch = 'Each circle summarises a different illustrative study. Area represents sample count, not effect size or certainty. Different studies may differ in ways other than dose.';
sampleBubble.examples = [
 ['bubble-samples-1.png','Study summaries without a size key','Five simulated studies: dose on x, responding samples (%) on y. The unexplained circle sizes are deliberately ambiguous.'],
 ['bubble-samples-2.png','Circle area shows sample size','The same studies, now with a size legend and n labels. A larger circle means more independent samples, not a stronger response.']
];
designComparisons.bubble = [['Explain sample size with a size key','bubble-samples-1.png','bubble-samples-2.png','Each circle is one simulated study. Position shows dose and response; circle area represents the number of independent samples.','The size key and n labels make the third quantity explicit. Study D has n=200, so its circle has ten times the area of study A (n=20). More samples do not automatically mean a larger effect, better study quality or freedom from bias.']];

function renderDesignComparisons(id) {
 return `<section class="design-comparisons"><h2>Compare designs</h2>${designComparisons[id].map(([title,a,b,context,note])=>`<article><h3>${title}</h3><p>${context}</p><div class="gallery-examples"><figure><figcaption>${id==='scatter' && title!=='Few points: should we connect them?' && title!=='Which labels help?' && title!=='When points overlap' ? 'Starting view' : 'Less clear'}</figcaption><img loading="lazy" src="assets/${a}" alt="${title}: version A"></figure><figure><figcaption>Clearer for this question</figcaption><img loading="lazy" src="assets/${b}" alt="${title}: version B"></figure></div><details><summary>What changes, and when does it help?</summary><p>${note}</p></details></article>`).join('')}</section>`;
}

let galleryPage = 0;
let galleryGroup = 'All';
const galleryCapacity = () => window.innerWidth >= 1200 && window.innerHeight >= 750 ? 6 : 4;
let galleryPageSize = galleryCapacity();
function plotGallery(group = galleryGroup) {
  galleryGroup = group;
  current = -1;
  const ids = group === 'All' ? Object.values(galleryGroups).flat() : galleryGroups[group];
  const pageSize = galleryCapacity();
  if (pageSize !== galleryPageSize) { galleryPage = Math.floor(galleryPage * galleryPageSize / pageSize); galleryPageSize = pageSize; }
  const pages = Math.ceil(ids.length/pageSize);
  galleryPage = Math.max(0, Math.min(galleryPage,pages-1));
  app.innerHTML = `<p class="presentation-kicker">Section 1 of 12 · Choose a plot for your question</p><h1>What kinds of plots are there?</h1><label for="gallery-group">Category: </label><select id="gallery-group">${['All',...Object.keys(galleryGroups)].map(g=>`<option ${g===group?'selected':''}>${g}</option>`).join('')}</select><div class="plot-gallery presentation-gallery ${pageSize===6?'six-plots':''}">${ids.slice(galleryPage*pageSize,(galleryPage+1)*pageSize).map(id=>plotTypes.find(t=>t.id===id)).map(t=>`<a class="plot-type" href="#plot-${t.id}"><img src="assets/${t.examples[0][0]}" alt="" loading="lazy"><h3>${t.name}</h3><p>${t.use}</p></a>`).join('')}</div><nav class="navigation footer-controls"><button id="gallery-prev" ${galleryPage===0?'disabled':''}>Previous</button><span>${galleryPage+1} / ${pages}</span><button id="gallery-next" ${galleryPage===pages-1?'disabled':''}>Next plot families</button></nav>`;
  document.querySelector('#gallery-group').onchange=e=>{galleryPage=0;plotGallery(e.target.value);};
  document.querySelector('#gallery-prev').onclick=()=>{galleryPage--;plotGallery(group);};
  document.querySelector('#gallery-next').onclick=()=>{galleryPage++;plotGallery(group);};
  window.scrollTo(0,0);
}
function plotType(id, step = 0) {
  const t = plotTypes.find(t=>t.id === id);
  if (!t) { plotGallery(); return; }
  current = -1;
  const comparisons = designComparisons[id];
  const pair = comparisons[Math.floor(step/2)];
  const revealed = step % 2 === 1;
  const comparisonSlide = `<section class="design-comparisons"><h2>${pair[0]}</h2><p>${pair[3]}</p><div class="gallery-examples"><figure><figcaption>Starting view</figcaption><img src="assets/${pair[1]}" alt="${pair[0]}: starting view"></figure><figure><figcaption>Alternative design</figcaption>${revealed?`<img src="assets/${pair[2]}" alt="${pair[0]}: alternative design">`:'<div class="consistency-placeholder">Discuss the first figure, then reveal the alternative.</div>'}</figure></div>${revealed?`<p>${pair[4]}</p>`:''}<nav class="navigation footer-controls"><button id="type-prev" ${step===0?'disabled':''}>Previous</button><span>${step+1} / ${comparisons.length*2}</span><button id="type-next">${revealed?(step===comparisons.length*2-1?'Back to plot types':'Next example'):'Reveal alternative'}</button></nav></section>`;
  const lesson = cards.findIndex(c=>c.title === t.lesson);
  const compared = new Set(designComparisons[id].flatMap(pair=>[pair[1],pair[2]]));
  const additional = t.examples.filter(example=>!compared.has(example[0]));
  app.innerHTML = `<h1>${t.name}</h1><p>${t.use}</p>${comparisonSlide}<details><summary>Advice, examples & further exploration</summary><section class="plot-advice" aria-label="Do and don’t"><div><h2>Do</h2><p>${plotAdvice[t.id][0]}</p></div><div><h2>Don’t</h2><p>${plotAdvice[t.id][1]}</p></div></section><details class="plot-reading-notes"><summary>Reading notes</summary><p>${t.watch}</p></details>${additional.length ? '<h2>More examples</h2>' : ''}<section class="gallery-examples">${additional.map(([img,title,caption])=>`<figure><h2>${title}</h2><p>${caption}</p><img src="assets/${img}" alt="${title}. ${caption}"></figure>`).join('')}</section><p class="attribution">Source: Course examples.</p>${lesson>=0?`<p><a href="#card-${lesson+1}">Explore the step-by-step example</a></p>`:''}${(t.relatedLessons || []).map(title=>{const index=cards.findIndex(c=>c.title===title);return index>=0?`<p><a href="#card-${index+1}">${title}</a></p>`:'';}).join('')}</details>`;
  document.querySelector('#type-prev').onclick=()=>{if(step===0)location.hash='plot-types';else plotType(id,step-1);};
  document.querySelector('#type-next').onclick=()=>{if(step<comparisons.length*2-1)plotType(id,step+1);else {location.hash='plot-types';}};
  window.scrollTo(0,0);
}

let galleryResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(galleryResizeTimer);
  galleryResizeTimer = setTimeout(() => {
    if (location.hash === '#plot-types' && galleryCapacity() !== galleryPageSize) plotGallery();
  }, 150);
});
