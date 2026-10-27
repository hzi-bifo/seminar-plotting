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
 ['hands-on','Hands-on · build together, then explore in groups',`<p><strong>First we build a simple heatmap together. Then you apply the same steps to a larger dataset.</strong></p><div class="hands-teaching-flow">
<article><span class="hands-stage">1 · Together</span><h2>Follow the live walkthrough</h2><p><strong>Dataset 1 · two bacteria</strong><br>Akkermansia + Bacteroides</p><p>We fill the empty notebook, run each chunk and inspect the plot together.</p><p class="hands-file"><code>day2_walkthrough_empty.Rmd</code><br>Reference: <code>day2_walkthrough.Rmd</code></p></article>
<article><span class="hands-stage">2 · Groups of 3–5</span><h2>Try the exercise yourselves</h2><p><strong>Dataset 2 · adds Turicimonas</strong><br>The original two bacteria + one more</p><p>Repeat the steps, inspect missing values and choose a clear design. AI assistance is welcome.</p><p class="hands-file"><code>day2_exercises.Rmd</code><br>Start with Explore Data + Simple Heatmap.</p></article>
<article><span class="hands-stage">3 · Share &amp; review</span><h2>One heatmap from each group</h2><p>Show your plot and explain <strong>one design choice</strong> and <strong>one challenge or surprise</strong>.</p><p>We compare approaches, then walk through the relevant solution sections together.</p><p class="hands-file"><code>day2_exercises_solution.Rmd</code></p></article>
</div><p><strong>Keep the colour scale at 0–1 and show NA distinctly.</strong> Later, if time allows: add annotations and extend to dataset 3 with all six genomes.</p><details><summary>Compare the supplied datasets</summary>${assignmentDatasetOverview()}</details><nav class="sections"><a href="#day2-heatmaps/assignment-roadmap">Start the hands-on task →</a><a href="../second_day_part2/html/00_prepare.html" target="_blank" rel="noopener">Open setup notebook ↗</a></nav>`],
 ['r-install','Install once · load in each R session',`<p>R packages add functions to R and can come from different repositories (collections of packages).</p><div class="gallery-examples"><figure><h2>1 · Install</h2>${rCode('if (!requireNamespace("BiocManager", quietly = TRUE)) {\n  install.packages("BiocManager")\n}\nBiocManager::install("ComplexHeatmap")\ninstall.packages(c("circlize", "viridisLite"))')}<p><strong>CRAN</strong> is R’s main package repository. Use <code>install.packages()</code> for packages such as circlize and viridisLite.</p><p><strong><a href="https://bioconductor.org/install/" target="_blank" rel="noopener">Bioconductor</a></strong> provides packages for biological data analysis, including ComplexHeatmap. Install these with <code>BiocManager::install()</code>.</p><p><strong>BiocManager is the installer, not the repository.</strong> It is itself installed from CRAN in the first block above. Run installation before class.</p></figure><figure><h2>2 · Load</h2>${rCode('library(ComplexHeatmap)\nlibrary(circlize)\nlibrary(viridisLite)')}<p>Installing saves a package on your computer; <code>library()</code> loads it for use in the current R session, regardless of where it came from.</p><p>R is case-sensitive: <code>Heatmap()</code> has a capital H.</p><a href="https://bioconductor.org/packages/ComplexHeatmap/" target="_blank" rel="noopener">Official package and installation page ↗</a></figure></div><div class="hands-run-chunk"><img src="assets/day2-heatmaps/rstudio-run-chunk.png" alt="RStudio code chunk toolbar with a green right-pointing triangle"><p><strong>Run a code chunk:</strong> in an open R Markdown notebook, click the green <strong>▶</strong> button at the top right of the chunk. It runs all the code in that chunk. Work from top to bottom so that objects created earlier are available to later chunks.</p></div><p class="day2-note">Knitting an HTML notebook also needs Pandoc; exporting a plot with pdf() does not.</p>`],
 ['r-files','Start with the supplied files',`<div class="gallery-examples"><figure><h2>Ready-to-use CSV files</h2><p><code>dataset1_subset.csv</code><br>Wide: SNP rows, sample columns.</p><p><code>dataset1_subset_long.csv</code><br>Long: one SNP/sample pair per row, with metadata.</p><p>The datasets are already prepared. Rebuilding the publication table is optional.</p><p><a href="#day2-heatmaps/r-read-csv">Next: practise the R functions with dataset 2 →</a></p><p><a href="#day2-heatmaps/hands-on">Compare datasets 1, 2 and 3 →</a></p></figure><figure><h2>Read and inspect</h2>${rCode('data_dir <- path.expand("~/my-plotting/second_day_part2/data")\nwide_df <- read.csv(file.path(data_dir, "dataset1_subset.csv"),\n                    check.names = FALSE)\nlong_df <- read.csv(file.path(data_dir, "dataset1_subset_long.csv"))\nhead(wide_df[, 1:6])\ndim(wide_df)\nstr(wide_df)')}<p class="day2-note">These Console examples use your copied data folder explicitly; no working-directory change is needed. The notebooks can keep their original relative paths.</p></figure></div>`],
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
</section><section><p><strong>Already working? Keep everything as it is.</strong></p><details class="optional-path-fix"><summary>File not found? Open troubleshooting</summary><p>Check <code>getwd()</code>. With the copied notebook open, choose <strong>Session → Set Working Directory → To Source File Location</strong>.</p>
${rCode('# For the copied walkthrough in scripts/:\ngetwd()\nfile.exists("../data/dataset1_subset_long.csv")\n# Expected: TRUE')}
<p>If this returns <code>FALSE</code>, check the folder and filename. Inside a notebook chunk, run <code>getwd()</code> there too.</p></details>
</section></div><p><strong>For the upcoming Console practice slides:</strong> we will switch into <code>data</code> and use just the CSV filename. The working-directory slide shows how.</p>`]);
handsOnNew.push(['r-working-directory','Working directory · where R looks for files',`
<p class="wd-ready"><strong>The copied notebooks should work out of the box.</strong> If they run, keep the existing paths. The diagram below explains how relative paths work.</p>
<div class="wd-visual"><section><h2>Imagine this folder structure</h2><div class="wd-folder-tree"><div class="wd-parent">▱ project/ <small>parent folder</small></div><div class="wd-parent-file">report.csv</div><div class="wd-current">▱ data/ <strong>← You are here: working directory</strong></div><div class="wd-child-file">file.csv</div></div><p>In the Files pane, open <code>data</code>, then choose <strong>More → Set As Working Directory</strong> to make it the starting point.</p></section><section><h2>Where does R look?</h2><div class="wd-path-example"><code>read.csv("file.csv")</code><p>Stay here → <strong>project/data/file.csv</strong></p></div><div class="wd-path-example"><code>read.csv("../report.csv")</code><p>Go up one folder → <strong>project/report.csv</strong></p></div><div class="wd-path-example"><code>getwd()</code><p>Print the current starting folder.</p></div><p><strong>Browsing a folder is not enough:</strong> R’s working directory changes only when you set it.</p></section></div>
<details><summary>For the next Console examples only · use the copied data folder</summary><p>Open <strong>Home → my-plotting → second_day_part2 → data</strong>, then <strong>More → Set As Working Directory</strong>. These Console examples use just the CSV filenames.</p><div class="hands-settings"><img class="hands-wd-shot" src="assets/day2-heatmaps/rstudio-set-working-directory.png" alt="RStudio More menu showing Set As Working Directory"><section>${rCode('getwd()\nfile.exists("dataset2_subset_long.csv")  # TRUE\nlong_df <- read.csv("dataset2_subset_long.csv")')}<p>When returning to a notebook, use its original relative paths. Chunks and knitting normally start from the notebook’s folder; run <code>getwd()</code> inside a chunk if unsure.</p></section></div></details>`]);
// Short, sequential base-R examples using the supplied three-genome dataset.
const heatmapDataBasics = [
 ['r-read-csv','read.csv() · bring the data into R',
  'Start with dataset 2 so we can practise with real missing values.',
  'data_dir <- path.expand("~/my-plotting/second_day_part2/data")\nlong_df <- read.csv(\n  file.path(data_dir, "dataset2_subset_long.csv"),\n  check.names = FALSE\n)\nwide_df <- read.csv(\n  file.path(data_dir, "dataset2_subset.csv"),\n  check.names = FALSE\n)\ndim(long_df)',
  '[1] 3072    7',
  'The long table has 3,072 SNP/sample rows and seven columns. check.names = FALSE preserves sample names such as 1683-0 in the wide table.',
  'The explicit data_dir points to your personal copy, so these Console examples do not require setwd(). Run these examples in order; they reuse long_df, wide_df and later mat.',
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
handsOnNew.push(['r-server','Open DeepG · RStudio Server',`<div class="hands-server"><section><ol><li>Go to <a href="https://dzif-galaxy-01.bifo.helmholtz-hzi.de" target="_blank" rel="noopener">dzif-galaxy-01.bifo.helmholtz-hzi.de ↗</a> and sign in.</li><li>Open <strong>Interactive Apps → DeepG - RStudio Server</strong>.</li><li>Leave the default settings unchanged, then click <strong>Launch</strong>.</li></ol><h2>Default settings · leave unchanged</h2><dl><dt>Queue</dt><dd>workshop</dd><dt>GPU</dt><dd>None</dd><dt>Memory</dt><dd>24 GB</dd><dt>Slurm tasks</dt><dd>2</dd><dt>QOS</dt><dd>Long (10d max)</dd><dt>Number of hours</dt><dd>72</dd></dl></section><figure><a href="assets/day2-heatmaps/deepg-rstudio-setup.png" target="_blank" rel="noopener"><img src="assets/day2-heatmaps/deepg-rstudio-setup.png" alt="Open OnDemand DeepG - RStudio Server launch form with workshop queue, no GPU, 24 GB memory, 2 Slurm tasks, Long QOS and 72 hours"></a><figcaption>The launch page should look like this. Click to enlarge.</figcaption></figure></div>`]);
handsOnNew.push(['r-connect','Wait for your session · then connect',`<div class="hands-server-connect"><p><strong>After clicking Launch:</strong> you will see “Your session is currently starting... Please be patient as this process can take a few minutes.”</p><p>Wait until the session is ready, then click <strong>Connect to RStudio Server</strong> to open RStudio.</p><img src="assets/day2-heatmaps/deepg-rstudio-connect.png" alt="Connect to RStudio Server button"></div>`]);
handsOnNew.push(['r-session-faq','FAQ · session failed to submit?',`<p class="session-error"><strong>QOSMaxSubmitJobPerUserLimit</strong><br>“Batch job submission failed: Job violates accounting/QOS policy …”</p><p><strong>For this workshop, you can have only one active session.</strong> Check whether an earlier Open OnDemand session is still running or queued.</p><div class="session-faq-layout"><section><h2>Find the old session</h2><ol><li>Open <strong>My Interactive Sessions</strong> in Open OnDemand.</li><li>Find your earlier session. If it is the one you need, simply reconnect to it.</li><li>To replace it, <strong>save your work first</strong>, then click the red <strong>Delete</strong> button on that session and confirm if prompted.</li><li>Wait until it has stopped, then launch <strong>DeepG - RStudio Server</strong> again.</li></ol><p><strong>Closing the browser tab does not stop the session.</strong> Use Delete in Open OnDemand to end it.</p></section><figure><a href="assets/day2-heatmaps/rstudio-session-controls.svg" target="_blank" rel="noopener"><img src="assets/day2-heatmaps/rstudio-session-controls.svg" alt="An existing running DeepG RStudio Server session with a red Delete button at the upper right and Connect button below"></a><figcaption>Find your old session and use its red Delete button. Schematic of the session controls; click to enlarge.</figcaption></figure></div><p class="day2-note">For this error, focus on the session limit; the generic message about invalid job names is not the relevant instruction. If no old session is visible or submission still fails, ask the instructor.</p>`]);
handsOnNew.push(['r-browser-faq','FAQ · “Bad Request” in the browser?',`<p class="session-error"><strong>Bad Request</strong><br>Your browser sent a request that this server could not understand.<br>Size of a request header field exceeds server limit.</p><div class="hands-settings"><section><h2>Try a fresh browser window</h2><ol><li>Open a <strong>new browser window</strong> and visit the workshop portal again.</li><li>If the error persists, open a <strong>private / incognito window</strong>, visit the portal and sign in again.</li><li>Go to <strong>My Interactive Sessions</strong> and reconnect to your existing RStudio session.</li></ol><p><a href="https://dzif-galaxy-01.bifo.helmholtz-hzi.de" target="_blank" rel="noopener">Open the workshop portal ↗</a></p></section><section><h2>A browser / portal issue</h2><p>This appears to be an issue with <strong>Open OnDemand</strong>, the software we use to access RStudio through the browser, or its server configuration. It is not an error in your R code.</p><p><strong>Workshop workaround:</strong> try a new window; a private window gives you a separate browser session. A normal new window may still share the same cookies.</p><p>You do not need to delete your running RStudio session or launch another one. If the workaround does not help, ask the instructor.</p></section></div>`]);
const serverFaqItems=[
 ['r-session-faq','Why did my session fail to submit? (QOSMaxSubmitJobPerUserLimit)'],
 ['r-browser-faq','Why do I see “Bad Request” / “header field exceeds server limit”?']
];
const serverFaqHtml=`<details class="server-faq"><summary>FAQ · trouble opening RStudio?</summary><div class="server-faq-questions">${serverFaqItems.map(([id,question])=>`<details><summary>${question}</summary>${handsOnNew.find(slide=>slide[0]===id)[2]}</details>`).join('')}</div></details>`;
handsOnNew.find(slide=>slide[0]==='r-server')[2]+=serverFaqHtml;
const importHelpHtml=`<details class="server-faq import-help"><summary>Problems importing data?</summary><p>If the notebook works, keep its existing paths. Open these explanations only if a file cannot be found.</p>${['r-copy-paths','r-working-directory'].map(id=>{const slide=handsOnNew.find(s=>s[0]===id);return `<details><summary>${slide[1]}</summary>${slide[2]}</details>`;}).join('')}</details>`;
handsOnNew.find(s=>s[0]==='r-files')[2]+=importHelpHtml;
handsOnNew.find(s=>s[0]==='r-read-csv')[2]+=importHelpHtml;
const handsBodies=Object.fromEntries(handsOnNew.map(([id,title,extra])=>[id,{id,title,extra,note:'Day 2 · Part 2 · Hands-on with ComplexHeatmap',group:'Hands-on · R',images:[],bullets:[],credit:[],source:[]}]));
const assignmentExisting=Object.fromEntries(day2HeatmapSlides.filter(s=>s.id.startsWith('assignment-')).map(s=>[s.id,s]));
const handsStart=day2HeatmapSlides.findIndex(s=>s.id==='assignment-context');
const handsOrder=['hands-on','assignment-roadmap','r-server','r-connect','r-find-data','r-copy-files','r-install','r-files',...heatmapDataBasics.map(s=>s[0]),'r-preview','assignment-tables','r-first','r-settings','r-annotation-map','assignment-metadata','r-help'];
day2HeatmapSlides.splice(handsStart,4,...handsOrder.map(id=>handsBodies[id]||assignmentExisting[id]));

// Shared classroom experiment: compare assistance, preserve scientific meaning.
day2HeatmapSlides.push(
 {id:'working-with-ai',title:'Working with AI · explore together',group:'Working with AI',note:'Use the AI tools you already have: Claude, Codex, Gemini or another assistant.',images:[],bullets:[],credit:[],source:[],extra:`
 <div class="ai-tool-cards" aria-label="Examples of AI assistants"><div><img src="assets/day2-heatmaps/ai-claude.svg" alt=""><strong>Claude</strong></div><div><img src="assets/day2-heatmaps/ai-codex.svg" alt=""><strong>Codex</strong></div><div><img src="assets/day2-heatmaps/ai-gemini.svg" alt=""><strong>Gemini</strong></div></div>
 <p><strong>You are encouraged to use AI while working on your heatmap.</strong> Work with your assistant to understand the code, try design changes and investigate errors.</p>
 <div class="hm-checklist"><article><span>1</span><h2>Try a real task</h2><p>Start from your working plot. Ask for one improvement, an explanation of an argument, or help with an error. Run the suggested code and inspect the result.</p></article><article><span>2</span><h2>Compare experiences</h2><p>What worked? What failed? Did the assistant misunderstand the data, use the wrong library or change something you wanted to keep?</p></article><article><span>3</span><h2>Collect good practices</h2><p>Share one useful prompt, one mistake and one check that caught it. Together, turn these examples into advice for the next person.</p></article></div>
 <p><strong>Small experiment:</strong> try the same question with only your code, then add a plot image and the supplied dataset or a pasted table with column names. Does the answer improve? What is still misunderstood?</p>
 <p class="day2-note">Record: task → context supplied → suggestion → what you tested → outcome. A suggestion that sounds convincing still needs checking.</p>`},
 {id:'ai-good-practices',title:'Working with AI · good practices',group:'AI tools',note:'Give context. Make one change. Check the result.',images:[],bullets:[],credit:[],source:[],extra:`
 <div class="ai-practice-grid">
 <article><span class="ai-practice-icon" aria-hidden="true">${'<svg viewBox="0 0 48 48"><path d="M10 7h20l8 8v26H10zM30 7v10h8M17 24h14M17 31h10"/></svg>'}</span><h2>Keep the original</h2><p>Save your code and plot.<br>Compare before and after.</p></article>
 <article><span class="ai-practice-icon" aria-hidden="true">${'<svg viewBox="0 0 48 48"><path d="M8 9h32v25H23l-10 8v-8H8zM15 17h18M15 24h13"/></svg>'}</span><h2>Give context</h2><p>Code + plot + approved data.<br>Name <strong>ComplexHeatmap</strong> and <a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/" target="_blank" rel="noopener">link its docs</a>.</p></article>
 <article><span class="ai-practice-icon" aria-hidden="true">${'<svg viewBox="0 0 48 48"><rect x="10" y="21" width="28" height="21" rx="4"/><path d="M16 21v-9a8 8 0 0 1 16 0v9M24 29v6"/></svg>'}</span><h2>Keep meaning fixed</h2><p>Same values, samples and NA.<br>Check scale and annotation matches.</p></article>
 <article><span class="ai-practice-icon" aria-hidden="true">${'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="14"/><path d="m31 31 11 11M14 21l5 5 10-11"/></svg>'}</span><h2>Run &amp; inspect</h2><p>Try one change at a time.<br>Check the plot, not just the code.</p></article>
 </div>
 <div class="ai-prompt-pair"><section><h2>Ask for ideas</h2><p>“What would make this heatmap easier to interpret? Suggest three improvements before editing.”</p></section><section><h2>Ask for a check</h2><p>“Compare both versions. Did any data, scaling or sample annotations change unintentionally?”</p></section></div>
 <details><summary>Two more questions to try</summary><p>“What might a reader misunderstand about the colours, missing values or ordering?”</p><p>“Which ordering would best answer my biological question, and why?”</p></details>`}

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

const aiWorkflowSteps = [
 {label:'Give the task',chat:['You','Ask + paste context','Explain this heatmap error.'],agent:['You','Set a goal + scope','Fix the script in this folder.']},
 {label:'Inspect & suggest',chat:['AI','Suggest a change','Returns an explanation and code.'],agent:['Agent','Inspect the files','Reads relevant code and data.']},
 {label:'Make the change',chat:['You','Copy & edit','Apply the suggestion in RStudio.'],agent:['Agent','Edit the script','Writes changes within its permissions.']},
 {label:'Run & iterate',chat:['You','Run + report back','Share the plot or error; ask again.'],agent:['Agent','Run + check + revise','Uses tool results to try the next step.']},
 {label:'Review the result',chat:['You','Check the science','Compare data, labels and meaning.'],agent:['You','Review edits + plot','Accept only after checking the result.']}
];
const aiWorkflowSlide = day2HeatmapSlides.find(s=>s.id==='ai-chat-agent');
aiWorkflowSlide.note='Same goal: improve a heatmap. Who does the work at each step?';
aiWorkflowSlide.extra=`<div class="ai-flow-controls"><button id="ai-flow-next">Reveal next step →</button><button id="ai-flow-all">Show all</button><button id="ai-flow-reset">Restart</button><span id="ai-flow-status" aria-live="polite">Step 1 of 5 · Give the task</span></div><div class="ai-flow-columns">${[['chat','Chat-based help','You choose which suggestions to apply in RStudio.'],['agent','Agentic AI','Claude Code / Codex can edit and run within permissions.']].map(([key,title,subtitle])=>`<section class="ai-flow-${key}"><h2>${title}</h2><p class="ai-flow-subtitle">${subtitle}</p><ol>${aiWorkflowSteps.map((step,i)=>`<li data-flow-lane="${key}" data-flow-step="${i}" ${i?'hidden':''}><span class="ai-flow-number">${i+1}</span><div><span class="ai-flow-owner ${step[key][0]==='You'?'is-human':'is-agent'}">${step[key][0]}</span><strong>${step[key][1]}</strong><p>${step[key][2]}</p></div></li>`).join('')}</ol></section>`).join('')}</div><div class="ai-flow-teaching"><p><strong>Chat-based tools are completely fine for this exercise.</strong> With a basic chat workflow, you decide what to copy, change and run—giving you direct control over each edit. Agents can make more changes for you, so set their scope and review the result.</p><p><strong>Tomorrow · live demo:</strong> I’ll use <strong>Claude Code</strong> to bring several plots into a consistent aesthetic for a journal submission.</p></div><p class="ai-flow-takeaway" id="ai-flow-takeaway" hidden><strong>The agent can run the technical loop. You still check the scientific meaning.</strong></p><details><summary>Tools, permissions and examples</summary><p>A chatbox can also have agent tools. What matters is access: reading files, editing code and running commands. Actions may run locally or in a remote workspace, within configured permissions.</p><p><a href="https://learn.chatgpt.com/docs/cli" target="_blank" rel="noopener">Codex documentation</a> · <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">Claude Code documentation</a></p></details>`;
// Each build is a normal slide, controlled by the deck's Next / Previous buttons.
const aiWorkflowTemplate = aiWorkflowSlide.extra.replace(/<div class="ai-flow-controls">[\s\S]*?<\/div>/, '');
const aiWorkflowBuilds = Array.from({length:10},(_,index)=>{
 const phase=index<5?'chat':'agent';
 const step=index%5;
 let extra=aiWorkflowTemplate.replace(/<li data-flow-lane="(chat|agent)" data-flow-step="(\d)"[^>]*>/g,(_,lane,n)=>{
  const visible=lane==='chat' ? Number(n)<=Math.min(index,4) : index>=5 && Number(n)<=step;
  return `<li data-flow-lane="${lane}" data-flow-step="${n}"${visible?'':' hidden'}${lane===phase&&Number(n)===step?' class="is-current"':''}>`;
 });
 if(phase==='chat')extra=extra.replace('<section class="ai-flow-agent">','<section class="ai-flow-agent" hidden>');
 extra=extra.replace('id="ai-flow-takeaway" hidden',`id="ai-flow-takeaway"${index===9?'':' hidden'}`);
 return {...aiWorkflowSlide,id:index===0?'ai-chat-agent':`ai-chat-agent-${index+1}`,
  note:`${phase==='chat'?'Chat-based help':'Agentic AI'} · ${step+1} / 5 · ${aiWorkflowSteps[step].label}`,extra};
});
day2HeatmapSlides.splice(day2HeatmapSlides.findIndex(s=>s.id==='ai-chat-agent'),1,...aiWorkflowBuilds);

