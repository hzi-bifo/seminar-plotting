function assignmentWideLong(){
 const rows=assignmentPreview.slice(0,3),days=[0,4,9];
 return `<p>Same nine measurements, arranged two ways. Click any value to find it in the other table.</p><p class="wide-long-context"><strong>Genome:</strong> Akkermansia muciniphila YL44 · <strong>Mouse:</strong> 1683 · <strong>Treatment:</strong> Control</p><div class="wide-long-layout"><section><h2>Wide · one row per SNP</h2><p>Each sample gets its own column.</p><table class="wide-long-table"><thead><tr><th>SNP</th>${days.map(d=>`<th>1683-${d}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr class="wl-gene-${i}"><th>${r.snp}</th>${days.map((d,j)=>`<td><button data-wl-cell="${i},${j}" aria-pressed="false">${r.values[j]}</button></td>`).join('')}</tr>`).join('')}</tbody></table><div class="wide-long-count">3 SNP rows × 3 sample columns = <strong>9 values</strong></div><p class="day2-note">Select only the sample columns to make the numeric matrix for Heatmap(). Keep SNP identities as row names.</p></section><section><h2>Long · one row per measurement</h2><p>Sample identity and value get their own columns.</p><table class="wide-long-table"><thead><tr><th>SNP</th><th>Mouse</th><th>Day</th><th>Value</th></tr></thead><tbody>${rows.map((r,i)=>days.map((d,j)=>`<tr class="wl-gene-${i}" data-wl-row="${i},${j}"><th>${r.snp}</th><td>1683</td><td>${d}</td><td><button data-wl-cell="${i},${j}" aria-pressed="false">${r.values[j]}</button></td></tr>`).join('')).join('')}</tbody></table><div class="wide-long-count"><strong>9 rows</strong> = the same 9 values</div></section></div><p id="wide-long-readout" class="wide-long-readout" aria-live="polite">Choose a value. Nothing is averaged or lost when reshaping.</p><details><summary>Where is the rest of the dataset?</summary><p>This complete 3 × 3 excerpt comes from dataset 1; no values are omitted within it. The full dataset has 24 SNPs × 64 samples = 1,536 measurements. Genome and treatment columns repeat in the full long table; here their shared values are shown above.</p><a href="../second_day_part2/data/dataset1_subset.csv">Wide CSV</a> · <a href="../second_day_part2/data/dataset1_subset_long.csv">Long CSV</a></details>`;
}
function bindWideLong(){
 document.querySelectorAll('[data-wl-cell]').forEach(button=>button.onclick=()=>{
 const key=button.dataset.wlCell,[r,c]=key.split(',').map(Number),row=assignmentPreview[r],day=[0,4,9][c];
 document.querySelectorAll('[data-wl-cell]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.wlCell===key)));
 document.querySelectorAll('[data-wl-row]').forEach(tr=>tr.classList.toggle('wl-selected',tr.dataset.wlRow===key));
 document.querySelector('#wide-long-readout').textContent=`${row.snp} · mouse 1683 · day ${day} → ${row.values[c]}. One wide-table cell becomes one long-table row.`;
 });
}
const rCode=text=>`<pre class="hands-code"><code>${consistencyEscape(text)}</code></pre>`;
function assignmentMini(){
 return `<table class="day2-table hands-matrix"><caption>Akkermansia · actual subset of dataset 1</caption><tr><th>SNP / mouse-day</th>${['1683-0','1683-4','1683-9','1683-14'].map(s=>`<th>${s}</th>`).join('')}</tr>${assignmentPreview.map(r=>`<tr><th>${r.snp}</th>${r.values.map(v=>`<td style="background:${heatmapDemoColour(v*40,false)};color:${v>.57?'white':'#172c38'}">${v.toFixed(3)}</td>`).join('')}</tr>`).join('')}</table><p class="day2-note">Displayed values rounded to 3 decimals; colour uses the full value on a fixed 0–1 scale.</p>`;
}
function assignmentDatasetOverview(){
 const datasets=[
  [1,'Guided walkthrough','2 genomes: Akkermansia + Bacteroides',24,0,'Start small: inspect the data and build the first heatmap.'],
  [2,'Independent exercises','Adds Turicimonas (3 genomes total)',48,186,'Practise on more SNPs and distinguish missing values from zero.'],
  [3,'Full heatmap / bonus','Adds Blautia, Clostridium and Enterocloster (all 6 genomes in the source table)',71,443,'Organise a larger matrix, annotate genomes and compare ordering choices.']
 ];
 return `<section class="hands-datasets" aria-labelledby="hands-datasets-title"><h2 id="hands-datasets-title">Three datasets · one study</h2><p>These are nested subsets: dataset 2 contains dataset 1; dataset 3 contains dataset 2. The shared measurements stay the same.</p><div class="hands-datasets-scroll" role="region" aria-label="Dataset comparison table" tabindex="0"><table class="day2-table hands-datasets-table"><caption>Numeric heatmap matrices · SNP rows × mouse/day sample columns</caption><thead><tr><th scope="col">Dataset / files</th><th scope="col">What changes?</th><th scope="col">Matrix</th><th scope="col">Missing cells</th><th scope="col">Use it for</th></tr></thead><tbody>${datasets.map(([n,title,genomes,snps,missing,purpose])=>`<tr><th scope="row">Dataset ${n}<br><small>${title}</small><div class="hands-dataset-links"><a href="../second_day_part2/data/dataset${n}_subset.csv" download aria-label="Download dataset ${n} wide CSV">Wide CSV</a><a href="../second_day_part2/data/dataset${n}_subset_long.csv" download aria-label="Download dataset ${n} long CSV">Long CSV</a></div></th><td>${genomes}</td><td>${snps} × 64</td><td>${missing}</td><td>${purpose}</td></tr>`).join('')}</tbody></table></div><p class="day2-note"><strong>Same samples in all three:</strong> 4 mice × 16 study days = 64 samples. These are repeated measurements from four mice. Cells contain SNP allele frequencies (0–1), not bacterial abundance. Dataset 2’s 186 missing cells are in Turicimonas; dataset 3 has 443 in total. Keep missing values as NA, not zero.</p><p class="day2-note"><strong>Two formats per dataset:</strong> wide = one row per SNP with sample columns; long = one row per SNP/sample pair with metadata. They contain the same values. The wide CSV also has three metadata columns, which are excluded from the numeric matrix.</p></section>`;
}
const handsOnNew=[
 ['hands-on','Hands-on · create a heatmap in R',`${assignmentDatasetOverview()}<details><summary>How we will work</summary><div class="hm-checklist">${[['1','Prepare','Install packages and inspect the supplied CSV files.'],['2','Build','Select numeric sample columns; keep metadata alongside.'],['3','Design','Call Heatmap(), add settings and annotations, then export.']].map(([n,t,p])=>`<article><span>${n}</span><h2>${t}</h2><p>${p}</p></article>`).join('')}</div><p>We will start with dataset 1 and a small working plot, then change one setting at a time.</p></details><nav class="sections"><a href="#day2-heatmaps/assignment-roadmap">Start the hands-on task →</a><a href="../second_day_part2/html/00_prepare.html" target="_blank" rel="noopener">Open setup notebook ↗</a></nav>`],
 ['r-install','Install once · load in each R session',`<p>R packages add functions to R and can come from different repositories (collections of packages).</p><div class="gallery-examples"><figure><h2>1 · Install</h2>${rCode('if (!requireNamespace("BiocManager", quietly = TRUE)) {\n  install.packages("BiocManager")\n}\nBiocManager::install("ComplexHeatmap")\ninstall.packages(c("circlize", "viridisLite"))')}<p><strong>CRAN</strong> is R’s main package repository. Use <code>install.packages()</code> for packages such as circlize and viridisLite.</p><p><strong><a href="https://bioconductor.org/install/" target="_blank" rel="noopener">Bioconductor</a></strong> provides packages for biological data analysis, including ComplexHeatmap. Install these with <code>BiocManager::install()</code>.</p><p><strong>BiocManager is the installer, not the repository.</strong> It is itself installed from CRAN in the first block above. Run installation before class.</p></figure><figure><h2>2 · Load</h2>${rCode('library(ComplexHeatmap)\nlibrary(circlize)\nlibrary(viridisLite)')}<p>Installing saves a package on your computer; <code>library()</code> loads it for use in the current R session, regardless of where it came from.</p><p>R is case-sensitive: <code>Heatmap()</code> has a capital H.</p><a href="https://bioconductor.org/packages/ComplexHeatmap/" target="_blank" rel="noopener">Official package and installation page ↗</a></figure></div><div class="hands-run-chunk"><img src="assets/day2-heatmaps/rstudio-run-chunk.png" alt="RStudio code chunk toolbar with a green right-pointing triangle"><p><strong>Run a code chunk:</strong> in an open R Markdown notebook, click the green <strong>▶</strong> button at the top right of the chunk. It runs all the code in that chunk. Work from top to bottom so that objects created earlier are available to later chunks.</p></div><p class="day2-note">Knitting an HTML notebook also needs Pandoc; exporting a plot with pdf() does not.</p>`],
 ['r-files','Start with the supplied files',`<div class="gallery-examples"><figure><h2>Ready-to-use CSV files</h2><p><code>dataset1_subset.csv</code><br>Wide: SNP rows, sample columns.</p><p><code>dataset1_subset_long.csv</code><br>Long: one SNP/sample pair per row, with metadata.</p><p>The datasets are already prepared. Rebuilding the publication table is optional.</p><p><a href="#day2-heatmaps/r-read-csv">Next: practise the R functions with dataset 2 →</a></p><p><a href="#day2-heatmaps/hands-on">Compare datasets 1, 2 and 3 →</a></p></figure><figure><h2>Read and inspect</h2>${rCode('wide_df <- read.csv("dataset1_subset.csv",\n                    check.names = FALSE)\nlong_df <- read.csv("dataset1_subset_long.csv")\nhead(wide_df[, 1:6])\ndim(wide_df)\nstr(wide_df)')}<p class="day2-note">These console examples assume that the working directory is second_day_part2/data, as set on the previous slide.</p></figure></div>`],
 ['r-preview','Wide and long · the same data',assignmentWideLong()],
 ['r-first','Your first Heatmap() call',`<div class="gallery-examples"><figure><h2>Create → draw</h2>${rCode('# 1. Create the heatmap object and store it in ht\nht <- Heatmap(mat, name = "Allele frequency")\n\n# 2. Display the stored heatmap\ndraw(ht)')}<p><code>&lt;-</code> assigns the result to a variable. Here, <code>ht</code> holds the heatmap object: its data and plotting settings. You can choose another name, but use the same name in <code>draw()</code>.</p><p>Assignment alone does not display the plot. Run <code>draw(ht)</code> to show it in RStudio’s <strong>Plots</strong> pane. Storing the object in <code>ht</code> does not save a PDF or image file.</p><p>Use <code>Heatmap()</code> with a capital <strong>H</strong> for ComplexHeatmap; lowercase <code>heatmap()</code> is a different R function.</p><p><code>mat</code> is a numeric matrix. Row and column names become labels.</p><p>Defaults cluster rows and columns. They are a starting point; choose colours and ordering for your question.</p></figure><figure><h2>What the matrix contains</h2>${assignmentMini()}<p class="day2-note">Preview of input values, not a rendering of the default Heatmap() output.</p></figure></div>`],
 ['r-settings','Inside Heatmap() · settings have different jobs',`<div class="hands-settings"><pre class="hands-code"><code>ht &lt;- Heatmap(
  <span class="r-data">mat,</span>
  <span class="r-colour">name = "Allele frequency",
  col = col_fun, na_col = "grey80",</span>
  <span class="r-order">cluster_rows = TRUE,
  cluster_columns = FALSE,</span>
  <span class="r-label">show_row_names = FALSE,
  column_names_rot = 90,</span>
  <span class="r-meta">top_annotation = ha</span>
)
draw(ht)</code></pre><div><p class="r-data"><strong>Data:</strong> the numeric matrix.</p><p class="r-colour"><strong>Colour:</strong> values, missing cells and legend title.</p><p class="r-order"><strong>Order:</strong> cluster genes; preserve the prepared sample order.</p><p class="r-label"><strong>Labels:</strong> visibility and rotation.</p><p class="r-meta"><strong>Context:</strong> sample annotations above columns.</p><details><summary>Define the colour function first</summary>${rCode('col_fun <- colorRamp2(\n  seq(0, 1, length.out = 5), viridis(5)\n)')}<p>Define ha from aligned sample metadata on the next slide.</p></details></div></div>`],
 ['r-annotation-map','Annotations describe the rows and columns',`<div class="hands-anatomy"><div class="annotation-top">top_annotation = ha · treatment / mouse / day</div><div class="annotation-side">rowAnnotation()<br>genome</div><div class="annotation-body">Heatmap matrix<br><small>SNP × sample<br>colour = allele frequency</small></div><div class="annotation-key">Legend<br>0 → 1<br><small>NA = grey</small></div></div><p>Annotation colours describe metadata; cell colours describe measurements. Keep their legends separate.</p><p><code>column_split</code> creates sample blocks; <code>row_split</code> creates row blocks. An annotation strip alone does not split or reorder the matrix.</p>`],
 ['r-help','Use the illustrated reference when you need a setting',`<div class="hm-checklist"><article><span>▦</span><h2>Single heatmap</h2><p>Colours, labels, clustering and splits.</p><a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/a-single-heatmap.html" target="_blank" rel="noopener">Open illustrated chapter ↗</a></article><article><span>▰</span><h2>Annotations</h2><p>Sample strips, row metadata and legends.</p><a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/heatmap-annotations.html" target="_blank" rel="noopener">Open annotation examples ↗</a></article><article><span>?</span><h2>Help inside R</h2>${rCode('?ComplexHeatmap::Heatmap\nbrowseVignettes("ComplexHeatmap")')}<p>Look up one argument, then change it and inspect the result.</p></article></div>`]
];
handsOnNew.push(['r-find-data','Find the workshop data in RStudio',`
<p>In the <strong>Files</strong> pane, start at <strong>Home</strong> and open <strong>workshop → seminar-plotting → second_day_part2 → data</strong>.</p>
<img class="hands-course-path" src="assets/day2-heatmaps/rstudio-course-path.png" alt="Folder breadcrumb: workshop, seminar-plotting, second_day_part2">
<div class="hands-folder-shots"><figure><img src="assets/day2-heatmaps/rstudio-workshop-folder.png" alt="RStudio Files pane at Home with workshop folder"><figcaption>1 · Open the workshop folder, then follow the path above.</figcaption></figure><figure><img src="assets/day2-heatmaps/rstudio-data-files.png" alt="Data folder containing dataset1, dataset2 and dataset3 CSVs and mouse_group_mapping.csv"><figcaption>2 · Open data and inspect the supplied files.</figcaption></figure></div>
<p><strong>Look for:</strong> <code>dataset1_subset.csv</code> (wide table), <code>dataset1_subset_long.csv</code> (long table), and the corresponding files for datasets 2 and 3. <code>mouse_group_mapping.csv</code> supplies mouse/group metadata.</p>`]);
handsOnNew.push(['r-copy-files','Make your own editable copy',`
<p>The shared workshop folder may be read-only. Before editing notebooks, copy <strong>the whole second_day_part2 folder</strong> into your own home folder. This keeps the notebook and data paths together.</p>
<div class="hands-settings"><section><h2>1 · Run once in the R Console</h2>
${rCode('dir.create("~/my-plotting", showWarnings = FALSE)\n\nfile.copy(\n  from = "~/workshop/seminar-plotting/second_day_part2",\n  to = "~/my-plotting",\n  recursive = TRUE,\n  copy.mode = FALSE,\n  overwrite = FALSE\n)')}
<p>Wait for copying to finish. Check for warnings; on the first copy, the result should be <code>TRUE</code>. <code>overwrite = FALSE</code> protects files you have already copied and edited.</p>
</section><section><h2>2 · Work in your copy</h2>
<p>In the Files pane, open <strong>Home → my-plotting → second_day_part2</strong>.</p>
<ul><li><strong>scripts:</strong> open <code>day2_walkthrough.Rmd</code> or your exercise notebook here and save your edits.</li><li><strong>data:</strong> inspect the CSVs here and use this folder for the next console examples.</li></ul>
<p><code>copy.mode = FALSE</code> avoids copying the original file permission bits.</p>
<p><strong>Already made edits?</strong> Use <strong>File → Save As</strong> to save your open notebook into the copied <code>scripts</code> folder before closing it.</p>
<p>Continue saving PDF exports to <code>~/pdf</code>.</p></section></div>`]);
handsOnNew.push(['r-copy-paths','After copying · where does R look for the data?',`
<p><strong>You copied the whole folder, so the relative paths inside the notebooks can stay the same.</strong> Open the notebook from <code>~/my-plotting/second_day_part2</code>, not the shared workshop folder.</p>
<div class="hands-settings"><section><h2>Same folders, new location</h2>
${rCode('~/my-plotting/second_day_part2/\n  data/\n    dataset3_subset.csv\n    dataset3_subset_long.csv\n  scripts/\n    day2_walkthrough.Rmd\n    individual_notebooks/\n      04_full_heatmap.Rmd')}
<p>In <code>scripts/day2_walkthrough.Rmd</code>, <code>../data/</code> means: go up to <code>second_day_part2</code>, then enter <code>data</code>.</p>
<p>In an individual notebook one folder deeper, use <code>../../data/</code>.</p>
</section><section><h2>Running the copied walkthrough</h2>
<p>For Console commands, choose <strong>Session → Set Working Directory → To Source File Location</strong> with the copied walkthrough open.</p>
${rCode('# Console: start in the copied scripts folder\nsetwd("~/my-plotting/second_day_part2/scripts")\ngetwd()\n\ninput_path <- file.path("..", "data", "dataset1_subset_long.csv")\nfile.exists(input_path)  # Expected: TRUE')}
<p>Notebook chunks and knitting normally use the notebook’s folder unless configured otherwise. Run <code>getwd()</code> inside a chunk to check its starting folder.</p>
</section></div><p><strong>For the upcoming Console practice slides:</strong> we will switch into <code>data</code> and use just the CSV filename. The working-directory slide shows how.</p>`]);
handsOnNew.push(['r-working-directory','Working directory · where R looks for files',`
<p>With <strong>Home → my-plotting → second_day_part2 → data</strong> open in the Files pane, choose <strong>More → Set As Working Directory</strong>.</p>
<div class="hands-settings"><section>
<a href="assets/day2-heatmaps/rstudio-set-working-directory.png" target="_blank" rel="noopener"><img class="hands-wd-shot" src="assets/day2-heatmaps/rstudio-set-working-directory.png" alt="RStudio Files pane More menu with Set As Working Directory highlighted"></a>
</section><section><h2>Show the current working directory</h2><p>Type <code>getwd()</code> in the RStudio <strong>Console</strong> and press <strong>Enter</strong>. R prints the full path of the folder it currently uses to read and save files.</p>
${rCode('getwd()  # Should end in second_day_part2/data\nlist.files()\nfile.exists("dataset2_subset_long.csv")\n# Expected: TRUE\n\nlong_df <- read.csv(\n  "dataset2_subset_long.csv",\n  check.names = FALSE\n)\nhead(long_df)')}
<p>A relative path starts from the working directory. Because we are inside <code>data</code>, just the filename is enough. Browsing to a folder in the Files pane alone does not change R’s working directory.</p>
<p><strong>If the check returns FALSE:</strong> check <code>getwd()</code> and the filename. Keep this working directory for the next slide examples.</p></section></div>
<details><summary>Using setwd() and other starting folders</summary>
${rCode('# On the workshop server, starting from your home folder:\nsetwd("~/my-plotting/second_day_part2/data")\n\n# From second_day_part2/, the relative CSV path is:\n"data/dataset2_subset_long.csv"\n\n# From scripts/individual_notebooks/, it is:\n"../../data/dataset2_subset_long.csv"')}
<p><code>..</code> means “go up one folder”. The supplied R Markdown notebooks use paths relative to their own folder; when knitting, R Markdown normally starts there. For these console examples, use the <code>data</code> folder.</p></details>`]);
// Short, sequential base-R examples using the supplied three-genome dataset.
const heatmapDataBasics = [
 ['r-read-csv','read.csv() · bring the data into R',
  'Start with dataset 2 so we can practise with real missing values.',
  'long_df <- read.csv(\n  "dataset2_subset_long.csv",\n  check.names = FALSE\n)\nwide_df <- read.csv(\n  "dataset2_subset.csv",\n  check.names = FALSE\n)\ndim(long_df)',
  '[1] 3072    7',
  'The long table has 3,072 SNP/sample rows and seven columns. check.names = FALSE preserves sample names such as 1683-0 in the wide table.',
  'Run from second_day_part2/data (Files pane: More → Set As Working Directory). Run these examples in order; they reuse long_df, wide_df and later mat.',
  'Which file would you use to inspect metadata, and which to build the heatmap matrix?'],
 ['r-head','head() · look before you plot',
  'Inspect a few rows and check what one measurement represents.',
  'head(long_df[, c("snp_id", "mouse_id", "day", "value")], 3)',
  '      snp_id mouse_id day    value\n1 239840-C-G     1683   0 0.000000\n2 241793-A-G     1683   0 0.049587\n3 355328-A-T     1683   0 0.138182',
  'head(..., 3) shows the first three rows. c(...) selects four columns by name; the empty space before the comma keeps all rows before head() selects the first three.',
  'Each row is one SNP measured in one mouse/day sample. A frequency of 0 is an observed value.',
  'Change 3 to 6. Can you identify the SNP, sample and frequency in one row?'],
 ['r-str','str() · check the column types',
  'Numbers and labels have different jobs in a heatmap.',
  'str(long_df)',
  '3072 observations; 7 variables\nGenome          : character\nsnp_id          : character\nPosition        : integer\nvalue           : numeric\nmouse_id        : integer\nday             : integer\ntreatment_group : character',
  'This is a shortened summary of str() output. value is numeric; genome and treatment are labels. A numeric mouse ID still identifies a mouse—it is not a measurement.',
  'Only sample frequency columns belong in the heatmap matrix. Numeric metadata such as Position must also be excluded.',
  'Which column provides the cell colours? Which columns describe the rows and samples?'],
 ['r-filter','[rows, columns] · select the observations you need',
  'Look at Turicimonas on day 9 without changing the original table.',
  'selected <- long_df[\n  long_df$Genome == "Turicimonas_muris_YL45" &\n    long_df$day == 9,\n]\nnrow(selected)',
  '[1] 96',
  '== tests equality; & requires both conditions. The empty position after the comma keeps every column. Assigning to selected leaves long_df intact.',
  '96 rows = 24 SNPs × 4 mouse/day samples. This count includes rows whose value is NA; it does not mean 96 mice.',
  'Change day 9 to day 30. How many SNP/sample rows are selected?'],
 ['r-table','table() · count rows by group',
  'Check how many measurement rows belong to each genome.',
  'table(long_df$Genome)',
  'Akkermansia_muciniphila_YL44   320\nBacteroides_caecimuris_I48    1216\nTuricimonas_muris_YL45       1536',
  'Each SNP has 64 sample rows: 5 × 64, 19 × 64 and 24 × 64. table(Genome) counts the genome labels, including rows with a missing frequency.',
  'These are measurement-row counts, not biological replicate counts. The dataset has four mice measured on 16 days.',
  'Try table(long_df$day). Why does each day have 192 rows?'],
 ['r-is-na','is.na() · find missing measurements',
  'Missing is different from a measured zero.',
  'is.na(long_df$value)  # TRUE where a value is missing\nsum(is.na(long_df$value))\nsum(is.na(selected$value))',
  '# Whole dataset 2\n[1] 186\n# Turicimonas, day 9 (original selected object)\n[1] 48',
  'is.na() returns TRUE/FALSE for each entry; sum() counts TRUE values. The second count assumes selected still contains Turicimonas on day 9.',
  'Use is.na(x), not x == NA. Preserve these NA values. Later, na_col = "grey80" gives missing cells a distinct colour; it does not fill them in.',
  'Compare sum(is.na(long_df$value)) with sum(long_df$value == 0, na.rm = TRUE). Why are these different questions?'],
 ['r-matrix','as.matrix() · prepare numeric heatmap input',
  'Use the wide table, removing metadata before conversion.',
  'sample_cols <- setdiff(\n  names(wide_df), c("Genome", "snp_id", "Position")\n)\nmat <- as.matrix(wide_df[, sample_cols])\nrownames(mat) <- paste(wide_df$Genome, wide_df$snp_id, sep = " | ")\ndim(mat)\nis.numeric(mat)',
  '[1] 48 64\n[1] TRUE',
  'setdiff() keeps column names that are not metadata. as.matrix() converts those frequency columns to a matrix; missing values remain NA.',
  'Including text metadata can turn the entire matrix into text. Keep Genome and Position separately for annotations, and SNP identities in row names.',
  'Why does wide_df have 67 columns, while mat has only 64?'],
 ['r-col-sums','colSums() · count missing cells per sample',
  'Summarise data completeness before choosing a heatmap design.',
  'missing_per_sample <- colSums(is.na(mat))\nhead(missing_per_sample, 4)\nsum(missing_per_sample)',
  ' 1683-0  1683-4  1683-9 1683-14\n      0       1       0       1\n[1] 186',
  'is.na(mat) creates a TRUE/FALSE matrix. colSums() counts missing SNP frequencies in each sample column. The total matches the long-table count.',
  'These counts can later become an annotation with anno_barplot(missing_per_sample). Keep their order aligned with the heatmap columns. A count of zero means no missing entries, not zero allele frequencies.',
  'Try rowSums(is.na(mat)). What does each number describe now?']
];
for (const [id,title,intro,code,output,explanation,note,exercise] of heatmapDataBasics) {
 handsOnNew.push([id,title,`<p>${consistencyEscape(intro)}</p><div class="hands-settings"><section><h2>Try it in R</h2>${rCode(code)}<details><summary>Reveal expected output</summary>${rCode(output)}</details></section><section><h2>What it does</h2><p>${consistencyEscape(explanation)}</p><p class="day2-note">${consistencyEscape(note)}</p><h2>Your turn</h2><p>${consistencyEscape(exercise)}</p></section></div>`]);
}
handsOnNew.push(['r-server','Open DeepG · RStudio Server',`<div class="hands-server"><section><ol><li>Go to <a href="https://dzif-galaxy-01.bifo.helmholtz-hzi.de" target="_blank" rel="noopener">dzif-galaxy-01.bifo.helmholtz-hzi.de ↗</a> and sign in.</li><li>Open <strong>Interactive Apps → DeepG - RStudio Server</strong>.</li><li>Use the settings shown here, then click <strong>Launch</strong>.</li></ol><h2>Settings for the workshop</h2><dl><dt>Queue</dt><dd>workshop</dd><dt>GPU</dt><dd>None</dd><dt>Memory</dt><dd>24 GB</dd><dt>Slurm tasks</dt><dd>2</dd><dt>QOS</dt><dd>Long (10d max)</dd><dt>Number of hours</dt><dd>72</dd></dl></section><figure><a href="assets/day2-heatmaps/deepg-rstudio-setup.png" target="_blank" rel="noopener"><img src="assets/day2-heatmaps/deepg-rstudio-setup.png" alt="Open OnDemand DeepG - RStudio Server launch form with workshop queue, no GPU, 24 GB memory, 2 Slurm tasks, Long QOS and 72 hours"></a><figcaption>The launch page should look like this. Click to enlarge.</figcaption></figure></div>`]);
handsOnNew.push(['r-connect','Wait for your session · then connect',`<div class="hands-server-connect"><p><strong>After clicking Launch:</strong> you will see “Your session is currently starting... Please be patient as this process can take a few minutes.”</p><p>Wait until the session is ready, then click <strong>Connect to RStudio Server</strong> to open RStudio.</p><img src="assets/day2-heatmaps/deepg-rstudio-connect.png" alt="Connect to RStudio Server button"></div>`]);
const handsBodies=Object.fromEntries(handsOnNew.map(([id,title,extra])=>[id,{id,title,extra,note:'Day 2 · Part 2 · Hands-on with ComplexHeatmap',group:'Hands-on · R',images:[],bullets:[],credit:[],source:[]}]));
const assignmentExisting=Object.fromEntries(day2HeatmapSlides.filter(s=>s.id.startsWith('assignment-')).map(s=>[s.id,s]));
const handsStart=day2HeatmapSlides.findIndex(s=>s.id==='assignment-context');
const handsOrder=['hands-on','assignment-roadmap','r-server','r-connect','r-find-data','r-copy-files','r-copy-paths','r-working-directory','r-install','r-files',...heatmapDataBasics.map(s=>s[0]),'r-preview','assignment-tables','r-first','r-settings','r-annotation-map','assignment-metadata','r-help'];
day2HeatmapSlides.splice(handsStart,4,...handsOrder.map(id=>handsBodies[id]||assignmentExisting[id]));

// Shared classroom experiment: compare assistance, preserve scientific meaning.
day2HeatmapSlides.push(
 {id:'working-with-ai',title:'Working with AI · explore together',group:'Working with AI',note:'Use the AI tools you already have: Claude, Codex, Gemini or another assistant.',images:[],bullets:[],credit:[],source:[],extra:`
 <p><strong>You are encouraged to use AI while working on your heatmap.</strong> Work with your assistant to understand the code, try design changes and investigate errors.</p>
 <div class="hm-checklist"><article><span>1</span><h2>Try a real task</h2><p>Start from your working plot. Ask for one improvement, an explanation of an argument, or help with an error. Run the suggested code and inspect the result.</p></article><article><span>2</span><h2>Compare experiences</h2><p>What worked? What failed? Did the assistant misunderstand the data, use the wrong library or change something you wanted to keep?</p></article><article><span>3</span><h2>Collect good practices</h2><p>Share one useful prompt, one mistake and one check that caught it. Together, turn these examples into advice for the next person.</p></article></div>
 <p><strong>Small experiment:</strong> try the same question with only your code, then add a plot image and the supplied dataset or a pasted table with column names. Does the answer improve? What is still misunderstood?</p>
 <p class="day2-note">Record: task → context supplied → suggestion → what you tested → outcome. A suggestion that sounds convincing still needs checking.</p>`},
 {id:'ai-good-practices',title:'Working with AI · good practices to test',group:'Working with AI',note:'Give useful context, ask open questions and compare every revision with your original.',images:[],bullets:[],credit:[],source:[],extra:`
 <div class="hands-settings"><section><h2>Give context and check the changes</h2>
 <ul><li><strong>Keep a baseline:</strong> save your working code and plot. Compare the revised version with both.</li><li><strong>Name the library:</strong> “Use R and ComplexHeatmap.” Include your code and the <a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/" target="_blank" rel="noopener">ComplexHeatmap documentation ↗</a>.</li><li><strong>Explain the data:</strong> what rows, columns, values and NA mean; which question the plot should answer. Try the supplied CSV or a pasted table, and identify it as an excerpt if incomplete.</li><li><strong>State what must stay fixed:</strong> samples, values, NA, transformations and the 0–1 frequency scale. Check that annotations still match sample IDs and that no filtering or scaling was added unexpectedly.</li><li><strong>Run and inspect:</strong> request an explanation of each change. Check warnings, legends and the resulting plot; working code alone is not enough.</li></ul>
 </section><section><h2>Open questions to try</h2>
 <p>“What would you improve to make this heatmap easier to interpret? Suggest three changes and explain their trade-offs before changing the code.”</p>
 <p>“What might a reader misunderstand about this figure? Consider the colour scale, missing values, ordering and annotations.”</p>
 <p>“Which ordering would help answer [my biological question]? Explain what clustering would reveal and what it might obscure.”</p>
 <p>“Compare the original and revised code. Did any values, samples, transformations or annotation mappings change unintentionally?”</p>
 <p><strong>Discuss:</strong> which context helped most, which mistakes recurred, and which checks should everyone use?</p></section></div>`}
);

const aiSectionSlides = [
 ['ai-tools','AI tools · collaborate, check, protect','A dedicated section for using AI in the heatmap exercise.',`<div class="hm-checklist"><article><span>1</span><h2>Understand the workflow</h2><p>Chat-based help versus agents that inspect files, edit code and run commands.</p></article><article><span>2</span><h2>Check data protection</h2><p>Know what leaves your computer and which files your institution permits you to share.</p></article><article><span>3</span><h2>Experiment together</h2><p>Compare results, spot misunderstandings and collect practices that help.</p></article></div>`],
 ['ai-chat-agent','AI · chatbox versus agentic tools','The difference is what the assistant can do with its connected tools.',`<div class="hands-settings"><section><h2>Chat-based help</h2><p>You paste a question, code, table or image. The assistant explains or suggests code; you usually copy it into RStudio, run it and report the result.</p><p><strong>Typical loop:</strong> ask → receive a suggestion → run it yourself → share feedback.</p><p>Useful for discussing a plot, understanding an error or asking for alternatives.</p></section><section><h2>Agentic AI · Claude Code, Codex</h2><p>With the appropriate tools and permissions, an agent can inspect your current code, read files, write or edit scripts, run commands and check the output.</p><p><strong>Typical loop:</strong> give a task → inspect → edit → run → check → revise.</p><p>Actions may run on your computer or in a remote workspace. Review the changed files and plots before accepting the result.</p></section></div><p><strong>Example:</strong> “Improve the heatmap labels without changing the values or sample order. Run the script, export a PDF and explain your changes.”</p><p class="day2-note">A chat interface can also have agent tools. The distinction is tool access and permissions, not whether there is a chatbox.</p><p class="day2-note">References: <a href="https://learn.chatgpt.com/docs/cli" target="_blank" rel="noopener">Codex documentation</a> · <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">Claude Code documentation</a></p>`],
 ['ai-data-protection','AI · data protection before you start','Clarify which files and data you are allowed to share with the chosen service.',`<p><strong>Online AI services process the context you send on remote servers.</strong> This can include your prompt, pasted tables, uploaded files, screenshots and code. With an agent, file contents and command outputs may also become model context.</p><div class="hm-checklist"><article><span>→</span><h2>Context goes out</h2><p>The app sends selected context to the model provider. Running the app locally does not mean that the model runs locally.</p></article><article><span>←</span><h2>A response comes back</h2><p>The model returns text or instructions for tools. An agent may act locally or remotely, then send results back for the next step.</p></article><article><span>?</span><h2>Check permission first</h2><p>Confirm which provider, account and data types your institution permits. Ask your supervisor, IT or data-protection contact if unclear.</p></article></div><p><strong>Before uploading or granting folder access:</strong> check for personal or patient data, confidential research, unpublished results and credentials. Give the agent a dedicated folder containing only approved files; use synthetic examples when the real data cannot be shared.</p><p><strong>Check the service’s terms and settings:</strong> retention, access, processing location and training use depend on the product and account. “Not used for training” does not mean “never sent to a server”.</p><p class="day2-note">Not every file is automatically uploaded. What is transmitted depends on tool access and selected context. Fully local models are a different setup. <a href="https://code.claude.com/docs/en/data-usage" target="_blank" rel="noopener">Example: Claude Code data-use documentation ↗</a></p>`]
].map(([id,title,note,extra])=>({id,title,note,extra,group:'AI tools',images:[],bullets:[],credit:[],source:[]}));
day2HeatmapSlides.splice(day2HeatmapSlides.findIndex(s=>s.id==='working-with-ai'),0,...aiSectionSlides);
for(const slide of day2HeatmapSlides.filter(s=>['working-with-ai','ai-good-practices'].includes(s.id))) slide.group='AI tools';

// Begin Day 2 with AI guidance before reading and building heatmaps.
const aiOpeningIds = ['ai-tools','ai-chat-agent','ai-data-protection','working-with-ai','ai-good-practices'];
const aiOpeningSlides = aiOpeningIds.map(id=>day2HeatmapSlides.find(slide=>slide.id===id));
for (let i=day2HeatmapSlides.length-1;i>=0;i--) {
 if(aiOpeningIds.includes(day2HeatmapSlides[i].id)) day2HeatmapSlides.splice(i,1);
}
day2HeatmapSlides.unshift(...aiOpeningSlides);
