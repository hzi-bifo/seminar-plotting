// A reproducible starting figure, connected to the Day 1 and Day 2 assignments.
const generativePanels = [
  ['a', 'qPCR over time', 'R · base graphics', 'Day 1 · YL44 group means across study days.', 'plot.R'],
  ['b', 'qPCR at day 9', 'Python · Matplotlib', 'Day 1 · YL44 mean ± SD, four mice per group.', 'plot.py'],
  ['c', 'qPCR distributions', 'R · ggplot2', 'Day 1 · YL32 boxes and individual mice.', 'plot.R'],
  ['d', 'Community PCA', 'Python · NumPy', 'Day 2 · 12 taxa, scaled log10 abundances.', 'plot.py'],
  ['e', 'SNP-frequency heatmap', 'R · base graphics', 'Day 2 · Five SNPs, four mice, four time points.', 'plot.R'],
  ['f', 'Two taxa, one sample', 'Python · Matplotlib', 'Day 1 · Matched YL44 and I48 abundances.', 'plot.py']
];
const generativePrompt = `Help plan the redesign of the six-panel figure in example_plot for a scientific manuscript.

First read the README, datasets and plotting scripts to understand the panels. Your first deliverable is a separate visual design-guide artifact showing how the finished figure should look.

Include treatment names and colours (with hex codes), marker shapes, line styles and widths, fonts and text sizes, axes and grid styling, uncertainty styling, a heatmap colour scale, legends, panel letters and spacing. Plan two columns and three rows: a/b at the top, c/d in the middle, e/f at the bottom. Design for a final width of 180 mm and specify sizes at that final scale.

Use schematics only: colour swatches, marker and line samples, example labels, a schematic legend and empty panel frames. Label these as design examples. Do not replot the datasets, recreate the real panels, invent data patterns or edit the plotting scripts at this stage.

Explain the choices and which axes could share limits versus which measure different quantities. Preserve the meaning of groups, shapes, transformations and uncertainty.

Provide the guide as a downloadable, standalone design_guide.html with inline CSS and SVG schematics, no external assets or dependencies. It must open offline and contain the written design specifications as well as the visual examples. Deliver this artifact first and stop for review. Apply the agreed design to the actual plots only in a later step.`;

const generativeGraphicsPrompt = `I have inspected the first design-guide artifact. Revise the existing design_guide.html using my comments before we generate any plots.

My review comments: [replace with your specific comments on colours, shapes, label sizes, spacing or layout, or write "none"]. Apply these comments and briefly explain what changed in response to each one. Preserve design choices I have not asked to change.

Our example improvement is to add useful, editable SVG schematics to the guide. Read the panel READMEs, data descriptions and plotting scripts to understand the biological context before proposing graphics.

Decide which panels, or which shared part of the figure, would benefit from a small contextual graphic. You choose the subjects, number and placement; do not add an icon to every panel by default. Prefer graphics that explain a biological entity, sampling scheme, measurement or connection between panels. Explain briefly what each proposed graphic helps the reader understand.

Create original, editable SVG assets that fit the guide's palette, stroke widths and visual style. Use transparent backgrounds, simple vector shapes and paths, and no external dependencies or embedded raster images. Keep labels as editable text where practical. Check that the schematics are biologically plausible and do not imply an experimental step, causal relationship or result unsupported by the supplied materials. Label them as schematics.

Show two layout options in the HTML guide using schematic panel frames and the proposed SVG graphics. Compare them at the intended 180 mm figure width, choose the clearer option and refine it. Check legibility, consistency, contrast, whitespace and whether the graphics compete with data or legends. Remove anything that adds clutter rather than context.

Deliver a revised standalone design_guide.html with the SVG previews embedded, plus separate named files in graphics/. Include the chosen placement, dimensions in mm, relevant panel or shared location, and short integration notes for the plotting or assembly agent. Keep an untouched copy of the previous guide and summarise the changes. Do not modify datasets, analyses or plotting scripts at this stage. The deliverable is the refined guide and reusable SVG assets for review, ready to add to the real figure later.`;

