// Fixed illustrative observations; no points are discarded during the walkthrough.
const pointStages = [
  ['A crowded point plot', 'Each point is one independent culture. Compare protein A and protein B fluorescence in 90 control and 90 treated cultures. What makes the relationship hard to read?'],
  ['Remove meaningless connections', 'The cultures are independent. Joining them in recording order suggests a sequence that the experiment does not have.'],
  ['Reduce marker size', 'Smaller markers reveal more of the crowded regions. All 180 observations remain.'],
  ['Use transparency to reveal overlap', 'Partly transparent markers make overlapping observations darker. Darkness suggests crowding; it is not an exact count.'],
  ['Give colour a useful meaning', 'Replace the repeating colours assigned by recording order with blue for control and orange for treated. The legend now explains the colour mapping.'],
  ['Add a second way to distinguish groups', 'Use circles for control and squares for treated, as well as colour. This helps readers distinguish groups when colours are hard to tell apart.'],
  ['Remove unnecessary point labels', 'Hide the 180 culture IDs to expose the measurements. IDs remain in the downloadable data. Label individual observations only when they support a specific question.'],
  ['Explain both measurements', 'Replace cryptic variable names with protein names and units. The measurements are fluorescence intensities, not counts or concentrations.'],
  ['Annotate selected extremes', 'Label the lowest and highest protein B measurements with culture IDs and leader lines. These are observed extremes, not a statistical outlier classification.'],
  ['Refine annotation placement', 'Move labels into clear space and attach leader lines beside the text, ending at the highlight boundary. Combine duplicate leaders for overlapping observations and explicitly identify the overlap.'],
  ['Compare start and finish', 'The same 180 cultures are now easier to inspect. Transparency cannot resolve every overlap; for much denser data, consider density or binned views with a clear explanation of what they summarise.']
];
const pointData = Array.from({length:180}, (_,i) => {
  const group = i < 90 ? 0 : 1;
  // Deterministic clusters, including exact overlaps to demonstrate overplotting.
  const a = ((i*37)%91)/91, b = ((i*53)%89)/89;
  return {id:`C${i+1}`, group, x:Math.round(20+55*(a+b)/2+group*5), y:Math.round(15+45*(a+b)/2+((i*17)%19)+group*5)};
});
function pointStyle(stage) {
  return {annotationLayout:stage>=9?'refined':'initial', annotateExtremes:stage>=8, connect:stage<1, radius:stage<2?10:3.5, opacity:stage<3?1:0.45,
    colourBy:stage<4?'recording order':'condition', shapeBy:stage<5?'none':'condition',
    labelIDs:stage<6, xTitle:stage<7?'A':'Protein A fluorescence (a.u.)', yTitle:stage<7?'B':'Protein B fluorescence (a.u.)'};
}
function pointFigure(stage) {
  const style=pointStyle(stage), px=v=>65+v*4.4, py=v=>370-v*3.2;
  const palette=['#0072B2','#B34700','#8e44ad','#16845b','#ce3877','#787000'];
  const colour=(d,i)=>style.colourBy==='condition'?palette[d.group]:palette[i%palette.length];
  const extremes = [Math.min(...pointData.map(d=>d.y)), Math.max(...pointData.map(d=>d.y))];
  const annotations = style.annotateExtremes ? extremes.map((value, index) => {
    const matches = pointData.filter(d=>d.y===value);
    if (style.annotationLayout === 'initial') {
      const tx=index?370:105, ty=index?88:337;
      return `<g font-size="12">${matches.map(d=>`<path d="M${tx+8} ${ty-14}L${px(d.x)} ${py(d.y)}" fill="none" stroke="#333" stroke-width="1"/><circle cx="${px(d.x)}" cy="${py(d.y)}" r="6" fill="none" stroke="#333"/>`).join('')}<text x="${tx}" y="${ty}">${index?'Highest':'Lowest'} protein B: ${value}</text><text x="${tx}" y="${ty+16}">${matches.map(d=>d.id).join(', ')}</text></g>`;
    }
    const tx = index ? 365 : 190, ty = index ? 92 : 329;
    // Connect to the left of the text block and stop at the highlight boundary.
    const anchorX = tx - 10, anchorY = ty + 3;
    const positions = [...new Map(matches.map(d=>[`${d.x},${d.y}`, d])).values()];
    const leaders = positions.map(d => {
      const cx=px(d.x), cy=py(d.y), dx=anchorX-cx, dy=anchorY-cy;
      const length=Math.hypot(dx,dy);
      const endX=cx+dx/length*7, endY=cy+dy/length*7;
      return `<path d="M${anchorX} ${anchorY}L${endX} ${endY}" fill="none" stroke="#555" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="6" fill="none" stroke="#333"/>`;
    }).join('');
    return `<g font-size="12">${leaders}<text x="${tx}" y="${ty}" font-weight="bold">${index ? 'Highest' : 'Lowest'} protein B: ${value}</text><text x="${tx}" y="${ty+17}" fill="#444">${matches.map(d=>d.id).join(', ')}${matches.length>1 ? ' (overlapping)' : ''}</text></g>`;
  }).join('') : '';
  return `<svg viewBox="0 0 560 460" role="img" aria-label="180 independent cultures, control and treated; protein A versus protein B fluorescence. Improvement stage ${stage}.">
    <g font-family="Arial,sans-serif" font-size="13" fill="#111">
    <path d="M65 50V370H505" stroke="#111" fill="none"/>
    ${[0,20,40,60,80,100].map(v=>`<path d="M${px(v)} 370v5 M60 ${py(v)}h5" stroke="#111"/><text x="${px(v)}" y="392" text-anchor="middle">${v}</text><text x="54" y="${py(v)+4}" text-anchor="end">${v}</text>`).join('')}
    ${style.connect?`<path d="${pointData.map((d,i)=>`${i?'L':'M'}${px(d.x)} ${py(d.y)}`).join(' ')}" fill="none" stroke="#777" stroke-width="1"/>`:''}
    ${pointData.map((d,i)=>`<g fill="${colour(d,i)}" fill-opacity="${style.opacity}">${style.shapeBy==='condition' && d.group===1?`<rect x="${px(d.x)-style.radius}" y="${py(d.y)-style.radius}" width="${style.radius*2}" height="${style.radius*2}"/>`:`<circle cx="${px(d.x)}" cy="${py(d.y)}" r="${style.radius}"/>`}</g>${style.labelIDs?`<text x="${px(d.x)+5}" y="${py(d.y)-5}" font-size="10">${d.id}</text>`:''}`).join('')}
    ${annotations}
    <text x="285" y="420" text-anchor="middle">${style.xTitle}</text><text transform="translate(18,210) rotate(-90)" text-anchor="middle">${style.yTitle}</text>
    ${style.colourBy==='condition'?`<circle cx="335" cy="26" r="4" fill="${palette[0]}"/><text x="346" y="30">Control</text>${style.shapeBy==='condition'?`<rect x="426" y="22" width="8" height="8" fill="${palette[1]}"/>`:`<circle cx="430" cy="26" r="4" fill="${palette[1]}"/>`}<text x="441" y="30">Treated</text>`:'<text x="65" y="30">Colours repeat in recording order</text>'}
    </g></svg>`;
}
function pointCode(before,after) {
  const a=pointStyle(before),b=pointStyle(after);
  const lines=Object.keys(b).filter(k=>a[k]!==b[k]).map(k=>`<span class="diff-remove">− ${k}: ${consistencyEscape(JSON.stringify(a[k]))}</span><span class="diff-add">+ ${k}: ${consistencyEscape(JSON.stringify(b[k]))}</span>`).join('');
  return `<details class="consistency-code"><summary>Show code changes</summary><p>Drawing settings changed in this step (or all changes in the final comparison). Removing connections changes a connected-point display into a scatter plot. Subsequent changes adjust its presentation.</p>${lines?`<pre class="consistency-diff"><code>${lines}</code></pre>`:'<p>Reveal an improvement to see the changed settings.</p>'}<details><summary>Show drawing code</summary><pre><code>${consistencyEscape(pointFigure.toString())}</code></pre></details></details>`;
}
let pointStep=0;
function pointPage() {
  current=-1;
  const last=pointStages.length-2, final=pointStep===last;
  const before=0,after=pointStep;
  app.innerHTML=`<h1>Crowded point plots</h1><p class="consistency-progress">${pointStep===0?'Spot the problems':final?'Final comparison':`Improvement ${pointStep} of ${last}`}</p><section class="consistency-slide"><h2>${pointStages[pointStep][0]}</h2><p>${pointStages[pointStep][1]}</p><div class="consistency-pair"><figure class="consistency-box"><figcaption>${before===0?'Starting figure':'Previous version'}</figcaption>${pointFigure(before)}</figure><figure class="consistency-box ${after===last?'improvement-complete':''}"><figcaption>${after===last?'<span class="completion-label">✓ Final improvement</span>':'Improved version'}</figcaption>${pointStep===0?'<div class="consistency-placeholder">Click “Remove connections” to reveal the first improvement.</div>':pointFigure(after)}</figure></div>${pointCode(final?0:Math.max(0,after-1),after)}${fullPlotCode('points',before,after,pointStep>0)}<details><summary>About the data</summary><p>Illustrative simulated measurements from 180 independent cultures, 90 per condition. a.u. means arbitrary units. Every step uses identical coordinates and includes every culture. No line or causal effect is fitted.</p><button id="point-download">Download all observations (CSV)</button></details></section><nav class="navigation footer-controls"><button id="point-prev" ${pointStep===0?'disabled':''}>Previous</button><span aria-live="polite">${pointStep+1} / ${last+1}</span><button id="point-next" ${final?'disabled':''}>${final?'Finished':['Remove connections','Reduce marker size','Add transparency','Fix colours','Add group shapes','Remove point labels','Explain axes','Annotate extremes','Refine annotations','Compare start and finish'][pointStep]}</button></nav>`;
  document.querySelector('#point-prev').onclick=()=>{pointStep=Math.max(0,pointStep-1);pointPage();};
  document.querySelector('#point-next').onclick=()=>{if(final)return;pointStep++;pointPage();};
  document.querySelector('#point-download').onclick=()=>{
    const csv='culture,condition,protein_a_fluorescence,protein_b_fluorescence\n'+pointData.map(d=>`${d.id},${d.group?'treated':'control'},${d.x},${d.y}`).join('\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); const a=document.createElement('a');a.href=url;a.download='point-walkthrough.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
}