const aiBreakoutSlide={id:'ai-breakout',title:'Breakout rooms · improve one heatmap together',group:'AI tools',note:'3–5 people per room · one shared screen · one change at a time',images:[],bullets:[],credit:[],source:[],extra:`
<div class="ai-room-diagram">
 <section class="ai-room-people"><h2>Discuss as a group</h2><div class="ai-room-avatars" aria-label="A group of four participants">${['#4378b6','#8960b5','#267568','#b77939'].map(c=>`<svg viewBox="0 0 64 70" aria-hidden="true"><circle cx="32" cy="20" r="13" fill="${c}"/><path d="M8 65V54a24 24 0 0 1 48 0v11" fill="${c}" opacity=".7"/></svg>`).join('')}</div><p class="ai-room-bubble">“Can we make the NA values grey?”</p><p class="ai-room-bubble">“Let’s find a clearer colour scale.”</p><p class="ai-room-bubble">“Did the data or sample order change?”</p></section>
 <div class="ai-room-arrow" aria-hidden="true">→</div>
 <section class="ai-room-screen"><h2>One person shares their screen</h2><div class="ai-room-windows"><div><h3>AI chat · e.g. ChatGPT</h3><p class="ai-room-prompt">“Use R + ComplexHeatmap. Show missing cells in grey. Keep the data, order and 0–1 scale unchanged.”</p><p class="ai-room-response">Read the suggestion together.<br>Decide what to try.</p></div><div><h3>RStudio · your notebook</h3><pre><code>Heatmap(mat,
  na_col = "grey80",
  ...
)</code></pre><p>Apply the change → run the chunk → inspect the plot.</p><div class="ai-room-matrix" aria-label="Schematic heatmap with grey missing cells">${['#eaf3dc','#9fcca3','#267568','#d4d4d4','#9fcca3','#267568','#eaf3dc','#9fcca3','#d4d4d4','#eaf3dc','#9fcca3','#267568'].map(c=>`<span style="background:${c}"></span>`).join('')}</div></div></div><p class="ai-room-caption">Rotate who types. Everyone helps choose, interpret and check.</p></section>
</div><div class="ai-room-share"><strong>Bring back:</strong> one before/after plot · one useful prompt · one mistake or surprise</div>`};
day2HeatmapSlides.splice(day2HeatmapSlides.findIndex(s=>s.id==='working-with-ai')+1,0,aiBreakoutSlide);

