/* Edit teaching content here. All synthetic figure pairs share data; see generate_plots.R. */
const sources = {
 ons: {label:'Frank Donnarumma · Office for National Statistics · 2019',url:'https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/',credit:'Source: Office for National Statistics. Contains public sector information licensed under the Open Government Licence v3.0. Original images, unchanged.',license:'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'},
 plos: {label:'Weissgerber et al. · PLOS Biology · 2015 · Figure 1',url:'https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128',credit:'© 2015 Weissgerber et al. CC BY 4.0. Original Figure 1, unchanged.',license:'https://creativecommons.org/licenses/by/4.0/'},
 nature: {label:'Xiong et al. · Nature Communications · 2022 · Figure 4',url:'https://www.nature.com/articles/s41467-022-33758-z',credit:'© 2022 The Author(s). CC BY 4.0. Original Figure 4, unchanged.',license:'https://creativecommons.org/licenses/by/4.0/'},
 baseline: {label:'Further reading · Datawrapper: bar-chart baselines',url:'https://www.datawrapper.de/academy/why-our-column-and-bar-charts-start-at-zero'},
 pie: {label:'Further reading · Datawrapper: choosing pie charts',url:'https://www.datawrapper.de/academy/what-to-consider-when-creating-a-pie-chart'}
};
const phases = [
 {name:'Spot the trap',subtitle:'Read beyond first impressions',description:'Find the misleading choice. Explain the impression it creates, then suggest one repair.',time:'8–12 min'},
 {name:'Read the craft',subtitle:'More evidence. Clearer structure.',description:'Study published examples. What makes their information readable, and what would you change for a lecture?',time:'8–12 min'},
 {name:'Choose the view',subtitle:'Same data. Different decisions.',description:'Choose the figure that best answers the stated question. A useful plot always has a purpose.',time:'12–18 min'}
];
const originalCards = [
 {phase:0,title:'How big is the improvement?',description:"Survival results for a control and a treatment group. The horizontal axis identifies the groups; the vertical axis shows survival as a percentage. Each bar represents one group.",question:'What makes the visual impression misleading?',images:['truncated.png'],origin:'Original teaching example',options:['The bars begin at 50%, exaggerating the difference.','Any difference below 5% should be hidden.','The colours are the main problem.'],correct:0,feedback:['Yes. The visible heights are 1 and 4, although the values are 51 and 54. The difference is 3 percentage points; relative to 51%, it is about 5.9%.','A small difference can matter. Report its magnitude and uncertainty; do not hide it. Here the misleading feature is the truncated bar baseline.','Colour can help distinguish groups, but changing the palette would leave the distorted bar lengths intact.'],takeaway:'Use a zero baseline when bar length encodes magnitude. A labelled point plot can use a narrower range to inspect small differences.',discuss:'Would a line chart or point plot always need to start at zero? Why is length encoding different?',source:'baseline'},
 {phase:0,title:'Can these slices form one whole?',description:"A survey asks 100 participants about fatigue, headache, and nausea, allowing multiple responses. Slice labels give the percentage of participants reporting each symptom; this chart has no axes.",question:'Why is this pie unsuitable?',images:['overlap-pie.png'],origin:'Original teaching example',options:['Three slices are too many.','The categories overlap; their percentages add to 160%.','The labels should be removed.'],correct:1,feedback:['A pie can work for a few mutually exclusive parts of a whole. Three categories alone are not the problem.','Exactly. A pie implies one partition of a whole. These are overlapping responses from the same 100 people; separate bars would preserve the percentages.','Removing labels would conceal the contradiction. Keep the denominator visible and change the encoding.'],takeaway:'A percentage is not automatically a part of a pie. Check the denominator and whether categories overlap.',discuss:'Draw the replacement. What should the axis label say?',source:'pie'},
 {phase:0,title:'Did Gold overtake Blue?',description:"Two illustrative series are shown over 2013–2018; no measurement units are specified. In the plot labels, LHS means left-hand side: read Blue against the left vertical axis (0–1,000). RHS means right-hand side: read Gold against the right vertical axis (5–17).",question:'What should you inspect before trusting the crossing?',images:['ons-dual.png'],origin:'Published teaching example · Office for National Statistics',options:['Whether the lines use different vertical scales.','Whether gold is a brighter colour.','Whether straight lines should be smoothed.'],correct:0,feedback:['Yes. The crossing depends on two separately scaled axes. It does not establish that one value has overtaken the other.','Colour distinguishes series; it cannot make heights comparable when scales differ.','Smoothing would not fix the incompatible scales and could introduce additional assumptions.'],takeaway:'Do not interpret crossings on independently scaled axes as equality of the underlying values.',discuss:'How could you preserve both trends without inviting a direct height comparison?',source:'ons'},
 {phase:1,title:'Separate panels, shared context',description:"United Kingdom employment and unemployment rates, 2006–2018. Both horizontal axes show time; the vertical axes show the respective rates in percent. Shading marks the 2008 recession.",question:'What is the main advantage of this Office for National Statistics redesign?',images:['ons-panels.png'],origin:'Published example · UK employment and unemployment',options:['It proves employment causes unemployment to change.','It separates two scales while keeping time aligned.','It removes the need to read axis labels.'],correct:1,feedback:['This layout describes trends. It does not establish a causal relationship.','Yes. Each series has its own space and explicit scale; aligned time makes corresponding periods easy to inspect.','Axes still matter. Separate panels make scale differences easier to see, not irrelevant.'],takeaway:'A layout can preserve detail and reduce a false comparison at the same time.',discuss:'Which comparisons are supported within a panel? Which comparisons across panels still need care?',source:'ons'},
 {phase:1,title:'One summary, many possible stories',description:"Teaching datasets compare two groups, placed side by side in each panel. The vertical axis shows numerical values without specified units. Panel A displays means with standard-error bars; each dot in B–E is an observation. The table below reports statistical test results.",question:'Look at all five panels. What additional evidence do the points provide?',images:['plos-distributions.png'],origin:'Published research figure',options:['Proof that bars are always wrong.','Exact causes of differences between groups.','Variation, outliers, and the number of observations.'],correct:2,feedback:['Bars remain useful for counts and some summaries. The issue here is how much a summary hides about a small continuous dataset.','Visible observations help assess evidence, but they do not identify causes on their own.','Yes. Similar summaries can conceal very different distributions. The panel structure lets readers compare those possibilities.'],takeaway:'Information density is useful when every element helps a reader assess the evidence.',discuss:'Cover panels B–E. What could you no longer check? Which panel would you show first in a lecture?',source:'plos'},
 {phase:1,title:'A paper figure is a reading journey',description:"A published single-cell atlas figure. Panel a shows tissues and cell counts. In b, c, and f, dots are cells positioned by two unitless embedding coordinates (UMAP1/2). Panel d compares two agreement scores: normalized mutual information horizontally and adjusted Rand index vertically. Panel e plots over-correction scores by atlas and method; g compares cell-type labels on both axes, with colour showing proportions.",question:'This Nature Communications figure combines several views of a cell atlas. Which habit is worth borrowing?',images:['nature-atlas.png'],origin:'Published research figure',options:['Include as many panels as possible.','Give each panel a role and connect them with labels and consistent visual conventions.','Assume a prestigious journal guarantees a good figure.'],correct:1,feedback:['Extra panels help only if they add evidence. At lecture size, a dense page may need to be revealed one panel at a time.','Yes. Follow the overview into the comparisons. Panel labels and repeated conventions help readers navigate complementary evidence.','Assess the design itself: legibility, scales, evidence, and the question. A journal name is not a quality test.'],takeaway:'Dense figures can work well for close reading. A presentation may need larger text and a staged reveal of the same material.',discuss:'Find the entry point, then a quantitative panel. Choose one panel to explain first and one you would postpone.',source:'nature'},
 {phase:2,title:'Does the mean describe the group?',description:"Two groups each have 12 protein-abundance measurements. The horizontal axis identifies the group; the vertical axis shows abundance in arbitrary units (a.u.). Bars and black horizontal lines indicate means; dots indicate measurements. Both versions use the same data.",question:'Which view better answers: “Do the groups have similar distributions?”',images:['distribution-a.png','distribution-b.png'],origin:'same 12 observations per group · bars and black lines show means',options:['Choose A','Choose B'],correct:1,feedback:['A reports the means clearly, but both are 10. It hides that B has low and high groups while A is tightly concentrated. A mean-only summary is insufficient for this question.','B shows every observation and the mean line. You can see the different spreads and the two clusters in B, despite the identical means.'],takeaway:'Show observations when the distribution is part of the question; avoid inferring biological subgroups from a tiny sample.',discuss:'With 100,000 observations, how would you prevent overplotting?',data:'distributions.csv'},
 {phase:2,title:'Did everyone improve?',description:"Ten participants have marker concentrations measured before and after treatment. The horizontal axis identifies the measurement occasion; the vertical axis shows concentration in nanograms per millilitre (ng/mL). Lower values are the desired outcome. Both versions use the same data.",question:'Lower concentration is the desired direction. Which view reveals whether each participant decreased?',images:['paired-a.png','paired-b.png'],origin:'same 10 participants measured twice',options:['Choose A','Choose B'],correct:0,feedback:['A preserves each participant’s connection: nine decrease and one increases. Pairing is part of the experimental design.','B gives group means but loses the links between observations. A lower average does not show whether all participants decreased.'],takeaway:'Keep the pairing visible when the scientific question concerns individual change.',discuss:'Would a plot of the ten individual changes answer this question even more directly?',data:'paired.csv'},
 {phase:2,title:'When did the response rise fastest?',description:"One culture is measured four times after exposure. The horizontal axis labels days since exposure; the vertical axis shows response in arbitrary units (a.u.). Each point is a measurement, and both versions use the same data.",question:'Which view represents change per day faithfully?',images:['time-a.png','time-b.png'],origin:'measurements on days 0, 1, 2, and 14',options:['Choose A','Choose B'],correct:1,feedback:['A spaces all visits equally, so a twelve-day interval looks like a one-day interval. Its slopes cannot be read as change per day.','B positions observations by elapsed time. The rise from day 1 to day 2 is much steeper per day than the rise from day 2 to day 14.'],takeaway:'Spacing is data. Lines connect observations; they do not establish what happened between measurements.',discuss:'When would equally spaced visit labels be reasonable? What should the axis say then?',data:'time.csv'},
 {phase:2,title:'Can colours be compared across panels?',description:"Allele frequencies for four genes in four samples. Columns are samples (S1–S4), grouped by control or treatment; rows are genes (G1–G4). Cell numbers and colours encode allele frequency, a proportion between 0 and 1. Both versions use the same data.",question:'Which view better supports comparing absolute allele frequencies between conditions?',images:['heatmap-a.png','heatmap-b.png'],origin:'identical 4 × 4 matrix; only colour limits change',options:['Choose A','Choose B'],correct:1,feedback:['A rescales each condition separately. Similar colours can stand for different numbers, even though the text values are correct.','B uses the same 0–1 mapping in both panels. A given colour represents the same frequency, so between-condition comparison is meaningful.'],takeaway:'Shared scales support absolute comparisons. Separate scales may help inspect within-panel variation, but must be explicit.',discuss:'Would a row z-score heatmap answer the same question? Explain what would change.',data:'heatmap.csv'},
 {phase:2,title:'Which pathway ranks third?',description:"Gene counts for six pathways; each gene is assigned to one pathway. In A, the horizontal axis counts genes and the vertical labels name pathways. In B, slices represent pathways and labels give counts. Both versions use the same data.",question:'Which display makes it easiest to rank these six similar counts?',images:['rank-a.png','rank-b.png'],origin:'each gene belongs to one category',options:['Choose A','Choose B'],correct:0,feedback:['A puts lengths on a shared baseline and sorts them. Signalling (39) is third after Metabolism (42) and Immunity (41).','B is a valid partition, but comparing similar slice angles takes more work. Its labels let you work out the order; the design does not make that task easy.'],takeaway:'A chart can be valid yet less effective for a particular question. Here the task is ranking, not simply showing a whole.',discuss:'For two categories and a part-to-whole message, would you still reject a pie?',data:'pathways.csv'},
 {phase:2,title:'Arrange the evidence',description:"Two layouts show the same four panels of data. Panels A–B compare groups horizontally and protein abundance vertically (arbitrary units). Panel C plots before-treatment concentration against after-treatment concentration (ng/mL), with a dashed equality line. Panel D plots days horizontally and response vertically (arbitrary units). These are separate teaching datasets.",question:'You need readers to inspect all four panels at paper-reading size. Which layout gives the evidence more balanced space?',images:['layout-a.png','layout-b.png'],origin:'identical panels and data, different allocation of space',options:['Choose A','Choose B'],correct:0,feedback:['A gives the distributions, paired observations, and time course room alongside the summary. Panel letters establish a clear reading order.','B devotes most of the width to the simple mean chart, squeezing the richer evidence into three small panels. It might work if the top panel carried the main message; here the task needs all four.'],takeaway:'Allocate space by the complexity and importance of the evidence. Consistent margins and panel labels help the reader navigate.',discuss:'These are teaching datasets, not one coherent study. For your own paper, which panels would form one scientific argument?'}
];