const generativePanelPrompt = `You are implementing an agreed figure design. I have attached design_guide.html and the example_plot folder with all six datasets, original plotting scripts and READMEs.

If the reviewed guide includes contextual graphics, also use the supplied graphics/ SVG assets and placement notes. Add them only at the agreed locations, preserve their proportions, and keep them clear of data marks and labels.

Read the standalone HTML guide, including its written specifications and schematic examples. Treat it as the design specification, not as measured data. Inspect the CSVs and original scripts before making changes.

Create a new set of reproducible plotting scripts for panels a-f that follows the guide: treatment colours and names, marker shapes, line styles, fonts, final-size text, axes, grids, legends, heatmap scale and margins. Retain each panel's original R or Python language. Define reusable style settings in each language so that equivalent settings stay consistent across all panels.

Read the original CSVs unchanged. Preserve every mouse and time point, repeated-measure identities, supplied log10 values, mean ± sample SD, PCA centering and scaling, and the heatmap's original 0-1 frequencies. Do not add statistical tests, observations or significance claims. Do not force the same numerical axes on different quantities. Flag any conflict between the guide and these requirements instead of silently changing the analysis.

Save the new code and exports under optimized/panel_a through optimized/panel_f, leaving the originals intact. Run the scripts and export each panel as a vector PDF, SVG and PNG preview. Size panels for the guide's two-column layout at 180 mm total width; include space for labels and legends. Keep global panel letters for the assembly step.

Provide optimized/render_panels.py (or an equivalent single command), dependency instructions, a short README and a record of checks showing that the plotted values and summaries still match the originals. Inspect every export for clipping and legibility. Deliver the six separate panels and their code for review; do not assemble the final figure yet.`;

const generativeAssemblyPrompt = `Assemble the six reviewed panels into one manuscript figure. I have supplied design_guide.html and optimized/ containing panels a-f, their source code and vector exports.

If the reviewed guide includes graphics/ SVG assets, include them at the agreed locations and sizes. Keep them as vectors, separate from measured evidence and clear of labels and legends.

Use the guide's colours, typography, spacing and final-size specifications. Arrange two columns and three rows, read from left to right:
Top row: a - YL44 qPCR time course; b - day 9 YL44 mean ± SD.
Middle row: c - day 9 YL32 distribution; d - community PCA.
Bottom row: e - YL44 SNP-frequency heatmap; f - YL44 versus I48 scatterplot.

Use 180 mm total width, equal column widths, consistent outer margins and approximately 4 mm gutters. Start around 180 mm high and increase the height if labels need room. Align plotting areas within rows and columns, not just file boundaries. Place bold lowercase panel letters a-f consistently at the upper left of each panel. Keep labels at the guide's final printed size; do not shrink text simply to force the layout to fit.

Use a shared treatment legend below the panel grid only where colours and shapes mean the same thing; retain any panel-specific keys and the heatmap's own frequency colourbar. Keep all axis labels, tick labels and units visible. Preserve aspect ratios and all data and analysis choices. If panel margins or label sizes need adjustment, update the plotting code and regenerate the affected panel instead of stretching or painting over it.

Assemble from the vector PDF or SVG exports so text and lines remain vector content. Save reproducible assembly code, final/figure_combined.pdf and a 300 dpi final/figure_combined.png. Include a separate caption explaining each panel, group sizes, repeated measurements, mean ± SD, PCA preprocessing and the heatmap subset. State that the heatmap contains one mouse per group measured on four days; do not imply that it has the same replication as the day 9 abundance panels.

Inspect the complete figure at its intended printed size. Check panel order, alignment, clipping, legend consistency, readability and that every panel matches its reviewed source. Provide the finished figure, caption and one command to rebuild it.`;

