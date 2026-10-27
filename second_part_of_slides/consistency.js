// Each stage changes one design decision and retains all earlier improvements.
const consistencyStages = [
  ['Start with the whole figure', 'Three cell populations measured over four days. What makes these panels difficult to compare?'],
  ['Use one font family', 'Use Arial throughout. Mixed typefaces no longer suggest different kinds of information.'],
  ['Use consistent font sizes', 'Give equivalent labels the same size across panels, with a consistent larger size for panel headings.'],
  ['Match equivalent line widths', 'Panel A had slightly thicker traces than B and C. All condition traces now have the same width.'],
  ['Align panels and repeat spacing', 'Align the plotting areas, repeat the gaps, and keep titles, axis labels and legends at consistent offsets.'],
  ['Keep colour meanings consistent', 'Control is blue and treated is orange in every panel. Circle and square markers also distinguish the conditions.'],
  ['Match equivalent marker sizes', 'Use a consistent marker size for each condition across panels and days. Marker size does not encode a measurement here.'],
  ['Use comparable axes', 'Use the same 0–100% range and ticks for all panels. Values are unchanged; heights can now be compared directly.'],
  ['Share the y-axis title', 'For this aligned row with identical units and scales, keep Marker-positive (%) on the left panel only. Retain tick numbers on every panel. Repeated titles can be preferable when panels are separated or must stand alone.'],
  ['Move legends into unused space', 'Place Control and Treated inside the upper-right corner of each panel. Here that space is clear of the measurements; an inside legend is useful only when it does not obscure data.'],
  ['Remove the distracting grid', 'Remove the dense background grid so the measurements stand out. Keep the axes and ticks for orientation. Light major grid lines can still help when readers need to compare exact values.'],
  ['Compare the starting and finished figures', 'All ten improvements work together. Check readability at the final display or print size.']
];
const consistencyData = [
  [[20, 25, 22, 28], [25, 32, 38, 43]],
  [[15, 19, 18, 22], [20, 27, 33, 40]],
  [[30, 34, 32, 36], [35, 43, 52, 61]]
];
function consistencyStyle(stage, p) {
    const aligned = stage >= 4;
    const x = (aligned ? [58, 290, 522] : [58, 312, 522])[p];
    const y = aligned ? 58 : [58, 83, 66][p];
    const family = stage >= 1 ? 'Arial,sans-serif' : ['Georgia,serif', 'monospace', 'Arial,sans-serif'][p];
    const size = stage >= 2 ? 13 : [15, 11, 13][p];
    const top = stage >= 7 ? 100 : [100, 50, 75][p];
    const colours = stage >= 5 || p === 0 ? ['#0072B2', '#B34700'] : p === 1 ? ['#B34700', '#0072B2'] : ['#7B3294', '#267326'];
    const width = stage >= 3 ? 2 : [3, 2, 2][p];
    return { x, y, family, size, titleSize: stage >= 2 ? 16 : [18, 13, 16][p], top, colours, width, showYTitle: stage < 8 || p === 0, legendPosition: stage >= 9 ? 'inside-top-right' : 'below', showGrid: stage < 10,
      markerSizes: [0,1].map(i => [0,1,2,3].map(n => stage >= 6 ? 3 : [2,5,3,4][(n+p+i)%4])) };
}
function consistencyFigure(stage) {
  const panels = consistencyData.map((series, p) => {
    const { x, y, family, size, titleSize, top, colours, width, markerSizes, legendPosition, showGrid, showYTitle } = consistencyStyle(stage, p);
    const pointX = n => n * 55;
    const pointY = v => 150 - v / top * 150;
    const marker = (cx, cy, r, i) => i === 0 ? `<circle cx="${cx}" cy="${cy}" r="${r}"/>` : `<rect x="${cx-r}" y="${cy-r}" width="${r*2}" height="${r*2}"/>`;
    return `<g transform="translate(${x},${y})" font-family="${family}" font-size="${size}" fill="#111">
      <text x="0" y="-22" font-size="${titleSize}" font-weight="bold">${['A · T cells', 'B · B cells', 'C · Monocytes'][p]}</text>
      ${showGrid ? `<g stroke="#aaa" stroke-width="0.8" fill="none">${Array.from({length: 11}, (_,n) => `<path d="M${n*16.5} 0V150"/>`).join('')}${Array.from({length: 11}, (_,n) => `<path d="M0 ${n*15}H165"/>`).join('')}</g>` : ''}
      <path d="M0 0V150H165" fill="none" stroke="#111"/>
      ${[0, top/2, top].map(v => `<path d="M-4 ${pointY(v)}H0" stroke="#111"/><text x="-8" y="${pointY(v)+4}" text-anchor="end">${v}</text>`).join('')}
      ${showYTitle ? '<text transform="translate(-40,75) rotate(-90)" text-anchor="middle">Marker-positive (%)</text>' : ''}
      ${series.map((values, i) => `<path d="${values.map((v,n) => `${n ? 'L' : 'M'}${pointX(n)} ${pointY(v)}`).join(' ')}" fill="none" stroke="${colours[i]}" stroke-width="${width}" ${i ? 'stroke-dasharray="6 3"' : ''}/><g fill="${colours[i]}">${values.map((v,n) => marker(pointX(n), pointY(v), markerSizes[i][n], i)).join('')}</g>`).join('')}
      ${[0,1,2,3].map(n => `<path d="M${pointX(n)} 150v4" stroke="#111"/><text x="${pointX(n)}" y="170" text-anchor="middle">${n}</text>`).join('')}
      <text x="82" y="192" text-anchor="middle">Time (days)</text>
      ${colours.map((colour,i) => `<g fill="${colour}">${marker(legendPosition === 'inside-top-right' ? 86 : i*90+4, legendPosition === 'inside-top-right' ? 14+i*19 : 216,3,i)}<text x="${legendPosition === 'inside-top-right' ? 96 : i*90+13}" y="${legendPosition === 'inside-top-right' ? 18+i*19 : 220}">${i ? 'Treated' : 'Control'}</text></g>`).join('')}
    </g>`;
  }).join('');
  return `<svg viewBox="0 0 725 325" role="img" aria-label="${stage === 0 ? 'Starting figure with multiple design inconsistencies' : 'Figure after improvement '+stage}. T cells, B cells and monocytes: percentage of marker-positive cells over days 0 to 3, for control and treated conditions.">${panels}</svg>`;
}
const consistencyEscape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function fullPlotCode(kind, before, after, revealed) {
  const source = pythonPlotCode(kind, revealed ? [before, after] : [before]);
  return `<details class="consistency-code"><summary>Show full Python code for these plots</summary><p>Python / Matplotlib version of the current figures, including all observations and stage settings. Font availability and text layout can differ from the browser preview.</p><p><a download="${kind}-current-plots.py" href="data:text/plain;charset=utf-8,${encodeURIComponent(source)}">Download Python code (.py)</a></p><pre><code>${consistencyEscape(source)}</code></pre></details>`;
}
function consistencyCode(before, after) {
  const changes = [0,1,2].map(p => {
    const oldStyle = consistencyStyle(before, p), newStyle = consistencyStyle(after, p);
    const keys = Object.keys(newStyle).filter(key => JSON.stringify(oldStyle[key]) !== JSON.stringify(newStyle[key]));
    if (!keys.length) return '';
    return `<h3>Panel ${'ABC'[p]}</h3><pre class="consistency-diff"><code>${keys.map(key => `<span class="diff-remove">− ${key}: ${consistencyEscape(JSON.stringify(oldStyle[key]))}</span><span class="diff-add">+ ${key}: ${consistencyEscape(JSON.stringify(newStyle[key]))}</span>`).join('')}</code></pre>`;
  }).join('');
  return `<details class="consistency-code"><summary>Show code changes</summary><p>These are the actual JavaScript settings changed in this step (or all changes in the final comparison). − is the previous value; + is the new value. Panel positions and sizes use SVG units.</p>${changes || '<p>No change yet. Reveal the first improvement to see its diff.</p>'}<p><strong>What draws the plot?</strong> SVG paths connect the measurements; circles and squares draw the markers. This walkthrough keeps the line-plot type and data the same while changing its styling.</p><p><code>family</code> sets the font; <code>size</code> and <code>titleSize</code> set text sizes; <code>width</code> sets trace thickness; <code>x/y</code> position panels; <code>colours</code> maps control and treated; <code>markerSizes</code> sets marker radii or square half-widths; <code>top</code> sets the y-axis maximum; <code>legendPosition</code> moves the condition key; <code>showGrid</code> toggles the background grid; <code>showYTitle</code> controls whether a panel repeats the y-axis title.</p><details><summary>Show the drawing code</summary><pre><code>${consistencyEscape(consistencyFigure.toString())}</code></pre></details></details>`;
}
let consistencyStep = 0;
function consistencyPage() {
  current = -1;
  const last = consistencyStages.length - 2;
  const final = consistencyStep === last;
  const [title, explanation] = consistencyStages[consistencyStep];
  const before = 0;
  const after = consistencyStep;
  app.innerHTML = `
    <h1>Do and don’t: consistent figures</h1>
    <p class="consistency-progress">${consistencyStep === 0 ? 'Spot the problems' : final ? 'Final comparison' : `Improvement ${consistencyStep} of ${last}`}</p>
    <section class="consistency-slide"><h2>${title}</h2><p>${explanation}</p>
      <div class="consistency-pair">
        <figure class="consistency-box"><figcaption>${before === 0 ? 'Starting figure' : 'Previous version'}</figcaption>${consistencyFigure(before)}</figure>
        <figure class="consistency-box ${after === last ? 'improvement-complete' : ''}"><figcaption>${after === last ? '<span class="completion-label">✓ Final improvement</span>' : 'Improved version'}</figcaption>${consistencyStep === 0 ? '<div class="consistency-placeholder">Click “Fix font family” to reveal the first improvement.</div>' : consistencyFigure(after)}</figure>
      </div>
      ${consistencyStep > 0 && !final ? '<p>The original stays on the left; the right includes all improvements so far.</p>' : ''}
      ${final ? '<p>Different styles can be useful when they communicate a deliberate meaning: a bold summary, a size-encoded quantity or a clearly explained alternative scale.</p>' : ''}
      ${consistencyCode(final ? 0 : Math.max(0, after-1), after)}
      ${fullPlotCode('consistency', before, after, consistencyStep > 0)}
    </section>
    <nav class="navigation footer-controls" aria-label="Consistency slides"><button id="consistency-prev" ${consistencyStep === 0 ? 'disabled' : ''}>Previous</button><span aria-live="polite">${consistencyStep+1} / ${last+1}</span><button id="consistency-next" ${final?'disabled':''}>${final ? 'Finished' : ['Fix font family','Fix font sizes','Fix line widths','Fix spacing','Fix colours','Fix marker sizes','Fix axes','Share y-axis title','Move legends inside','Remove grid','Compare start and finish'][consistencyStep]}</button></nav>`;
  document.querySelector('#consistency-prev').onclick = () => { consistencyStep = Math.max(0, consistencyStep-1); consistencyPage(); };
  document.querySelector('#consistency-next').onclick = () => { if (final) return; consistencyStep++; consistencyPage(); };
}