const filterParts={
 save:['Save a new object','<- stores the result in selected. long_df stays unchanged.','save'],
 source:['Start with the original table','long_df is the input data frame. Square brackets select from it.','source'],
 genome:['Test the genome','== checks equality. Each row gets TRUE if Genome is Turicimonas_muris_YL45, otherwise FALSE.','genome'],
 and:['Require both conditions','& combines the two tests row by row. A row is kept only if both are TRUE.','both'],
 day:['Test the study day','Keep rows where day equals 9. This is a study-day label, not a row number.','day'],
 columns:['Keep every column','The comma separates rows from columns: [rows, columns]. Nothing after the comma means keep all columns.','both'],
 count:['Count the selected rows','nrow(selected) counts SNP/sample measurements, not mice. The full result is 24 SNPs × 4 samples = 96 rows, including NA values.','both']
};
const filterToken=(id,text)=>`<button class="filter-code-token token-${id}" data-filter-part="${id}" aria-pressed="false">${consistencyEscape(text)}</button>`;
const filterSlide=day2HeatmapSlides.find(s=>s.id==='r-filter');
filterSlide.note='Explore [rows, columns] · hover, focus or click a coloured piece of code.';
filterSlide.extra=`<div class="filter-explorer"><section><h2>Read the code in pieces</h2><pre class="filter-code">${filterToken('save','selected <-')} ${filterToken('source','long_df[')}
  ${filterToken('genome','long_df$Genome == "Turicimonas_muris_YL45"')} ${filterToken('and','&')}
    ${filterToken('day','long_df$day == 9')}${filterToken('columns',',')}
${filterToken('columns',']')}
${filterToken('count','nrow(selected)')}</pre><div class="filter-explanation" aria-live="polite"><h2 id="filter-explain-title"></h2><p id="filter-explain-text"></p></div><details><summary>Copy the complete R code</summary>${rCode('selected <- long_df[\n  long_df$Genome == "Turicimonas_muris_YL45" &\n    long_df$day == 9,\n]\nnrow(selected)')}</details></section><section><h2>Which rows pass this test?</h2><p class="day2-note">Illustrative excerpt · names shortened · each row is one SNP/sample measurement.</p><table class="filter-demo-table"><thead><tr><th>Genome</th><th>Day</th><th>Pass?</th></tr></thead><tbody>${[['Akkermansia',9],['Turicimonas',0],['Turicimonas',9],['Bacteroides',9],['Turicimonas',9],['Turicimonas',30]].map(([g,d])=>`<tr data-filter-genome="${g}" data-filter-day="${d}"><td>${g}</td><td>${d}</td><td class="filter-pass"></td></tr>`).join('')}</tbody></table><p id="filter-table-caption"></p><details><summary>Reveal the full dataset result</summary>${rCode('[1] 96')}<p>24 Turicimonas SNPs × 4 mouse/day samples. Missing values are kept: the filter tests genome and day, not frequency.</p></details><p><strong>Your turn:</strong> predict what changes if you use <code>day == 30</code>, then try it in R.</p></section></div>`;
function bindFilterExplorer(){
 const show=(id,active)=>{
  const [title,description,mode]=filterParts[id];
  document.querySelector('#filter-explain-title').textContent=title;
  document.querySelector('#filter-explain-text').textContent=description;
  document.querySelectorAll('[data-filter-part]').forEach(el=>el.setAttribute('aria-pressed',String(el===active)));
  const test=['genome','day','both'].includes(mode);
  let count=0;
  document.querySelectorAll('[data-filter-genome]').forEach(row=>{
   const genome=row.dataset.filterGenome==='Turicimonas', day=row.dataset.filterDay==='9';
   const passes=mode==='genome'?genome:mode==='day'?day:genome&&day;
   row.classList.toggle('filter-kept',test&&passes);row.classList.toggle('filter-dropped',test&&!passes);
   row.querySelector('.filter-pass').textContent=test?(passes?'TRUE · keep':'FALSE'):'—';
   if(passes)count++;
  });
  document.querySelector('#filter-table-caption').textContent=test?`${count} of these 6 example rows pass ${mode==='both'?'both conditions':mode==='genome'?'the genome test alone':'the day test alone'}.`:'The original table remains unchanged. Select a condition to see which rows pass.';
 };
 document.querySelectorAll('[data-filter-part]').forEach(el=>{el.onclick=el.onmouseenter=el.onfocus=()=>show(el.dataset.filterPart,el);});
 show('and');
}