function generativeToolsPage(requestedStep) {
  current = -1;
  const step = Math.max(0, Math.min(7, (Number(requestedStep) || 1) - 1));
  const root = 'example_plot';
  const slides = [
    ['Use generative tools', `
      <p class="generative-intro">One project, six collaborator exports. Can you make them look like one figure?</p>
      <figure class="generative-start">
        <a href="${root}/figure_unoptimized.pdf" target="_blank" rel="noopener" title="Open the full-size vector PDF">
          <img src="${root}/figure_unoptimized.png" alt="Unoptimized six-panel microbiome figure: qPCR time course, bar chart, box plot, PCA, SNP heatmap and scatterplot, with inconsistent colours, fonts, line widths and alignment.">
        </a>
        <figcaption>Starting version · existing Day 1 &amp; Day 2 data · intentionally inconsistent design</figcaption>
      </figure>
      <div class="generative-downloads"><a href="https://claude.ai/artifact/BL52eaBuPtS4jLjVEhsBCe" target="_blank" rel="noopener">Open the generated design guide in Claude ↗</a><a href="example_plot.zip" download>Download the full exercise (ZIP)</a><a href="${root}/figure_unoptimized.pdf" target="_blank" rel="noopener">Open figure PDF ↗</a><a href="${root}/README.md" target="_blank" rel="noopener">Read the instructions ↗</a></div>
      <details><summary>What should we improve?</summary><p>Follow one treatment across the panels. Its colour, name and position change. Compare fonts, line widths, legends, panel letters and plot-area alignment. Which differences distract, and which reflect different measurements?</p><p>These are new plotting scripts using the course’s existing data. The qPCR table contains abundance estimates, not raw Ct/Cq values. The heatmap shows SNP frequencies, not gene expression.</p></details>`],
    ['Every panel comes with its data and code', `
      <p>Open a panel and inspect its data and code. Use these files to inform the design guide before changing the plots.</p>
      <section class="generative-panel-grid" aria-label="Six reproducible figure panels">${generativePanels.map(([id, title, tool, context, script]) => `
        <article class="generative-panel-card"><a class="generative-panel-preview" href="${root}/panel_${id}/figure.pdf" target="_blank" rel="noopener" aria-label="Open panel ${id}: ${title}"><img src="${root}/panel_${id}/figure.png" alt="Panel ${id}: ${title}"></a>
        <h2>${id} · ${title}</h2><p class="generative-tool">${tool}</p><p>${context}</p>
        <nav aria-label="Panel ${id} files"><a href="${root}/panel_${id}/dataset.csv" download>Data CSV</a><a href="${root}/panel_${id}/${script}" download>Code</a><a href="${root}/panel_${id}/figure.pdf" target="_blank" rel="noopener">PDF ↗</a><a href="${root}/panel_${id}/README.md" target="_blank" rel="noopener">README ↗</a></nav></article>`).join('')}
      </section>
      <details><summary>Recreate the whole figure</summary><p>Download and unzip the exercise. Install Python, R and the dependencies listed in its README. From the <code>example_plot</code> folder, run <code>python3 render_all.py</code>. This uses the included CSVs and recreates the panel exports and combined figure.</p><p><strong>Keep the sample structure:</strong> panels b, c, d and f use four mice per group at day 9. Panel e has one mouse per group measured on four days; it is a different assay with fewer mice.</p></details>`],
    ['Create a design-guide artifact first', `
      <p>Give the tool the complete folder. Ask for a visual guide to the intended style, using schematics only. Review it before asking the tool to replot the data.</p>
      <div class="generative-brief"><section><h2>A starting prompt</h2><pre id="generative-prompt" class="generative-prompt"></pre><button id="generative-copy">Copy prompt</button><span id="generative-copy-status" role="status"></span></section>
      <section class="generative-review"><h2>Review and download the guide</h2><ol><li><strong>Look for a visual artifact.</strong> Colour swatches, marker shapes, line samples, typography, a schematic legend and empty panel frames.</li><li><strong>Agree on the intended style.</strong> Can you follow each treatment through the proposed colours and shapes? Are axes, text and spacing consistent?</li><li><strong>Keep this step schematic.</strong> No reconstructed data plots or invented results. Discuss the guide before changing code.</li><li><strong>Save the handoff.</strong> Download the reviewed artifact as <code>design_guide.html</code>. Open it offline to check that its schematics and written specifications are included.</li></ol><p>Next, inspect the artifact, comment on it and request improvements. Our example adds editable SVG schematics before the guide goes to another agent.</p><a href="example_plot.zip" download>Download data, code, figures and READMEs</a></section></div>`],
    ['Let’s look at the generated design guide', `
      <section class="generative-artifact-spotlight" aria-label="Generated design-guide artifact">
        <p class="generative-artifact-label">Our generated artifact · Claude</p>
        <a class="generative-artifact-open" href="https://claude.ai/artifact/BL52eaBuPtS4jLjVEhsBCe" target="_blank" rel="noopener">Open the design guide <span aria-hidden="true">↗</span></a>
        <p>Open it in a new tab and inspect the proposed colours, shapes, typography and panel layout.</p>
      </section>
      <p class="generative-artifact-discuss"><strong>Discuss:</strong> What would you keep? What would you change?</p>
      <p>Next: turn your observations into comments and ask the agent to improve the artifact.</p>`],
    ['Query 2 · Inspect, comment and improve', `
      <p>Inspect the first artifact and give concrete feedback. Our example improvement: add useful, editable SVG schematics to the design guide.</p>
      <p><a href="https://claude.ai/artifact/BL52eaBuPtS4jLjVEhsBCe" target="_blank" rel="noopener">Open the design guide to inspect and comment ↗</a></p>
      <div class="generative-brief"><section><h2>Prompt to revise the artifact</h2><pre id="generative-prompt" class="generative-prompt"></pre><button id="generative-copy">Copy prompt</button><span id="generative-copy-status" role="status"></span></section>
      <section class="generative-review"><h2>Review before moving on</h2><ol><li><strong>Inspect the artifact.</strong> Look at colours, marker shapes, typography, line widths and the proposed panel arrangement.</li><li><strong>Make specific comments.</strong> For example: “These two colours are hard to distinguish” or “Make the legend labels larger.” Add your feedback to the prompt.</li><li><strong>Request an improvement.</strong> In our example, ask for SVG schematics that add biological context. Let the agent suggest where they help and show placement options.</li><li><strong>Inspect the revision.</strong> Check the updated guide and editable SVG assets. Keep useful changes, comment again where needed, and agree on the design before plotting.</li></ol><p>Download the revised <code>design_guide.html</code> and the separate <code>graphics/</code> SVG files. Hand these to the next agent with the exercise folder.</p><p>The artifact remains schematic at this stage; no data panels are replotted yet.</p></section></div>`],
    ['Query 3 · Give another agent the guide', `
      <p>Attach the reviewed <code>design_guide.html</code>, the <code>graphics/</code> SVG files and the complete <code>example_plot</code> folder to a new agent. Ask it to produce the six panels and their code.</p>
      <div class="generative-brief"><section><h2>Prompt for the plotting agent</h2><pre id="generative-prompt" class="generative-prompt"></pre><button id="generative-copy">Copy prompt</button><span id="generative-copy-status" role="status"></span></section>
      <section class="generative-review"><h2>From guide to reproducible panels</h2><ol><li><strong>Provide both inputs.</strong> The guide specifies the appearance; the CSVs and original scripts specify the measurements and calculations.</li><li><strong>Generate new code.</strong> Keep the starting files and save the revised R/Python scripts in <code>optimized/</code>.</li><li><strong>Review six separate outputs.</strong> Check each PDF/SVG against the guide and compare values with the original panel.</li><li><strong>Keep the rebuild command.</strong> The next agent should be able to regenerate a panel if the final layout needs different margins.</li></ol><p>The deliverable is six consistent panels with editable code. Assembly is the next query.</p></section></div>`],
    ['Query 4 · Assemble the final figure', `
      <p>Provide the reviewed panels, their code and the same design guide. Give the agent an explicit reading order and layout.</p>
      <div class="generative-brief"><section><h2>Prompt for figure assembly</h2><pre id="generative-prompt" class="generative-prompt"></pre><button id="generative-copy">Copy prompt</button><span id="generative-copy-status" role="status"></span></section>
      <section class="generative-review"><h2>Two columns · three rows</h2><table class="generative-layout"><caption>Schematic layout · 180 mm final width</caption><tbody><tr><td><strong>a</strong><br>qPCR time course</td><td><strong>b</strong><br>qPCR mean ± SD</td></tr><tr><td><strong>c</strong><br>qPCR distribution</td><td><strong>d</strong><br>Community PCA</td></tr><tr><td><strong>e</strong><br>SNP heatmap</td><td><strong>f</strong><br>Two-taxon scatterplot</td></tr></tbody></table><p>Keep equal column widths, consistent gutters and aligned plotting areas. Allow enough height for readable labels.</p><p>Use a shared treatment legend where the encodings match; keep the heatmap colourbar with panel e.</p><p><strong>Final deliverables:</strong> vector PDF, 300 dpi PNG, separate caption and reproducible assembly code.</p></section></div>`],
    ['Before & after · From draft to consistent figure', `
      <p>Compare the starting figure with our optimized version. Follow one treatment across all six panels.</p>
      <div class="generative-comparison-controls" role="group" aria-label="Figure comparison view"><button data-figure-view="both" aria-pressed="true">Side by side</button><button data-figure-view="before" aria-pressed="false">Before</button><button data-figure-view="after" aria-pressed="false">After</button></div>
      <section class="generative-comparison" aria-label="Before and after figures">
        <figure data-figure-version="before"><figcaption>Before · mixed styles</figcaption><a href="${root}/figure_unoptimized.pdf" target="_blank" rel="noopener" aria-label="Open the original figure PDF at full size"><img src="${root}/figure_unoptimized.png" alt="Starting six-panel figure with different treatment colours, fonts, line widths, legends and panel alignment."></a></figure>
        <figure data-figure-version="after"><figcaption>After · optimized version</figcaption><a href="${root}/reference/figure_optimized.png" target="_blank" rel="noopener" aria-label="Open the optimized figure image at full size"><img src="${root}/reference/figure_optimized.png" alt="Optimized six-panel figure with consistent treatment colours and marker shapes, a shared legend, uniform typography and a grouped green SNP heatmap."></a></figure>
      </section>
      <p class="generative-comparison-note"><strong>Discuss:</strong> What changed in the colours, shapes, legends, axis ranges and heatmap ordering? What would you still improve?</p>
      <div class="generative-downloads"><a href="${root}/figure_unoptimized.pdf" target="_blank" rel="noopener">Open before PDF ↗</a><a href="${root}/reference/figure_optimized.png" target="_blank" rel="noopener">Open after image ↗</a><a href="${root}/reference/figure_optimized.png" download>Download optimized PNG</a></div>`]
  ];
  app.innerHTML = `<p class="presentation-kicker">Section 12 · Use generative tools</p><h1>${slides[step][0]}</h1>${slides[step][1]}<nav class="navigation footer-controls"><button id="generative-prev" ${step === 0 ? 'disabled' : ''}>Previous</button><span>${step + 1} / ${slides.length}</span><button id="generative-next" ${step === slides.length - 1 ? 'disabled' : ''}>${step === slides.length - 1 ? 'Finished' : 'Next'}</button></nav>`;
  document.querySelector('#generative-prev').onclick = () => { if (step > 0) location.hash = `generative-tools/${step}`; };
  document.querySelector('#generative-next').onclick = () => { if (step < slides.length - 1) location.hash = `generative-tools/${step + 2}`; };
  if (step === 7) {
    document.querySelectorAll('[data-figure-view]').forEach(button => {
      button.onclick = () => {
        const view = button.dataset.figureView;
        document.querySelector('.generative-comparison').classList.toggle('generative-comparison-single', view !== 'both');
        document.querySelectorAll('[data-figure-version]').forEach(figure => { figure.hidden = view !== 'both' && figure.dataset.figureVersion !== view; });
        document.querySelectorAll('[data-figure-view]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
      };
    });
  }
  const prompt = {2: generativePrompt, 4: generativeGraphicsPrompt, 5: generativePanelPrompt, 6: generativeAssemblyPrompt}[step];
  if (prompt) {
    document.querySelector('#generative-prompt').textContent = prompt;
    document.querySelector('#generative-copy').onclick = async () => {
      const status = document.querySelector('#generative-copy-status');
      try {
        await navigator.clipboard.writeText(prompt);
        status.textContent = 'Copied.';
      } catch {
        // Local file browsers may block clipboard access. Leave a usable selection.
        const range = document.createRange();
        range.selectNodeContents(document.querySelector('#generative-prompt'));
        const selection = window.getSelection();
        selection.removeAllRanges(); selection.addRange(range);
        status.textContent = 'Prompt selected. Press Ctrl+C or ⌘C to copy.';
      }
    };
  }
}
