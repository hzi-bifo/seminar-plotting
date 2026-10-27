// Published examples: originals retained, teaching interpretation separate from captions.
const publishedGoodExamples = [
 {
  phase:6,title:'Size and shade answer different questions',goodPoint:'Panel c: dot size and shade distinguish how many cells express a gene from how strongly they express it.',focus:'Look at panel c: the small dot matrix below the liver cell map.',
  description:'Mouse lemur liver cells. Rows are genes; columns are cell types. Dot size shows the percentage expressing a gene; shade shows mean expression.',
  question:'What does a large, pale dot tell us?',
  images:['published-lemur-3.png'],options:['Many cells express it, with relatively low mean expression','A few cells express it strongly'],
  feedback:['Yes. Size and shade separate prevalence from expression level. Two explicit keys make the extra encoding useful.','Read both keys: size represents prevalence; shade represents mean expression. They are different quantities.'],source:'publishedLemur3'
 },
 {
  phase:6,title:'Use colour to connect two views',goodPoint:'Panel b: matching cell-type colours connect the cell map to the heatmap.',focus:'Look at panel b: the kidney cell map and adjacent heatmap.',
  description:'Kidney cells arranged along an inferred trajectory. Heatmap rows are genes; columns are ordered cells. Expression is scaled separately for each gene.',
  question:'What links a cell group to its position in the heatmap?',
  images:['published-lemur-2.png'],options:['The matching cell-type colours above the heatmap','The red expression intensity'],
  feedback:['Yes. The annotation strip links the views. Red intensity encodes expression instead; row scaling prevents absolute comparisons between genes.','Red encodes expression. The coloured annotation strip identifies cell types and links them to the map.'],source:'publishedLemur2'
 },
 {
  phase:6,title:'Show proportions and totals together',goodPoint:'Panel b: aligned count bars show the totals hidden by percentages.',focus:'Look at panel b, upper right: stacked bars and grey bars underneath.',
  description:'Immune-cell subsets sampled from four mouse gut-associated locations. Stacked bars show composition; aligned grey bars show sampled cell counts.',
  question:'Why keep the small grey bars?',
  images:['published-treg-2.png'],options:['They reveal totals hidden by 100% bars','They repeat the same information'],
  feedback:['Yes. Alignment connects each composition to its total. Sampled cell counts are not automatically absolute abundance in the tissue.','Percentages hide different totals. The aligned count bars restore that information.'],source:'publishedTreg2'
 },
 {
  phase:6,title:'Pair an example with its summary',goodPoint:'Panels f–h: examples sit beside their summaries, with consistent colours linking tissue sites.',focus:'Look across panels f, g and h: example measurements beside group summaries.',
  description:'Mouse immune-cell measurements across tissue sites. These panels pair flow-cytometry examples or distributions with quantitative summaries.',
  question:'What makes this dense layout easier to follow?',
  images:['published-treg-1.png'],options:['Nearby evidence and summaries, with consistent site colours','Every panel uses the same measurement scale'],
  feedback:['Yes. Proximity and repeated colours guide comparisons. The panels measure different quantities, so their axes still need separate reading.','The axes differ. The useful design choice is placing evidence beside its summary and keeping site colours consistent.'],source:'publishedTreg1'
 }
];
for (const [key,doi,figure,credit] of [
 ['publishedLemur3','s41586-025-09113-9',3,'The Tabula Microcebus Consortium, Ezran, Liu and colleagues (2025)'],
 ['publishedLemur2','s41586-025-09113-9',2,'The Tabula Microcebus Consortium, Ezran, Liu and colleagues (2025)'],
 ['publishedTreg2','s41586-024-07251-0',2,'Gu, Bartolomé-Casado, Xu and colleagues (2024)'],
 ['publishedTreg1','s41586-024-07251-0',1,'Gu, Bartolomé-Casado, Xu and colleagues (2024)']
]) sources[key]={
 label:`${credit}, Nature, Figure ${figure}`,
 url:`https://www.nature.com/articles/${doi}/figures/${figure}`,
 credit:`© The Author(s). Original figure, unchanged. CC BY 4.0. ${key.includes('Treg')?'The authors credit BioRender.com for experimental-design and summary diagrams. ':''}Teaching questions are course commentary; consult the linked original caption for full methods and definitions.`,
 license:'https://creativecommons.org/licenses/by/4.0/'
};
phases.push({name:'Good plots: published figures'});
cards.push(...publishedGoodExamples);