// Shared, keyboard-accessible explanations for the short R walkthroughs.
const rCodeGlossary={
 'read.csv':['Import a CSV','Reads the file into a data frame. The path must point to an existing CSV.'],
 'path.expand':['Expand the home-folder path','Replaces ~ with your home directory. This does not change the working directory.'],
 'file.path':['Build a file path','Joins the folder and filename using the appropriate path separator.'],
 'data_dir':['The data folder','Stores the path to your personal copy of the data.'],
 'long_df':['The long table','One row per SNP/sample measurement. Columns include the genome, mouse, day and frequency.'],
 'wide_df':['The wide table','One row per SNP; each sample has its own frequency column. Metadata columns must be separated before making a matrix.'],
 'check.names':['Keep sample names intact','With FALSE, R preserves names such as 1683-0 instead of making syntactically valid replacements.'],
 'FALSE':['A logical setting','Turns this option off. In check.names = FALSE, it disables automatic column-name repair.'],
 'head':['Preview the first rows','Shows the first few rows or vector entries without changing the object. The second argument controls how many.'],
 'str':['Inspect structure','Prints the object structure: number of observations, variables, column types and example values. It does not convert the data.'],
 'table':['Count categories','Counts how often each label occurs. Here it counts measurement rows per genome, not mice.'],
 'Genome':['Genome labels','Identifies the bacterial genome associated with each SNP measurement.'],
 '$':['Select one named column','long_df$Genome extracts the Genome column as a vector.'],
 'is.na':['Find missing entries','Returns TRUE for missing values and FALSE otherwise. A measured zero returns FALSE.'],
 'sum':['Add the values','On a TRUE/FALSE vector, TRUE counts as 1 and FALSE as 0. On missing_per_sample it adds the counts.'],
 'value':['Allele frequencies','The numeric measurement used for heatmap colour. NA means unavailable; 0 is an observed frequency.'],
 'selected':['The filtered table','From the previous example: Turicimonas on day 9. Its missing-value count depends on which filter you ran.'],
 'setdiff':['Exclude metadata names','Returns names in the first vector that are absent from the second. This keeps sample columns and excludes Genome, snp_id and Position.'],
 'names':['Read column names','Returns the names of the data-frame columns, not their contents.'],
 'c':['Combine into a vector','Combines the listed column names so they can be selected or excluded together.'],
 'sample_cols':['Sample-column names','The frequency-column names remaining after metadata columns were removed.'],
 'as.matrix':['Convert to a matrix','Converts the selected sample columns to a matrix. Text columns can make the whole matrix character, so exclude metadata first.'],
 'mat':['The heatmap matrix','Numeric SNP rows × sample columns. NA values remain missing.'],
 'rownames':['Set row labels','Assigning here changes row names, not the underlying measurements.'],
 'paste':['Join labels','Combines each row’s genome and SNP ID into a readable label.'],
 'sep':['Choose a separator','Controls the text placed between the joined labels: here, a vertical bar with spaces.'],
 'snp_id':['SNP identity','Identifies the variant. Keep it as metadata or a row label rather than a heatmap measurement.'],
 'dim':['Check the dimensions','Returns the number of rows followed by the number of columns.'],
 'is.numeric':['Check numeric storage','Returns TRUE when the matrix is numeric. This check does not convert it.'],
 'colSums':['Add down each column','After is.na(mat), counts the missing SNP measurements within each sample column.'],
 'missing_per_sample':['A count for each sample','A named vector: each number counts missing entries in one sample column.'],
 '<-':['Assign the result','Stores the expression on the right in the object named on the left.'],
 '[':['Select rows and columns','Use [rows, columns]. An empty row position keeps all rows; an empty column position keeps all columns.'],
 ',':['Separate arguments or dimensions','Inside [rows, columns], the comma separates row selection from column selection. Inside a function call, it separates arguments.'],
 '3':['Show three rows','In head(..., 3), request the first three rows.'],
 '4':['Show four entries','In head(..., 4), request the first four sample counts.'],
 'Heatmap':['Create a heatmap object','Builds a ComplexHeatmap object from the matrix and display settings. Use a capital H.'],
 'ht':['Store the heatmap','Holds the heatmap object in memory; this is not an exported image file.'],
 'draw':['Display the heatmap','Renders the stored heatmap on the current graphics device, such as the Plots pane or an open PDF device.']
};
function interactiveRCode(code){
 const tokens=code.match(/#[^\n]*|"[^"\n]*"|'[^'\n]*'|<-|[A-Za-z_.][A-Za-z0-9_.]*|\d+|[^A-Za-z0-9_.'"#]+|./g)||[];
 // Split punctuation runs while preserving whitespace and original source exactly.
 return tokens.map(token=>{
  if(token.startsWith('#')||token.startsWith('"')||token.startsWith("'"))return consistencyEscape(token);
  const pieces=rCodeGlossary[token]?[token]:token.split(/([\[$,])/);
  return pieces.map(part=>rCodeGlossary[part]?`<button class="r-explain-token" data-r-explain="${consistencyEscape(part)}" aria-pressed="false">${consistencyEscape(part)}</button>`:consistencyEscape(part)).join('');
 }).join('');
}
for(const [id,title,intro,code,output,explanation,note,exercise] of heatmapDataBasics){
 if(id==='r-filter')continue;
 const slide=day2HeatmapSlides.find(s=>s.id===id);
 const outputHtml=id==='r-str'?`<p class="day2-note">Shortened str() output · select a column type to explore it.</p><pre class="r-interactive-code">3072 observations; 7 variables
${[['Genome','character','Bacterial genome labels: text used for grouping or annotations.'],['snp_id','character','Variant labels: identifiers, not measurements.'],['Position','integer','A numeric genome coordinate. It is metadata, so exclude it from the frequency matrix.'],['value','numeric','Allele frequency: the measurement used for heatmap colours.'],['mouse_id','integer','A numeric identifier. The storage type does not make it a measurement.'],['day','integer','Study day: useful for ordering samples and annotations.'],['treatment_group','character','Treatment labels: categorical metadata for annotations.']].map(([name,type,meaning])=>`<button class="r-explain-token" data-r-title="${name} · ${type}" data-r-description="${meaning}" aria-pressed="false">${name.padEnd(16)}: ${type}</button>`).join('\n')}</pre>`:`<details><summary>Reveal expected output</summary>${rCode(output)}</details>`;
 slide.extra=`<p>${consistencyEscape(intro)}</p><p class="day2-note">Hover, focus or click a code fragment to explain it. Only the selected fragment is highlighted.</p><div class="r-explorer-grid"><section><h2>Try it in R</h2><pre class="r-interactive-code">${interactiveRCode(code)}</pre>${outputHtml}<details><summary>Copy the complete R code</summary>${rCode(code)}</details></section><section><div class="r-explain-panel" aria-live="polite"><h2 id="r-explain-title">What does this code do?</h2><p id="r-explain-description">${consistencyEscape(explanation)}</p></div><p class="day2-note">${consistencyEscape(note)}</p><h2>Your turn</h2><p>${consistencyEscape(exercise)}</p></section></div>${id==='r-read-csv'?importHelpHtml:''}`;
}
function bindRCodeExplorer(){
 document.querySelectorAll('.r-explain-token').forEach(el=>{
  const show=()=>{
   document.querySelectorAll('.r-explain-token').forEach(token=>token.setAttribute('aria-pressed',String(token===el)));
   const entry=el.dataset.rExplain?rCodeGlossary[el.dataset.rExplain]:[el.dataset.rTitle,el.dataset.rDescription];
   document.querySelector('#r-explain-title').textContent=entry[0];
   document.querySelector('#r-explain-description').textContent=entry[1];
  };
  el.onclick=el.onmouseenter=el.onfocus=show;
 });
}

const motivationValues=[[0.1,0.2,0.8,0.9],[0.2,0.1,0.9,0.8],[0.8,0.7,0.2,0.1]];
function motivationMatrix(coloured){return `<table class="motivation-matrix"><thead><tr><th></th>${['S1','S2','S3','S4'].map(s=>`<th>${s}</th>`).join('')}</tr></thead><tbody>${motivationValues.map((row,i)=>`<tr><th>Feature ${i+1}</th>${row.map(v=>`<td style="${coloured?`background:hsl(165 38% ${96-v*62}%);color:${v>.65?'white':'#234653'}`:''}">${v.toFixed(1)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
const heatmapMotivationSlides=[
 {id:'why-heatmaps',title:'Why heatmaps? · see the data’s structure',note:'Turn a table of measurements into a visual overview—without reducing everything to one average.',group:'Reading heatmaps',images:[],bullets:[],credit:[],source:[],extra:`<div class="hands-settings"><section><h2>A table gives you the values</h2>${motivationMatrix(false)}<p>Exact numbers are available, but comparing many rows and columns takes effort.</p></section><section><h2>Colour makes patterns easier to spot</h2>${motivationMatrix(true)}<p>Which samples look similar? Which features change together? Where are unusual or missing values?</p><p class="day2-note">Illustrative values · light = low, dark = high · scale 0–1.</p></section></div><p class="wd-ready"><strong>Build an intuition for the data:</strong> see variation, similarities and exceptions across individual measurements.</p><p class="day2-note">A heatmap can show original measurements, but it may also show transformed or scaled values. Always state what the colours represent; a visible pattern is a starting point for investigation, not proof of an effect.</p>`},
 {id:'why-complexheatmap',title:'Our tool · ComplexHeatmap in R',note:'Biological heatmaps can be challenging to design—but very useful when the choices are clear.',group:'Reading heatmaps',images:[],bullets:[],credit:[],source:[],extra:`<div class="hands-teaching-flow"><article><span class="hands-stage">1 · Start simply</span><h2>A small first step</h2>${rCode('ht <- Heatmap(mat)\ndraw(ht)')}<p>With the package loaded and a numeric matrix ready, a basic plot takes just a few lines.</p></article><article><span class="hands-stage">2 · Add context</span><h2>Rich annotations</h2><p>Add treatment, mouse or study-day strips; label features; include bars or other summaries beside the matrix.</p><div class="motivation-annotation" aria-label="Schematic sample annotation strip"><span>Control</span><span>Control</span><span>Treatment</span><span>Treatment</span></div><p class="day2-note">Annotations explain the rows and columns.</p></article><article><span class="hands-stage">3 · Refine the figure</span><h2>Room to grow</h2><p>Control colours, ordering, clustering, splits and legends. Combine related heatmaps while keeping their rows or columns aligned.</p><p><strong>We will add one feature at a time.</strong></p></article></div><p class="wd-ready"><strong>In biology, the effort pays off:</strong> a well-designed heatmap can reveal patterns across genes, microbes, treatments and time points. Clear scales, ordering and annotations help readers interpret those patterns correctly.</p><p><a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/introduction.html" target="_blank" rel="noopener">ComplexHeatmap reference ↗</a> · <a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/heatmap-annotations.html" target="_blank" rel="noopener">Annotation examples ↗</a></p>`}
];
day2HeatmapSlides.splice(day2HeatmapSlides.findIndex(s=>s.id==='encoding'),0,...heatmapMotivationSlides);