// Short examples first; published multi-panel figures remain optional.
const easyCards = [
  {
    "phase": 0,
    "title": "Follow the months",
    "description": "A lab records 10, 20, 30, and 40 samples in January, February, March, and April. The horizontal axis names months; the vertical axis counts samples.",
    "question": "What should change?",
    "images": [
      "months-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "Put the months in calendar order.",
      "Remove the points."
    ],
    "correct": 0,
    "feedback": [
      "Yes. A time series should follow time. Alphabetical ordering created a dip that is not in the chronological data.",
      "The points correctly mark measurements. The month order creates the misleading pattern."
    ],
    "repair": "months-fixed.png"
  },
  {
    "phase": 0,
    "title": "What does 18 mean?",
    "description": "Two water samples contain 12 and 18 milligrams of a substance per litre. The horizontal axis identifies samples A and B.",
    "question": "What essential information is missing?",
    "images": [
      "units-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "A third sample.",
      "The measurement and its units on the vertical axis."
    ],
    "correct": 1,
    "feedback": [
      "Two samples can be shown. Readers need to know what the vertical values measure.",
      "Yes. “Value” does not tell readers whether 18 means milligrams per litre, a percentage, or something else."
    ],
    "repair": "units-fixed.png"
  },
  {
    "phase": 0,
    "title": "Is B twice as much?",
    "description": "Two samples contain 10 and 20 cells. Circle size represents the count; the labels give the values. There are no axes.",
    "question": "What is wrong with the size comparison?",
    "images": [
      "circles-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "The larger circle has four times the area, but the count only doubles.",
      "Circles cannot represent quantities."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Doubling the radius quadruples the area. If area represents count, doubling the count should double the area.",
      "Circles can represent quantities when their areas are proportional to the values. Here the radius was doubled instead."
    ],
    "repair": "circles-fixed.png"
  },
  {
    "phase": 0,
    "title": "Read the tick marks",
    "description": "A culture has 0, 10, 20, and 100 colonies on days 1–4. The horizontal axis shows day; the vertical axis shows colony count on an intended linear scale.",
    "question": "What needs fixing?",
    "images": [
      "ticks-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "The line needs another colour.",
      "Equal distances on the vertical axis should represent equal increments."
    ],
    "correct": 1,
    "feedback": [
      "A different colour would not fix the spacing of the values.",
      "Yes. The intervals 0–10, 10–20, and 20–100 are drawn equally tall. On a linear axis, the last interval needs eight times the space."
    ],
    "repair": "ticks-fixed.png"
  },
  {
    "phase": 0,
    "title": "Which condition is which?",
    "description": "Four experimental conditions have 10, 14, 18, and 22 colonies. Condition names sit below the bars; the vertical axis counts colonies.",
    "question": "Which alternative layout would also keep the full names readable?",
    "images": [
      "labels-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "Use horizontal bars to give the names room.",
      "Remove the condition names."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Horizontal bars leave enough room to read each full condition name.",
      "Removing the names would make it impossible to identify the conditions. Change the layout instead."
    ],
    "repair": "labels-fixed.png",
    "repairLabel": "Alternative: horizontal bars"
  },
  {
    "phase": 0,
    "title": "Which line is the treatment?",
    "description": "A experiment tracks a control culture and a treatment culture over four days. The horizontal axis shows day; the vertical axis counts colonies.",
    "question": "What does the reader need?",
    "images": [
      "legend-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "More grid lines.",
      "A label or legend identifying each series."
    ],
    "correct": 1,
    "feedback": [
      "Grid lines could help read values, but they cannot identify the cultures.",
      "Yes. Colour and shape distinguish the lines, but do not tell us which is control and which is treatment."
    ],
    "repair": "legend-fixed.png"
  },
  {
    "phase": 0,
    "title": "Which lab has the higher rate?",
    "description": "Lab A has 10 contaminated samples out of 100; Lab B has 40 out of 200. The horizontal axis identifies the lab; the vertical axis counts contaminated samples.",
    "question": "What should we plot to compare contamination rates?",
    "images": [
      "denominator-first.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "Contaminated samples as a percentage of all samples tested.",
      "The counts are enough because 40 is larger than 10."
    ],
    "correct": 0,
    "feedback": [
      "Yes. The rates are 10% and 20%. Lab B has twice the rate, although it has four times the number of contaminated samples.",
      "Lab B tested twice as many samples. Counts alone do not show the contamination rate."
    ],
    "repair": "denominator-fixed.png"
  }
];
const simpleGoodCards = [
  {
    "phase": 1,
    "title": "A clear time series",
    "description": "A lab collects samples from January to April. The horizontal axis shows months; the vertical axis counts samples.",
    "question": "How many samples were collected in March?",
    "images": [
      "months-fixed.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "20 samples.",
      "30 samples."
    ],
    "correct": 1,
    "feedback": [
      "20 is the February value. March is the third point, at 30.",
      "Yes. The month labels and numbered axis let you read the value directly."
    ]
  },
  {
    "phase": 1,
    "title": "Identify the two cultures",
    "description": "Two cultures are followed for four days. The horizontal axis shows day; the vertical axis counts colonies.",
    "question": "Which culture has more colonies on day 4?",
    "images": [
      "legend-fixed.png"
    ],
    "origin": "Original teaching example",
    "options": [
      "The control culture.",
      "The treatment culture."
    ],
    "correct": 1,
    "feedback": [
      "The control has 5 colonies on day 4; the treatment has 9. The legend identifies each line.",
      "Yes. The legend identifies the treatment, whose day-4 value is 9 colonies."
    ]
  }
];
originalCards[0].repair = 'truncated-fixed.png';
originalCards[1].repair = 'overlap-fixed.png';
const moreEasyCards = [
  {
    "phase": 0,
    "title": "Does the title match?",
    "description": "A colony count changes from 10 to 12. The horizontal axis shows before and after; the vertical axis counts colonies.",
    "question": "What should change?",
    "options": [
      "The title: the count did not double.",
      "The bars should be taller to match the title."
    ],
    "correct": 0,
    "feedback": [
      "Yes. The increase is 2 colonies, or 20%. A title should describe the evidence.",
      "Change the title to match the data, not the data display to match the title."
    ],
    "images": [
      "claim-first.png"
    ],
    "repair": "claim-fixed.png"
  },
  {
    "phase": 0,
    "title": "What happened on day 3?",
    "description": "An experiment records 10, 12, and 14 colonies on days 1, 2, and 4. No measurement was taken on day 3. The axes show day and colony count.",
    "question": "What is the plotting mistake?",
    "options": [
      "The missing measurement is shown as zero.",
      "The points are too small."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Not measured does not mean zero. Leave a gap and label the missing observation.",
      "Point size is not the issue. The chart invents a zero for a day without a measurement."
    ],
    "images": [
      "missing-first.png"
    ],
    "repair": "missing-fixed.png"
  },
  {
    "phase": 0,
    "title": "Do equal counts look equal?",
    "description": "Two laboratories each collect 20 samples. The horizontal labels identify laboratories; the vertical axis counts samples.",
    "question": "What would make the comparison fairer?",
    "options": [
      "Remove the vertical axis.",
      "Give the bars equal widths."
    ],
    "correct": 1,
    "feedback": [
      "The axis helps readers see that both counts are 20. Keep it.",
      "Yes. Both bars have height 20, but the wider one occupies more area and attracts more attention. Equal widths avoid that distraction."
    ],
    "images": [
      "widths-first.png"
    ],
    "repair": "widths-fixed.png"
  },
  {
    "phase": 0,
    "title": "Can you read every number?",
    "description": "A heatmap shows two genes in two samples. Columns identify samples, rows identify genes, and cell colours and numbers show allele frequencies from 0 to 1.",
    "question": "What would make the numbers easier to read?",
    "options": [
      "Use light text on dark cells.",
      "Change the underlying values."
    ],
    "correct": 0,
    "feedback": [
      "Yes. White text on the dark cells improves contrast without changing the data.",
      "The data are not the problem. Change the text colour so the values are readable."
    ],
    "images": [
      "contrast-first.png"
    ],
    "repair": "contrast-fixed.png"
  },
  {
    "phase": 0,
    "title": "Where are the other samples?",
    "description": "Of 100 samples, 40 are type A, 30 type B, 20 type C, and 10 other types. Slice labels show percentages; there are no axes.",
    "question": "What is missing from the pie?",
    "options": [
      "A vertical axis.",
      "The remaining 10% of samples."
    ],
    "correct": 1,
    "feedback": [
      "A pie does not need axes, but it does need all the parts of the whole.",
      "Yes. The three shown categories total 90%. Add the other 10% instead of stretching the shown categories into a whole circle."
    ],
    "images": [
      "incomplete-first.png"
    ],
    "repair": "incomplete-fixed.png"
  }
];
const optionalCards = [originalCards[2], originalCards[4], originalCards[5], originalCards[11]].map(c => ({...c, phase: 3}));
sources.fullfactCake = {label:'Full Fact, 2013, review of the National Health Service birthday graphic',url:'https://fullfact.org/news/new-years-resolution-5-i-will-not-make-bad-graphs/',credit:'Original graphic credited through Full Fact to British Future. Reproduced here for local teaching critique; no open reuse licence asserted.'};
sources.fullfactDefra = {label:'Department for Environment, Food and Rural Affairs; discussed by Full Fact, 2013',url:'https://fullfact.org/news/new-years-resolution-5-i-will-not-make-bad-graphs/',credit:'Published government figures reproduced in Full Fact’s review. The original shows 2007; the later edition shows 2012.'};
const realCards = [
  {
    "phase": 4,
    "title": "A pie with a cake on top",
    "description": "This published graphic asks how people would celebrate the 65th birthday of the National Health Service. Labels give percentages for suggested activities. Full Fact reviewed it in 2013; the survey response rules are not shown in the graphic.",
    "question": "What is the clearest problem?",
    "images": [
      "real-cake.jpg"
    ],
    "source": "fullfactCake",
    "options": [
      "The percentages do not form a 100% whole, and the cake hides slices.",
      "A pie always needs a vertical axis."
    ],
    "correct": 0,
    "feedback": [
      "Yes. The printed percentages add to 171%. The redraw keeps those printed values as separate bars; it does not reconstruct or validate the original survey.",
      "Pies have no axes. Here the percentages exceed 100%, and decoration hides the slices."
    ],
    "repair": "real-cake-redraw.png",
    "repairLabel": "Our redraw of the printed values"
  },
  {
    "phase": 4,
    "title": "Too many tiny slices",
    "description": "A Department for Environment, Food and Rural Affairs figure shows food consumed in the United Kingdom by origin and value in 2007. Slices represent countries; labels give some percentages. Full Fact discussed this figure in 2013.",
    "question": "What makes the small categories hard to read?",
    "images": [
      "real-defra.png"
    ],
    "source": "fullfactDefra",
    "options": [
      "Crowded labels and many narrow slices.",
      "The chart needs more colours."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Grouping countries into broader regions makes the display simpler. The later published example below uses 2012 data, so it illustrates a design change, not a like-for-like numerical comparison.",
      "More colours will not create room for the labels. The later edition groups countries into broader regions."
    ],
    "repair": "real-defra-after.jpg",
    "repairLabel": "Later published design, 2012 data, not the same observations"
  }
];
const polishedGoodCards = [
  {
    "phase": 1,
    "title": "A ranking you can read immediately",
    "description": "Four conditions each have one colony count. Horizontal distance shows count; labels identify the conditions.",
    "question": "Which design choice makes the values easy to compare?",
    "images": [
      "good-ranking.png"
    ],
    "options": [
      "Sorted bars on one scale, with values beside them.",
      "Giving every bar a different bright colour."
    ],
    "correct": 0,
    "feedback": [
      "Yes. A common baseline, ordered rows, and direct values make the comparison quick. The highlighted bar is still part of the same scale.",
      "Many bright colours are unnecessary here. The shared scale, ordering, and labels do the work."
    ],
    "data": "good-ranking.csv"
  },
  {
    "phase": 1,
    "title": "Follow a line without a lookup",
    "description": "Two cultures are measured on days 0–4. The horizontal axis shows days; the vertical axis counts colonies.",
    "question": "What helps you follow each culture?",
    "images": [
      "good-lines.png"
    ],
    "options": [
      "The labels at the line ends and different line styles.",
      "The number of grid lines."
    ],
    "correct": 0,
    "feedback": [
      "Yes. The labels sit beside the lines. Solid and dashed styles also distinguish the series without relying only on colour.",
      "The light grid helps estimate values, but end labels and line styles identify the series."
    ],
    "data": "good-lines.csv"
  },
  {
    "phase": 1,
    "title": "A clear before-and-after comparison",
    "description": "Four water samples are measured before and after filtering. Rows identify samples; horizontal position shows concentration in milligrams per litre.",
    "question": "What does each connecting segment represent?",
    "images": [
      "good-pairs.png"
    ],
    "options": [
      "A separate time series with many observations.",
      "Two measurements of the same sample."
    ],
    "correct": 1,
    "feedback": [
      "There are only two measurements per sample. Each segment connects its before and after values.",
      "Yes. Each row keeps the two measurements together. The horizontal separation shows the size of the change."
    ],
    "data": "good-pairs.csv"
  },
  {
    "phase": 1,
    "title": "A simple whole",
    "description": "A quality check gives each of 100 samples one result: passed or failed. The horizontal scale runs from 0% to 100%.",
    "question": "Why is the part-to-whole comparison easy to read?",
    "images": [
      "good-whole.png"
    ],
    "options": [
      "The denominator, category labels, and percentages are explicit.",
      "Every part-to-whole chart must use bars."
    ],
    "correct": 0,
    "feedback": [
      "Yes. You know the whole is 100 samples and can identify both parts without a legend.",
      "A two-slice pie could also work here. Clear labels and an explicit whole matter more than banning a chart type."
    ]
  },
  {
    "phase": 1,
    "title": "Show the direction of change",
    "description": "Five samples have before-and-after measurements. The horizontal axis identifies samples; the vertical axis gives after minus before in milligrams per litre.",
    "question": "Which samples have lower concentrations afterwards?",
    "images": [
      "good-changes.png"
    ],
    "options": [
      "S4 and S5.",
      "S1 and S2."
    ],
    "correct": 1,
    "feedback": [
      "S4 and S5 are above zero, so their concentrations increased.",
      "Yes. S1 and S2 fall below the zero reference. Position shows the direction even without the colours."
    ],
    "data": "good-changes.csv"
  },
  {
    "phase": 1,
    "title": "A small layout that stays readable",
    "description": "Three cultures are measured over five days. Each panel shows day horizontally and colony count vertically.",
    "question": "Which culture has the most colonies on day 4?",
    "images": [
      "good-panels.png"
    ],
    "options": [
      "Culture A.",
      "Culture C."
    ],
    "correct": 0,
    "feedback": [
      "Yes: A has 10, B has 4, and C has 5. Shared axes let you compare the panels directly.",
      "C peaks earlier, but ends at 5. A ends at 10. Shared axes separate timing from final count."
    ],
    "data": "good-panels.csv"
  }
];
const additionalMistakes = [
  {
    "phase": 0,
    "title": "Where did the decreases go?",
    "description": "Five changes in concentration are −6, −3, 0, +4, and +8 mg/L. The horizontal axis identifies samples; the vertical axis should show after minus before.",
    "question": "What is missing from this display?",
    "images": [
      "negative-first.png"
    ],
    "options": [
      "The negative part of the scale.",
      "A separate colour for every sample."
    ],
    "correct": 0,
    "feedback": [
      "Yes. The axis excludes the negative observations. Extend it below zero so decreases and increases are both visible.",
      "More colours would not restore the values clipped below the displayed range."
    ],
    "repair": "good-changes.png",
    "data": "good-changes.csv"
  },
  {
    "phase": 0,
    "title": "Ten measurements, two visible dots?",
    "description": "Ten measurements have concentrations of either 8 or 12 mg/L. The vertical axis shows concentration; all observations belong to one group.",
    "question": "Why are only two dots visible?",
    "images": [
      "overlap-points-first.png"
    ],
    "options": [
      "The matching values lie on top of each other.",
      "Eight measurements must have been deleted."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Five observations share each value. Spreading points horizontally makes them countable without changing their vertical values.",
      "The observations are present but overlap exactly. Separate them slightly horizontally to show all ten."
    ],
    "repair": "overlap-points-fixed.png",
    "data": "overlap-points.csv"
  },
  {
    "phase": 0,
    "title": "Can you see the data through the grid?",
    "description": "Five observations track colony counts over days 0–4. The horizontal axis shows days; the vertical axis counts colonies.",
    "question": "What would make the trend easier to see?",
    "images": [
      "grid-first.png"
    ],
    "options": [
      "Add more vertical grid lines.",
      "Use fewer, lighter reference lines."
    ],
    "correct": 1,
    "feedback": [
      "More grid lines would compete even more with the observations.",
      "Yes. Light, widely spaced reference lines support reading values while keeping the data visible."
    ],
    "repair": "grid-fixed.png",
    "data": "good-lines.csv"
  }
];
sources.onsPopulation = {label:'Office for National Statistics, Census 2011 and 2021; service manual example',url:'https://service-manual.ons.gov.uk/data-visualisation/guidance/principles',credit:'Source: Office for National Statistics. Contains public sector information licensed under the Open Government Licence v3.0. Browser snapshots of the original interactive figures, 20 October 2026.',license:'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'};
realCards.push({
  "phase": 4,
  "title": "Show the comparison the reader needs",
  "description": "These published figures compare populations of English regions in 2011 and 2021. In the first, horizontal bar length shows population in millions; each region has two bars.",
  "question": "To compare percentage growth, what would help?",
  "images": [
    "real-ons-population-before.png"
  ],
  "options": [
    "Plot the percentage change for each region directly.",
    "Make the two bars the same colour."
  ],
  "correct": 0,
  "feedback": [
    "Yes. The second figure directly plots percentage growth. This is a change in the question being displayed, not evidence that the original population counts are wrong.",
    "Changing colour would not remove the need to calculate growth. Plotting percentage change makes that comparison explicit."
  ],
  "source": "onsPopulation",
  "repair": "real-ons-population-after.png",
  "repairLabel": "Published alternative: percentage growth, 2011–2021"
});
// Keep the student sequence focused on interpretation rather than obvious errors.
// Earlier source examples remain available for reuse but are not in the game.
const retainedDiagnostics = new Set([
  'How big is the improvement?', 'Can these slices form one whole?',
  'Is B twice as much?', 'Which lab has the higher rate?',
  'What happened on day 3?', 'Ten measurements, two visible dots?'
]);
const retainedGoodExamples = new Set([
  'A ranking you can read immediately', 'Follow a line without a lookup',
  'A clear before-and-after comparison', 'A small layout that stays readable'
]);
const diagnostics = [originalCards[0], originalCards[1], ...easyCards, ...moreEasyCards, ...additionalMistakes].filter(c => retainedDiagnostics.has(c.title));
const goodExamples = polishedGoodCards.filter(c => retainedGoodExamples.has(c.title));
const revisions = {
  'A ranking you can read immediately': {
    question: 'For a quick ranking, which choice helps most?',
    options: ['Ordering the bars by count.', 'Keeping the conditions in dose order.'],
    correct: 0,
    feedback: ['Yes. Ordering by count makes the rank visible immediately. Dose order would be useful for a different question: how counts change with dose.', 'Dose order helps examine a dose-response pattern. For the stated task, ranking the counts, ordering by value is more direct.']
  },
  'Follow a line without a lookup': {
    question: 'Why are end labels useful for these two lines?',
    options: ['They identify the series where the reader is already looking.', 'A separate legend always identifies lines faster.'],
    correct: 0,
    feedback: ['Yes. Two well-separated line ends leave room for labels and avoid looking back and forth to a legend. With many overlapping lines, this approach may become crowded.', 'A legend can work, but requires matching its entries to the lines. Here there is room to place each name beside its line.']
  },
  'A clear before-and-after comparison': {
    question: 'What can this layout show that two group averages would hide?',
    options: ['Which sample changed most.', 'Whether filtering caused the change.'],
    correct: 0,
    feedback: ['Yes. Each connection preserves a sample’s change: sample 1 decreases by 4 mg/L and the others by 6 mg/L. Two group means would hide that variation.', 'Pairing shows changes within samples, but the plot alone cannot establish their cause. It does let you compare the size of each sample’s change.']
  },
  'A small layout that stays readable': {
    question: 'Why keep the same vertical scale in all three panels?',
    options: ['To compare counts across cultures directly.', 'To make every culture’s variation fill its panel.'],
    correct: 0,
    feedback: ['Yes. The same height means the same count in every panel. This supports comparison across cultures.', 'Separate scales could magnify each culture’s internal variation, but then equal heights would represent different counts. That would make cross-culture comparison harder.']
  }
};
for (const c of goodExamples) Object.assign(c, revisions[c.title]);
sources.superplots = {label:'Further reading: Lord et al., Journal of Cell Biology (2020), SuperPlots',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7265319/'};
sources.errorbars = {label:'Further reading: Krzywinski and Altman, Nature Methods (2013), Error bars',url:'https://www.nature.com/articles/nmeth.2659'};
// Original illustrations of published guidance, not figures or measurements copied from these papers.
const biologyCards = [
  {
    "phase": 2,
    "title": "Twelve cells or three mice?",
    "description": "Four cells were measured from each of three independently treated mice. Horizontal position identifies the group; the vertical axis shows fluorescence in arbitrary units. Both versions show the same twelve cells.",
    "question": "Which version lets you distinguish variation within a mouse from differences between mice?",
    "images": [
      "biology-replicates-a.png",
      "biology-replicates-b.png"
    ],
    "options": [
      "Choose A",
      "Choose B"
    ],
    "correct": 1,
    "feedback": [
      "A shows the cell measurements but hides which mouse each cell came from. The twelve cells are not twelve independently treated animals.",
      "B uses colour and shape to identify each mouse. You can see both the variation among its cells and differences between mice; there are three biological replicates."
    ],
    "source": "superplots",
    "data": "cell-replicates.csv"
  },
  {
    "phase": 2,
    "title": "What do the error bars describe?",
    "description": "Protein abundance was measured in six independent cultures. The vertical axis shows abundance in arbitrary units; each dot is the mean. A uses standard error of the mean, and B uses standard deviation.",
    "question": "Which version describes the spread of measurements among the cultures?",
    "images": [
      "biology-errors-a.png",
      "biology-errors-b.png"
    ],
    "options": [
      "Choose A",
      "Choose B"
    ],
    "correct": 1,
    "feedback": [
      "A shows mean ± standard error (SEM): use it to describe the precision of the estimated population mean, not the variability between cultures. SEM = SD / √n, so it tends to shrink with more independent cultures even if their variability stays similar. Mean ± SEM is not a 95% confidence interval.",
      "B shows mean ± standard deviation (SD): use it to describe how much individual cultures vary around the mean. Here the mean is 10, SD is about 2.83, and SEM is about 1.15. The smaller SEM in A does not mean the cultures are more alike. For uncertainty about the population mean, a clearly labelled 95% confidence interval is often easier to interpret than ± SEM."
    ],
    "source": "errorbars",
    "repair": "biology-errors-raw.png",
    "repairLabel": "Another option: show all six measurements",
    "repairNote": "With only six cultures, show the raw values: 6, 8, 10, 10, 12, and 14. Horizontal jitter separates the two dots at 10 without changing their measured values. The line marks the mean. This reveals sample size, spread, and repeated values directly. Add a labelled SD or confidence interval only if it supports the question; dots alone do not quantify uncertainty in the population mean.",
    "data": "error-bars.csv"
  }
];
// Biology replacements use original teaching data; no external chart is relabelled.
const bacterialComparison = {
  "phase": 3,
  "title": "Did one species overtake the other?",
  "description": "Two bacterial populations were counted hourly. The horizontal axes show hours; both populations are measured in cells per millilitre. A uses separate left and right scales; B uses one shared scale.",
  "question": "Which view supports comparing the absolute cell counts?",
  "images": [
    "biology-dual-a.png",
    "biology-dual-b.png"
  ],
  "options": [
    "Choose A",
    "Choose B"
  ],
  "correct": 1,
  "feedback": [
    "The two scales in A can make the lines cross even when the counts never do. Read each series on its own axis; their visual intersection does not mean equal abundance.",
    "B uses one scale, so equal height means equal cells per millilitre. Species A stays more abundant. B’s small changes are harder to see; separate labelled panels could help if those changes were the question."
  ],
  "data": "bacterial-counts.csv"
};
const biologyDesignCases = [
  {
    "phase": 4,
    "title": "How many cells express each marker?",
    "description": "The same 100 cells were tested for three markers. A cell may express several markers. Labels show the percentage positive for each marker; B uses a horizontal percentage scale.",
    "question": "Which view represents the marker frequencies appropriately?",
    "images": [
      "biology-markers-a.png",
      "biology-markers-b.png"
    ],
    "options": [
      "Choose A",
      "Choose B"
    ],
    "correct": 1,
    "feedback": [
      "A pie implies mutually exclusive parts of one whole. Marker-positive categories overlap, so they should not be forced into a single circle.",
      "Separate bars preserve each marker’s percentage of the same 100 cells. Their percentages need not sum to 100%."
    ],
    "data": "cell-markers.csv"
  },
  {
    "phase": 4,
    "title": "Compare the smaller microbial groups",
    "description": "Sequencing reads from one microbiome sample were assigned to ten mutually exclusive taxa. Both plots show each taxon’s percentage of assigned reads. In B, horizontal distance represents that percentage.",
    "question": "Which view makes it easier to compare taxa D, E, and F?",
    "images": [
      "biology-taxa-a.png",
      "biology-taxa-b.png"
    ],
    "options": [
      "Choose A",
      "Choose B"
    ],
    "correct": 1,
    "feedback": [
      "The pie is a valid composition, but comparing similar slice angles requires more effort. It can still work for a broad part-to-whole message.",
      "The bars share a baseline and are ordered by abundance, making 10%, 8%, and 7% easy to compare. These are read proportions, not necessarily cell proportions."
    ],
    "data": "microbial-composition.csv"
  },
  {
    "phase": 4,
    "title": "Which cell line grew fastest relative to its start?",
    "description": "Three cell lines were counted before and after the same culture interval. A shows both cell counts; B calculates the percentage increase from each line’s starting count.",
    "question": "Which view answers the relative-growth question most directly?",
    "images": [
      "biology-growth-a.png",
      "biology-growth-b.png"
    ],
    "options": [
      "Choose A",
      "Choose B"
    ],
    "correct": 1,
    "feedback": [
      "A is useful for comparing actual cell numbers. But different starting counts mean that the largest final count need not have the largest proportional increase.",
      "B shows proportional growth directly: A increases 100%, B 50%, and C 20%. It is better for this question; the original counts are still needed to understand the scale of each culture."
    ],
    "data": "cell-growth.csv"
  }
];
const cytokineComparison = {
  "phase": 1,
  "title": "Compare changes within each donor",
  "description": "Cytokine concentrations were measured in four donors before and after stimulation. A shows the two group means; B connects each donor’s measurements on a horizontal concentration scale in nanograms per millilitre.",
  "question": "Which view lets you compare the change for each donor?",
  "images": [
    "biology-cytokines-a.png",
    "biology-cytokines-b.png"
  ],
  "options": [
    "Choose A",
    "Choose B"
  ],
  "correct": 1,
  "feedback": [
    "The two means summarize the group but lose individual donor changes. A difference between averages does not describe every donor.",
    "B keeps each donor’s pair together. You can compare individual changes while still seeing the original concentrations. This display alone does not establish what caused the change."
  ],
  "data": "cytokine-pairs.csv"
};
const biologyGoodExamples = goodExamples.map(c => c.title === 'A clear before-and-after comparison' ? cytokineComparison : c);
const biologyOptional = optionalCards.map(c => c.title === 'Did Gold overtake Blue?' ? bacterialComparison : c);
// Replace the simple duplicate-dot case with a guided same-data scatterplot.
const scatterIndex = diagnostics.findIndex(c => c.title === 'Ten measurements, two visible dots?');
diagnostics[scatterIndex] = {
  phase: 0,
  title: 'What is hidden in this cloud of cells?',
  description: 'Each point is one of 1,600 cells. The axes show protein A and protein B fluorescence in arbitrary units (a.u.). All versions use the same cells, coordinates, and axis limits.',
  question: 'Can we tell where most cells are concentrated?',
  images: ['scatter-step-1.png'],
  options: ['Yes: every filled area contains about the same number of cells.', 'Not reliably: points cover other points.'],
  correct: 1,
  feedback: [
    'A solid patch can hide very different numbers of cells. Let’s change the display one step at a time.',
    'Exactly. The overall relationship is visible, but opaque points conceal differences in density. Let’s improve it step by step.'
  ],
  data: 'scatter-cells.csv',
  steps: [
    {image:'scatter-step-1.png', title:'Start: large, opaque points', text:'The relationship is visible, but dense areas merge into a solid patch. Where might the largest concentration of cells be?'},
    {image:'scatter-step-2.png', title:'Smaller points', text:'Less ink reveals gaps and individual cells near the edges. The crowded centre is still difficult to read.'},
    {image:'scatter-step-3.png', title:'Lower opacity (alpha = 0.15)', text:'Keep the smaller points and make them transparent. Overlap now appears darker, revealing concentrations. Very dense regions can still saturate; darkness is not an exact cell count.'},
    {image:'scatter-step-4.png', title:'An alternative: hollow points', text:'Draw only the borders, at full opacity. Empty centres make some overlaps easier to see, but many outlines can still become cluttered. Compare with transparency: hollow points are not automatically better.'},
    {image:'scatter-step-5.png', title:'Transparent points + distributions', text:'Return to transparent points and add histograms. The top shows the distribution of protein A; the right shows protein B. Bar length counts cells. These help read each protein separately; the scatterplot is still needed to see how the two relate.'}
  ]
};

const guidedExamples = [
  {
    "phase": 0,
    "title": "Do similar averages mean similar cells?",
    "description": "Reporter signal was measured in 80 cells per condition. The horizontal axis shows conditions A and B; the vertical axis shows signal in arbitrary units (a.u.).",
    "question": "What can these averages tell us about the cells?",
    "images": [
      "distribution-step-1.png"
    ],
    "options": [
      "The two conditions have similar distributions.",
      "The averages are similar, but the distributions may differ."
    ],
    "correct": 1,
    "feedback": [
      "A mean does not describe the shape of a distribution. Let’s reveal more of the measurements.",
      "Exactly. We need to look beyond the mean to see how signals vary among cells."
    ],
    "data": "walkthrough-distribution.csv",
    "steps": [
      {
        "image": "distribution-step-1.png",
        "title": "Start: two means",
        "text": "Both averages are 10. The bars tell us nothing about the spread or shape of the cell-level measurements."
      },
      {
        "image": "distribution-step-2.png",
        "title": "Show spread with box plots",
        "text": "The box spans the middle 50% of values; the line is the median. Whiskers extend to observations within 1.5 interquartile ranges. B is more spread out, but its internal shape remains hidden."
      },
      {
        "image": "distribution-step-3.png",
        "title": "Show shape with violins",
        "text": "Width shows estimated density at each signal level. B has two concentrations of values. Both violins use the same smoothing bandwidth and width rule; changing the smoothing can change the apparent shape."
      },
      {
        "image": "distribution-step-4.png",
        "title": "Keep the individual cells visible",
        "text": "Add dots and a median line. Horizontal jitter separates points without changing signal values. The dots let us check the smoothed outline. With only a few observations, dots alone would be preferable."
      }
    ]
  },
  {
    "phase": 0,
    "title": "Did every donor improve?",
    "description": "Cytokine concentration was measured before and after treatment in the same eight donors. Lower concentration is the response of interest. The vertical axis shows ng/mL.",
    "question": "Does the lower after-treatment mean show a decrease in every donor?",
    "images": [
      "paired-step-1.png"
    ],
    "options": [
      "Yes: the average describes each donor’s response.",
      "No: individual changes may differ."
    ],
    "correct": 1,
    "feedback": [
      "The average can fall while some donors increase. Let’s look at the individual measurements.",
      "Exactly. Group means hide which donors increased or decreased."
    ],
    "data": "walkthrough-paired.csv",
    "steps": [
      {
        "image": "paired-step-1.png",
        "title": "Start: before and after means",
        "text": "The overall mean is lower after treatment. We cannot see whether everyone changed in the same direction."
      },
      {
        "image": "paired-step-2.png",
        "title": "Show individual measurements",
        "text": "Dots reveal the range of concentrations. We still cannot identify which before and after measurements belong together."
      },
      {
        "image": "paired-step-3.png",
        "title": "Connect each donor",
        "text": "Each line joins measurements from the same donor. Five donors decrease and three increase. The pairing reveals what the separate groups of dots could not."
      },
      {
        "image": "paired-step-4.png",
        "title": "Focus on each donor’s change",
        "text": "Now the horizontal axis is after minus before; rows identify donors. Negative values indicate decreases. This makes the direction and size of each change easy to compare, while the previous view preserves starting levels. Neither view alone establishes a treatment effect without an appropriate study design."
      }
    ]
  },
  {
    "phase": 0,
    "title": "Which genes respond together?",
    "description": "Rows are six genes; columns are three control and three treated samples. Values are log2 fold changes relative to a common reference: zero means no change. Every version uses the same values and colour limits (−3 to +3).",
    "question": "What would make the response patterns easier to compare?",
    "images": [
      "heatmap-step-1.png"
    ],
    "options": [
      "Add more colours to distinguish every cell.",
      "Use a meaningful colour scale and organise the samples."
    ],
    "correct": 1,
    "feedback": [
      "More hues do not necessarily make numeric differences easier to read. Let’s improve the scale and organisation.",
      "Yes. Colour should explain direction and size; ordering should support the biological comparison."
    ],
    "data": "walkthrough-heatmap.csv",
    "steps": [
      {
        "image": "heatmap-step-1.png",
        "title": "Start: rainbow colours, mixed order",
        "text": "All measurements and a colour key are present. But it takes effort to relate the colours to direction and compare the interleaved groups."
      },
      {
        "image": "heatmap-step-2.png",
        "title": "Give zero a clear meaning",
        "text": "Use white at zero, blue for negative values, and red for positive values. The symmetric limits are unchanged. A diverging scale suits this meaningful reference point; it is not the default for every heatmap."
      },
      {
        "image": "heatmap-step-3.png",
        "title": "Arrange samples and genes",
        "text": "Group control and treated samples, then place genes with similar responses together. Only the order changes: no values are rescaled. The divider marks the two sample groups. This is a teaching order, not a statistical clustering result."
      },
      {
        "image": "heatmap-step-5.png",
        "title": "An alternative: seven colour bins",
        "text": "Group values into seven labelled colour ranges. This makes broad categories easier to distinguish, but hides differences within each bin and creates sharp visual boundaries. White now means −0.5 to below +0.5, not exactly zero. In the legend, [ includes a boundary and ) excludes it. These cutoffs are teaching choices, not biological thresholds; use bins when ranges matter more than fine differences."
      },
      {
        "image": "heatmap-step-4.png",
        "title": "Add readable values when useful",
        "text": "Return to the continuous colour scale and add exact values. This small matrix has room for numbers. White text on dark cells and black text on light cells keeps them readable. On a much larger heatmap, omit the numbers and let colour show the overall pattern."
      }
    ]
  }
];

const advancedWalkthroughs = [
  {
    "phase": 5,
    "title": "From crowded time courses to a clear comparison",
    "description": "Six independent bacterial cultures per condition were followed at 0, 2, 4, 6, and 8 hours. The vertical axis is optical density at 600 nm (OD600), a proxy for culture turbidity. Each line follows the same culture.",
    "question": "How could we compare control and treatment without losing the individual cultures?",
    "images": [
      "timecourse-step-1.png"
    ],
    "options": [
      "Show the individual cultures and make the comparison clearer.",
      "Replace all measurements with one overall average."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Keep the evidence visible while making the comparison easier to follow.",
      "One overall average would hide both treatment differences and variation between cultures. Let\u2019s retain that information."
    ],
    "data": "advanced-growth.csv",
    "steps": [
      {
        "image": "timecourse-step-1.png",
        "title": "Start: one colour per culture",
        "text": "All twelve trajectories are present, but twelve colours make the treatment comparison difficult. The legend identifies cultures without explaining their conditions."
      },
      {
        "image": "timecourse-step-2.png",
        "title": "Colour by condition",
        "text": "Use one colour for control and one for treatment. The main grouping is now visible, though overlapping lines still compete for attention."
      },
      {
        "image": "timecourse-step-3.png",
        "title": "Make individual traces faint",
        "text": "Reduce opacity so repeated trajectories remain visible without dominating the figure. This is useful context, not a reason to discard unusual cultures."
      },
      {
        "image": "timecourse-step-4.png",
        "title": "Overlay the group means",
        "text": "Thick lines show the mean at each time point. Faint lines preserve individual variation. The mean is a summary; it is not the trajectory of an actual culture."
      },
      {
        "image": "timecourse-step-5.png",
        "title": "Add a clearly defined spread band",
        "text": "The band shows mean \u00b1 one standard deviation across the six independent cultures at each time. It describes between-culture spread, not a confidence interval or a significance test. Repeated time points do not increase the number of independent cultures."
      },
      {
        "image": "timecourse-step-6.png",
        "title": "Separate conditions into aligned panels",
        "text": "Shared time and OD600 limits make panels comparable while reducing overlap. The tradeoff: comparing the two means directly now requires looking between panels. Use the previous combined view when that comparison is the main task."
      },
      {
        "image": "timecourse-step-7.png",
        "title": "Make the figure readable without colour alone",
        "text": "Panel titles, point shapes, and mean-line styles identify conditions as well as colour. The SD caption remains explicit. These are descriptive growth trajectories, not proof of a treatment effect."
      }
    ]
  },
  {
    "phase": 5,
    "title": "Build a publication figure from four plots",
    "description": "The same growth experiment is shown four ways: trajectories, values at 8 hours, starting values, and changes from 0 to 8 hours. There are six independent cultures per condition. OD600 measures culture turbidity.",
    "question": "How can these four views tell one clear story?",
    "images": [
      "publication-step-1.png"
    ],
    "options": [
      "Show the individual cultures and make the comparison clearer.",
      "Replace all measurements with one overall average."
    ],
    "correct": 0,
    "feedback": [
      "Yes. Keep the evidence visible while making the comparison easier to follow.",
      "One overall average would hide both treatment differences and variation between cultures. Let\u2019s retain that information."
    ],
    "data": "advanced-growth.csv",
    "steps": [
      {
        "image": "publication-step-1.png",
        "title": "Start: four plots competing for space",
        "text": "All panels use the same experiment, but uneven placement, inconsistent colours, and repeated legends make the reader work to connect them."
      },
      {
        "image": "publication-step-2.png",
        "title": "Align the panels",
        "text": "Place the plots on a grid with aligned edges. Reading order becomes clearer. Space is still uneven: the narrow right-hand panels are harder to read."
      },
      {
        "image": "publication-step-3.png",
        "title": "Use consistent visual meanings",
        "text": "Control is always blue with circles; treatment is orange with triangles in the dot plots. Line styles distinguish the mean trajectories. Keep measurement names consistent. The baseline panel still has a narrower axis here. We will revisit that choice when comparing magnitudes across panels."
      },
      {
        "image": "publication-step-4.png",
        "title": "Remove repeated legends",
        "text": "Keep the line legend where it is needed. The dot panels already name the conditions on the horizontal axis, so their extra legends add clutter rather than information."
      },
      {
        "image": "publication-step-5.png",
        "title": "Give each view enough room",
        "text": "Use balanced panel sizes so the endpoint and change plots have readable labels and visible dots. Equal space works here; a more complex or important panel could deserve more room in a different figure."
      },
      {
        "image": "publication-step-6.png",
        "title": "Add panel letters and a useful caption",
        "text": "Letters let the caption refer precisely to each view. Caption: A, individual culture trajectories (faint) and group means (thick). B, OD600 at 8 hours. C, baseline OD600. D, within-culture change from 0 to 8 hours. Each dot is one culture; horizontal marks show means. Six independent cultures per condition; no inferential error bars are shown."
      },
      {
        "image": "publication-step-7.png",
        "title": "Make magnitudes comparable",
        "text": "Use 0–1.2 for all vertical axes. B and C now show final and starting OD600 on the same scale, so the small baseline differences are not visually exaggerated. D uses the same numerical range but measures change, not an absolute level. A narrower baseline scale could help inspect small starting differences, but would need an explicit warning when comparing panels."
      },
      {
        "image": "publication-step-8.png",
        "title": "Give the main result more space",
        "text": "Make A full width: twelve trajectories need room. Place the simpler B, C, and D dot plots in a compact row below. Keep their 0–1.2 axes and clear labels. This hierarchy gives the main result more attention without removing supporting evidence. The small baseline spread is now honestly small on the shared scale. Check that labels and individual points remain readable at the intended publication size."
      }
    ]
  }
];

advancedWalkthroughs.push({
  "phase": 5,
  "title": "What should stand out first?",
  "description": "Forty-eight independent bacterial cultures were assayed on four consecutive experimental days: six per condition per day. Each assay lasts eight hours; different cultures are used on each day. The horizontal axis shows starting OD600; the vertical axis shows OD600 at 8 hours. The main question is how control and treatment compare. Every version uses the same measurements.",
  "question": "Does the initial colour choice support the main comparison?",
  "images": [
    "emphasis-step-1.png"
  ],
  "options": [
    "Yes: the brightest grouping must be the most important one.",
    "Not well: colour emphasises experimental day rather than condition."
  ],
  "correct": 1,
  "feedback": [
    "Visual emphasis is a design choice, not evidence of importance. Let’s match the encoding to the question.",
    "Exactly. The plot is not numerically wrong, but its visual emphasis works against the stated question."
  ],
  "data": "visual-emphasis.csv",
  "steps": [
    {
      "image": "emphasis-step-1.png",
      "title": "Start: colour draws attention to the experimental day",
      "text": "Bright colours separate days, while small shape differences carry the treatment comparison. This is a poor match for our question: how do control and treated cultures compare? It could be appropriate if day-to-day differences were the primary question. Colour does not always dominate: size, position, contrast, and surrounding marks also affect attention."
    },
    {
      "image": "emphasis-step-2.png",
      "title": "Give colour to the main comparison",
      "text": "Use distinct colours for control and treatment. Group membership becomes easier to follow. All cultures remain, but day identity is temporarily absent: simplification should not quietly remove information that matters."
    },
    {
      "image": "emphasis-step-3.png",
      "title": "Emphasise progression: light to dark for days 1–4",
      "text": "Now ask how measurements evolve across consecutive experimental days. Encode day with a light-to-dark sequential scale: later days are darker. Circles and triangles identify control and treatment. Colour communicates temporal order; four unrelated shapes would not. Only four days were observed, and different cultures were used each day, so this is a change across groups rather than individual trajectories."
    },
    {
      "image": "emphasis-step-4.png",
      "title": "Highlight one group when the question calls for it",
      "text": "For a different question, treatment versus a reference, make treatment coloured and control grey, with shape reinforcing condition. Day is intentionally not encoded in this version, so it is unsuitable for studying progression. Keep day colour or the time-axis view when evolution is the main message. Emphasis should follow the question."
    },
    {
      "image": "emphasis-step-5.png",
      "title": "An alternative: panels plus redundant colour and shape",
      "text": "Put days 1–4 in ordered panels with identical axes. Colour and shape both identify condition, making within-day comparisons easy. Looking between panels takes more effort to follow progression; the next version arranges all four days in one reading direction."
    },
    {
      "image": "emphasis-step-8.png",
      "title": "Put time in one reading direction",
      "text": "Arrange days 1–4 from left to right in a single row. Identical y-axis limits and aligned reference lines make changes easier to compare without jumping between rows. Show the y-axis labels only on the first panel, and use shared axis titles and one legend. The tradeoff is narrower panels: use this wide layout when there is enough display space; the previous 2×2 layout keeps points larger on a narrow screen."
    },
    {
      "image": "emphasis-step-7.png",
      "title": "Make evolution explicit: day on the x-axis",
      "text": "Put day on the horizontal axis and connect the mean for each condition. Faint dots retain all six independent cultures per condition per day; horizontal jitter only separates them. These lines describe changes in group averages, not trajectories of individual cultures. Starting OD600 is no longer displayed, so keep the previous scatterplots if that relationship matters. To connect individual dots, we would need the same culture measured repeatedly and a reliable culture ID. The paired-measurements walkthrough shows that situation."
    }
  ]
});

advancedWalkthroughs.push({
  "phase": 5,
  "title": "Order samples to reveal taxon profiles",
  "description": "Twelve soil samples contain sequencing reads assigned to eight taxa. Six samples are bulk soil and six are root-associated. Stacked colours identify taxa; each bar is one sample. Sequencing depth varies. All versions use the same count table.",
  "question": "How could we compare sample profiles without confusing sequencing depth with composition?",
  "images": [
    "abundance-step-1.png"
  ],
  "options": [
    "Compare proportions, then choose an ordering that fits the biological question.",
    "Treat the tallest bar as the sample with the most bacteria."
  ],
  "correct": 0,
  "feedback": [
    "Yes. Normalisation and sample ordering answer different questions. We will change them separately.",
    "Read depth can depend on sequencing effort. These counts do not measure absolute bacterial abundance."
  ],
  "data": "abundance-profiles.csv",
  "steps": [
    {
      "image": "abundance-step-1.png",
      "title": "Start: unordered read counts",
      "text": "Each stacked bar is a sample; colours identify eight taxa. Total sequencing depth varies from 2,500 to 12,000 reads. Taller bars do not establish more bacteria: sequencing counts are not absolute organism abundance."
    },
    {
      "image": "abundance-step-2.png",
      "title": "Compare relative profiles",
      "text": "Divide each sample by its total reads so every bar sums to 100%. This makes composition comparable while discarding total read depth. A taxon can gain percentage because another taxon decreases; relative abundance is not an absolute cell count."
    },
    {
      "image": "abundance-step-3.png",
      "title": "Add sample metadata before sorting",
      "text": "The top strip identifies bulk soil (B) and root-associated samples (R). Keep taxon colours unchanged: the strip carries sample context. The arbitrary sample order still makes within-group patterns hard to compare."
    },
    {
      "image": "abundance-step-4.png",
      "title": "Order by metadata",
      "text": "Place samples from the same compartment together, then order by sample ID. This directly supports the known biological comparison. Samples within each group are not yet arranged by composition."
    },
    {
      "image": "abundance-step-5.png",
      "title": "Order by Bray\u2013Curtis similarity",
      "text": "Calculate Bray\u2013Curtis dissimilarity from all eight relative taxon abundances, then use average-linkage hierarchical clustering. Nearby leaves tend to have similar profiles; branch height gives the dissimilarity at a merge. The metadata strip shows whether composition agrees with compartment labels. Leaf order is not unique, and clusters are not proof of biological groups."
    },
    {
      "image": "abundance-step-6.png",
      "title": "Cluster within each metadata group",
      "text": "Keep bulk soil and root-associated samples in separate blocks, but order samples within each block by Bray\u2013Curtis clustering. This balances biological context with profile similarity. It deliberately prevents similar samples in different compartments from becoming neighbours; no single global dendrogram describes this constrained order."
    },
    {
      "image": "abundance-step-7.png",
      "title": "Alternative: a heatmap for taxon-by-taxon comparison",
      "text": "Use the global similarity order again. Rows are taxa and columns are samples, with one shared 0\u201360% colour scale. This makes each taxon easier to follow across samples than the shifting middle segments of stacked bars. No row standardisation is applied. Stacked bars communicate the whole composition more directly; the heatmap supports comparisons of individual taxa."
    }
  ]
});

sources.hmp = {
  label: 'Human Microbiome Project Consortium · Nature · 2012 · Figure 2',
  url: 'https://www.nature.com/articles/nature11234/figures/2',
  credit: 'Human Microbiome Project Consortium, Structure, function and diversity of the healthy human microbiome, Nature 486, 207–214 (2012), doi:10.1038/nature11234. User-supplied image, unchanged. <a href="https://pubmed.ncbi.nlm.nih.gov/22699609/" target="_blank" rel="noopener">Original figure caption via PubMed</a>.'
};

advancedWalkthroughs.push({
  "phase": 5,
  "title": "Published example: the Human Microbiome Project",
  "description": "Each narrow bar is a microbiome sample, grouped horizontally by seven body sites. Stacked heights represent relative abundance: panel a shows microbial phyla; panel b shows metabolic pathways. Colours have separate meanings in the two panels. RC means retroauricular crease, the skin behind the ear. This is a comparison of samples, not a time series.",
  "question": "What does grouping by body site and aligning the panels make easier to compare?",
  "images": [
    "hmp-2012-figure2.png"
  ],
  "options": [
    "Taxonomic composition and functional profiles across the same body-site groups.",
    "How one person’s microbiome changed over time.",
    "Absolute numbers of microbes in each sample."
  ],
  "correct": 0,
  "feedback": [
    "Yes. The paper reports greater variation in taxonomic composition than in pathway profiles. Grouping by body site helps read the broad pattern despite the dense display. The caption does not identify the within-site ordering as Bray–Curtis clustering.",
    "The horizontal direction compares samples grouped by body site; it does not represent elapsed time.",
    "These are relative profiles, not absolute microbial counts. Equal-height stacks conceal differences in total abundance."
  ],
  "source": "hmp"
});

sources.design = {label:'Office for National Statistics · Chart elements and decoration',url:'https://service-manual.ons.gov.uk/data-visualisation/build-specifications/chart-elements'};
sources.designcolors = {label:'Datawrapper · What to consider when choosing colours',url:'https://www.datawrapper.de/blog/colors'};
advancedWalkthroughs.push(...[
  {
    "phase": 5,
    "title": "Function over decoration: does the gradient help?",
    "description": "Colony counts from one plate per condition. Bar height gives the count; the gradient inside every bar encodes no additional measurement. This example asks how easily the counts can be compared.",
    "question": "Does the colour gradient help answer the question?",
    "images": [
      "decoration-step-1.png"
    ],
    "options": [
      "Yes: darker areas must represent a second measurement.",
      "No: height already encodes the count; the gradient adds no data."
    ],
    "correct": 1,
    "feedback": [
      "There is no second measurement encoded here. Decoration can invite a meaning that the data do not support.",
      "Exactly. The counts are correct, but the shading competes with the bar endpoints we need to compare."
    ],
    "data": "decorative-bars.csv",
    "source": "design",
    "steps": [
      {
        "image": "decoration-step-1.png",
        "title": "Start: decorative gradient and heavy grid",
        "text": "Each bar repeats the same dark-to-light gradient regardless of its value. It adds apparent depth but no useful comparison. Strong grid lines also compete with the data. This is a design mismatch, not an arithmetic error."
      },
      {
        "image": "decoration-step-2.png",
        "title": "Use a flat fill and quieter reference lines",
        "text": "A single fill makes the endpoints easier to read. Light grid lines still support comparison. Gradients are useful when they encode a defined continuous quantity, as in a heatmap, not simply because they look elaborate."
      },
      {
        "image": "decoration-step-3.png",
        "title": "Add emphasis only for a stated question",
        "text": "If the task is “What was the count at high dose?”, highlight that bar and label its value. For an even-handed comparison of all conditions, the previous version is better. One plate per condition does not establish treatment efficacy; styling cannot supply replication."
      }
    ]
  },
  {
    "phase": 5,
    "title": "Function over decoration: too many encodings?",
    "description": "Forty-eight independent cultures have starting and final OD600, condition, experimental day, and inoculum volume recorded. The initial question is how the two conditions compare at similar starting OD600. Point area encodes inoculum volume, colour condition, and shape day.",
    "question": "Does showing every recorded variable make this comparison easier?",
    "images": [
      "overload-step-1.png"
    ],
    "options": [
      "Not necessarily: extra encodings compete with the main question.",
      "Yes: every available variable should always be visible."
    ],
    "correct": 0,
    "feedback": [
      "Yes. A mapping can be technically valid but unnecessary for the current task. Keep the measurements; choose which to emphasise.",
      "More variables do not guarantee more insight. Readers need a clear question and an interpretable mapping."
    ],
    "data": "encoding-overload.csv",
    "source": "designcolors",
    "steps": [
      {
        "image": "overload-step-1.png",
        "title": "Start: five variables at once",
        "text": "Positions, colours, four shapes, and bubble areas all encode real columns in this teaching table. Large bubbles attract attention and cover nearby points. That emphasis does not mean those cultures are more informative."
      },
      {
        "image": "overload-step-2.png",
        "title": "Use equal point sizes for the main comparison",
        "text": "Keep position and condition, using colour and shape together. Removing size and day encoding reduces decoding effort. This view cannot assess day or volume effects; the columns remain in the data, and possible confounders still need analysis."
      },
      {
        "image": "emphasis-step-5.png",
        "title": "Give relevant context its own panels",
        "text": "If experimental day matters, separate days on shared scales. Each panel now has only two condition symbols. This adds information in a structured way instead of putting every variable into the same point."
      },
      {
        "image": "overload-step-3.png",
        "title": "Ask a separate question about volume",
        "text": "If inoculum volume is relevant, put it on an axis and ask how it relates to final OD600. Position supports more precise comparisons than bubble area. Starting OD600 and day are absent here, so this is an exploratory view, not an adjusted estimate of a volume effect."
      }
    ]
  }
]);

advancedWalkthroughs.push({
  "phase": 5,
  "title": "Function over decoration: does 3D help?",
  "description": "One sample contains 100 classified cells: 40 T cells, 35 B cells, and 25 monocytes. Each cell belongs to exactly one category. All three versions show these same counts.",
  "question": "Does the added depth make the proportions easier to compare?",
  "images": [
    "perspective-step-1.png"
  ],
  "options": [
    "Yes: the visible front surface represents additional cells.",
    "No: depth adds visual area without adding data."
  ],
  "correct": 1,
  "feedback": [
    "The front wall is decoration, not another measurement. Counting its visible area would exaggerate the foreground slices.",
    "Exactly. The labels are correct, but perspective and visible sidewalls compete with the proportions we want to read."
  ],
  "data": "perspective-composition.csv",
  "source": "design",
  "steps": [
    {
      "image": "perspective-step-1.png",
      "title": "Start: a tilted 3D pie",
      "text": "The foreground slice gains a large visible sidewall, while tilt changes apparent angles. The 35% slice can attract more attention than the 40% slice. Depth encodes nothing in this dataset; it makes the reader rely more heavily on the labels."
    },
    {
      "image": "perspective-step-2.png",
      "title": "Remove the decorative dimension",
      "text": "A flat pie removes the sidewalls and perspective. The same three proportions now form a clear whole. With a few mutually exclusive categories this can work, although comparing close slice sizes still takes effort."
    },
    {
      "image": "perspective-step-3.png",
      "title": "For precise comparison, use aligned bars",
      "text": "Bars share a zero baseline, making the five-percentage-point difference between T and B cells easier to see. Colours and values stay unchanged. Use the pie for a broad part-to-whole message; use bars when comparing the category values is the main task."
    }
  ]
});

advancedWalkthroughs.push({
  "phase": 5,
  "title": "Function over decoration: 3D bars",
  "description": "Colony counts from one plate per condition: control, low dose, medium dose, and high dose. Bar height encodes count. In the first version, bars are staggered in decorative depth; depth represents no measured variable.",
  "question": "Can the screen positions of the bar tops be compared directly?",
  "images": [
    "perspective-bars-1.png"
  ],
  "options": [
    "Yes: nearly level tops mean nearly equal counts.",
    "No: depth shifts both the baselines and the bar tops."
  ],
  "correct": 1,
  "feedback": [
    "The tops look nearly aligned because perspective shifts the bars upward with depth. Their counts are different.",
    "Exactly. A top\u2019s screen position mixes count with decorative depth. A shared 2D baseline removes that ambiguity."
  ],
  "data": "perspective-bars.csv",
  "source": "design",
  "steps": [
    {
      "image": "perspective-bars-1.png",
      "title": "Start: perspective competes with height",
      "text": "The bars contain 42, 38, 35, and 31 colonies. Depth shifts the later bars upward, making their tops appear almost level. Readers must trace each bar to its own baseline; the top and side faces add no measurement."
    },
    {
      "image": "perspective-bars-2.png",
      "title": "Use a shared baseline in 2D",
      "text": "The same counts and colour, with all bars starting at zero. Now both length and top position support the comparison: counts decrease from 42 to 31. Removing depth makes the values easier to read without changing them. One plate per condition still does not provide evidence about reproducibility or treatment efficacy."
    }
  ]
});

advancedWalkthroughs.push({
  "phase": 5,
  "title": "When overlapping circles stop helping",
  "description": "Four gene lists come from stress, heat, salt, and oxidative-response comparisons. Numbers count exact membership combinations: a gene in three lists belongs only to that three-list region. Only genes in at least one list are shown. Both displays use the same memberships and counts.",
  "question": "How easy is it to find the largest intersection involving more than one list?",
  "images": [
    "overlap-complex.png"
  ],
  "options": [
    "The circle areas let us rank the counts directly.",
    "We must trace the regions and compare their printed counts."
  ],
  "correct": 1,
  "feedback": [
    "The areas are not proportional to gene counts. Region size cannot be used to rank intersections.",
    "Exactly. This display is valid for these memberships, but tracing several overlapping boundaries makes the comparison slow."
  ],
  "data": "overlap-intersections.csv",
  "steps": [
    {
      "image": "overlap-complex.png",
      "title": "Start: overlapping boundaries",
      "text": "Four lists create thirteen non-empty membership combinations here. Regions are hard to match to all their included and excluded lists. This is an Euler-style diagram: combinations with zero genes have no region. The problem is readability, not incorrect counts."
    },
    {
      "image": "overlap-upset-1.png",
      "title": "Use an intersection matrix and aligned bars",
      "text": "Each column is one exact membership combination. Black dots identify included lists; grey dots identify excluded lists. The bar above counts genes, and columns are ranked by count. All thirteen combinations from the circle diagram are retained. The vertical connector groups dots; it does not encode a flow or a time sequence."
    },
    {
      "image": "overlap-upset-2.png",
      "title": "Highlight the intersections relevant to the question",
      "text": "Blue bars involve more than one list; grey bars contain genes found in one list only. The largest shared intersection has 16 genes in Heat and Oxidative, but neither Stress nor Salt. Highlighting supports this specific question. For a general overview, keep the previous uniform colour. Two or three simple sets can still work well as overlapping circles."
    }
  ]
});

advancedWalkthroughs.push({
  "phase": 5,
  "title": "Grouped, stacked, or 100% stacked?",
  "description": "Four samples were counted using the same volume: 1 mL each. Cells are classified as T cells, B cells, or monocytes. Every version uses the same counts and category colours; only the layout or conversion to percentages changes.",
  "question": "Which design is best for these measurements?",
  "images": [
    "gallery-grouped-absolute.png"
  ],
  "options": [
    "It depends: compare individual cell types, total counts, or composition.",
    "100% stacked bars are always best because all samples have equal height."
  ],
  "correct": 0,
  "feedback": [
    "Exactly. Each version supports a different comparison. Follow the steps and decide which question matters.",
    "Equal heights make composition easier to compare, but hide differences in total counts. No one design answers every question equally well."
  ],
  "data": "gallery-stacked-counts.csv",
  "steps": [
    {
      "image": "gallery-grouped-absolute.png",
      "title": "Grouped bars: compare individual categories",
      "text": "Use this when asking, for example, “Which sample has the most B cells?” Every bar begins at zero, making the orange bars easy to compare. Sample 4 has 160 B cells. The tradeoff: totals require adding three separate bars, and many categories would become crowded."
    },
    {
      "image": "gallery-stacked-absolute.png",
      "title": "Stacked counts: compare totals and their components",
      "text": "Stacking makes the totals immediate: 100, 200, 100, and 400 cells per 1 mL. Use this when both total abundance and its components matter. Middle segments no longer share a baseline, so comparing B-cell counts is harder than in grouped bars. Equal sampled volume makes these absolute counts comparable."
    },
    {
      "image": "gallery-stacked-relative.png",
      "title": "100% stacked: compare composition",
      "text": "Divide each category count by its sample total. Use this when asking how the cell-type proportions differ. Samples 1 and 2 become identical (60% T cells, 30% B cells, 10% monocytes), although Sample 2 has twice as many cells. Total abundance disappears from bar height. Choose grouped bars for category values, stacked counts for totals, and 100% stacks for proportions; label or show totals separately if they still matter."
    }
  ]
});

const cards = [...diagnostics, ...guidedExamples, ...biologyGoodExamples, ...originalCards.slice(6,11), ...biologyCards, ...biologyOptional, ...biologyDesignCases, ...advancedWalkthroughs];
const optionalStart = cards.findIndex(c => c.phase === 3);
phases.push({name: 'Optional: complex figures'});

phases.push({name: 'Biology design comparisons'});

phases.push({name: "Advanced: step-by-step improvements"});
