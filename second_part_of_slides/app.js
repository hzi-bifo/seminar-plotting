const app = document.querySelector('#app');
const answers = new Map();
const walkthroughSteps = new Map();
let current = -1;
const sourceHTML = key => {
  const s = sources[key];
  return `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>${s.credit ? `<br>${s.credit} ${s.license ? `<a href="${s.license}" target="_blank" rel="noopener">Licence</a>` : ''}` : ''}`;
};
function home() {
  current = -1;
  app.innerHTML = `<h1>Figures that communicate</h1><p class="day2-overview-intro">Choose a course day to explore its topics.</p><nav class="course-day-grid" aria-label="Course days"><a href="#day2-heatmaps"><img src="assets/day2-heatmaps/hands-on-workshop.svg" alt="People working together on a heatmap"><span class="presentation-kicker">Day 2 · Part 2</span><h2>Heatmap focus</h2><p>AI tools, reading heatmaps, scaling, clustering and hands-on work in R.</p><strong>Open Day 2 topics →</strong></a><a href="#day3"><img src="assets/day2-heatmaps/ai-collaboration.svg" alt="Discussion and code connected in an iterative workflow"><span class="presentation-kicker">Day 3</span><h2>From plot to publication</h2><p>Plot design, consistent panels, figure assembly, export and generative tools.</p><strong>Open Day 3 topics →</strong></a></nav>`;
}
function day3Overview() {
  current = -1;
  app.innerHTML = `<p class="presentation-kicker">Day 3</p><h1>From plot to publication</h1><p class="day2-overview-intro">Choose a topic to explore, improve and assemble scientific figures.</p><nav class="day2-topics day3-topic-cards" aria-label="Day 3 sections">${[
    ['1','What kinds of plots are there?','Explore plot families and the questions they answer.','#plot-types'],
    ['2','Examples for good figures','Inspect design choices in real biological research.','#section-2'],
    ['3','Good and bad plots','See the issue, then reveal an improved figure.','#section-3'],
    ['4','Same data, different plots','Compare two views and discuss which fits the question.','#section-4'],
    ['5','Improve a figure step by step','Build consistent panels and untangle crowded point plots.','#section-5'],
    ['6','Assemble a multi-panel figure','Combine plots with code or a vector editor.','#section-6'],
    ['7','File formats and resolution','Raster vs vector, zooming, and DPI.','#section-7'],
    ['8','Post-processing tools','Edit layouts, handle fonts, and preserve the evidence.','#section-8'],
    ['9','Include icons in the plot','Generate, compare and place clear scientific icons.','#section-9'],
    ['10','Submit the manuscript','Embed previews, upload figure files and prepare for revisions.','#section-10'],
    ['11','Use generative tools','Redesign six mismatched panels from the Day 1 and Day 2 data.','#section-11']
  ].map(([n,title,text,url])=>`<a href="${url}"><img src="assets/day3-topics/topic-${n}.svg" alt=""><h2><span class="day2-topic-number">${n}</span>${title}</h2><p>${text}</p></a>`).join('')}</nav>`;
}
function sectionPage(n) {
  current = -1;
  const phaseLink = (phase,label) => `<a class="walkthrough-link" href="#card-${cards.findIndex(c=>c.phase===phase)+1}">${label}</a>`;
  const title = {2:'Examples for good figures',3:'Good and bad plots',5:'Improve a figure step by step'}[n];
  const content = n===3 ? `<p>Explore what works, what gets in the way, and how a different design helps.</p><nav class="presentation-sections plot-example-overview" aria-label="Explore good and bad plots">${[[0,'Spot the problem','Look at the starting plot. What would you change?'],[1,'Good plots: simple examples','See how clear labels and thoughtful design help.'],[4,'Biology design comparisons','Compare designs and choose the view that answers the question.']].map(([phase,label,description])=>{const i=cards.findIndex(c=>c.phase===phase);const c=cards[i];return `<a class="walkthrough-preview" href="#card-${i+1}"><div class="starting-preview"><img src="assets/${c.images[0]}" alt="${c.title}: example plot"></div><h2>${label}</h2><p>${description}</p><strong>Explore plots →</strong></a>`;}).join('')}<a class="walkthrough-preview" href="#microbiota-composition"><div class="starting-preview"><img src="assets/microbiota-composition-example.png" alt="Stacked bars comparing microbiota composition without and with E. coli"></div><h2>Microbiota composition</h2><p>Explore the supplied stacked-bar example across samples.</p><strong>Open example →</strong></a></nav>` : n===5 ? `<p>Keep the data fixed. Make one change, compare the result, and inspect the code.</p><nav class="presentation-sections"><a class="walkthrough-preview" href="#consistency"><div class="starting-preview">${consistencyFigure(0)}</div><h2>Consistent multi-panel figures</h2><p>Fonts, spacing, colours, axes, legends and grid lines.</p></a><a class="walkthrough-preview" href="#point-consistency"><div class="starting-preview">${pointFigure(0)}</div><h2>Crowded point plots</h2><p>Overplotting, colour, labels and carefully placed annotations.</p></a><a class="walkthrough-preview" href="#condition-walkthrough"><div class="starting-preview"><img src="assets/condition-step-0.png" alt="Starting point plot by condition"></div><h2>Points, boxes or violins?</h2><p>Compare what each view reveals, and what it hides.</p></a><a class="walkthrough-preview" href="#size-walkthrough"><div class="starting-preview"><img src="assets/size-step-0-v2.png" alt="Starting figure with excessive whitespace"></div><h2>How small can a figure be?</h2><p>Trim whitespace, test smaller sizes, and find the readability limit.</p></a><a class="walkthrough-preview" href="#heatmap-consistency"><div class="starting-preview"><img src="assets/heatmap-step-1.png" alt="Starting heatmap with rainbow colours and mixed ordering"></div><h2>Clearer heatmaps</h2><p>Meaningful colour, sample ordering, colour bins and readable values.</p></a></nav><details><summary>More step-by-step lessons</summary><nav class="sections">${phaseLink(5,'Advanced walkthroughs')}${phaseLink(0,'Guided diagnostic examples')}</nav></details>` : `<p>Select a figure to explore it.</p><nav class="presentation-sections published-overview" aria-label="Good figure examples">${publishedGoodExamples.map(c=>`<a class="walkthrough-preview" href="#card-${cards.indexOf(c)+1}"><div class="starting-preview"><img src="assets/${c.images[0]}" alt="Preview: ${c.title}"></div><h2>${c.title}</h2></a>`).join('')}</nav><details><summary>More examples</summary>${phaseLink(3,'Optional: complex figures')}</details>`;
  app.innerHTML=`<p class="presentation-kicker">Section ${n} of 11</p><h1>${title}</h1>${content}<nav class="navigation"><a href="${n===2?'#plot-types':`#section-${n-1}`}">← Previous section</a><a href="#home">Overview</a><a class="presentation-next" href="${`#section-${n+1}`}">Next section →</a></nav>`;
}
let heatmapSlide = 0;
function heatmapPresentation() {
  current = -1;
  const lesson = cards.find(c=>c.title==='Which genes respond together?');
  const final = heatmapSlide === lesson.steps.length-1;
  const after = final ? lesson.steps.length-1 : heatmapSlide;
  const before = 0;
  const step = lesson.steps[after];
  app.innerHTML = `<p class="presentation-kicker">Section 5 · Heatmaps · ${heatmapSlide+1} / ${lesson.steps.length}</p><h1>${final?'Compare start and finish':step.title}</h1><p>${final?'The same measurements, with meaningful colour, organised groups and readable values.':step.text}</p><div class="gallery-examples"><figure><figcaption>${before===0?'Starting figure':'Previous version'}</figcaption><img src="assets/${lesson.steps[before].image}" alt="${lesson.steps[before].title}"></figure><figure class="${after===lesson.steps.length-1?'improvement-complete':''}"><figcaption>${after===lesson.steps.length-1?'<span class="completion-label">✓ Final improvement</span>':'Next version'}</figcaption>${heatmapSlide?`<img src="assets/${step.image}" alt="${step.title}">`:'<div class="consistency-placeholder">What would make the response patterns easier to compare?</div>'}</figure></div><details><summary>Data & interpretation</summary><p>${lesson.description}</p><p>The colour-bin step is an alternative to discuss, not a universal improvement.</p><a href="data/${lesson.data}" download>Download measurements (CSV)</a></details><nav class="navigation footer-controls"><button id="heatmap-prev" ${heatmapSlide===0?'disabled':''}>Previous</button><a href="#section-5">Step-by-step figures</a><button id="heatmap-next" ${final?'disabled':''}>${final?'Finished':'Next step'}</button></nav>`;
  document.querySelector('#heatmap-prev').onclick=()=>{heatmapSlide--;heatmapPresentation();};
  document.querySelector('#heatmap-next').onclick=()=>{if(final)return;heatmapSlide++;heatmapPresentation();};
}
function go(i) {
  location.hash = `card-${i+1}`;
  render(i);
  window.scrollTo(0,0);
}
function comparisonOverview() {
  current=-1;
  app.innerHTML=`<p class="presentation-kicker">Section 4 of 11</p><h1>Same data, different plots</h1><p>Which view fits the question, and what does each view hide?</p><nav class="presentation-sections comparison-gallery">${cards.map((c,i)=>({c,i})).filter(({c})=>c.phase===2).map(({c,i})=>`<a href="#card-${i+1}"><div class="comparison-thumbnails">${c.images.map((src,n)=>`<img src="assets/${src}" alt="View ${n+1}: ${c.title}">`).join('')}</div><h2>${c.title}</h2></a>`).join('')}</nav>`;
}
function comparisonSlide(i) {
  const c=cards[i], examples=cards.map((c,i)=>({c,i})).filter(({c})=>c.phase===2);
  const position=examples.findIndex(item=>item.i===i), final=position===examples.length-1;
  app.innerHTML=`<p class="presentation-kicker">Section 4 · Same data, different plots</p><h1>${c.title}</h1><p class="comparison-question">${c.question}</p><section class="gallery-examples discussion-plots" aria-label="Two views of the same data">${c.images.map((src,n)=>`<figure><figcaption>View ${n+1}</figcaption><img src="assets/${src}" alt="${c.title}: view ${n+1}"></figure>`).join('')}</section><p class="discussion-prompt">Discuss: which would you use, and why?</p>${c.data==='error-bars.csv'?'<details class="comparison-solution"><summary>Reveal solution</summary><p><strong>View 2 (B): mean ± standard deviation (SD).</strong> SD describes the spread of measurements among the six independent cultures.</p><p>View 1 (A) shows the standard error of the mean (SEM): the precision of the estimated mean, rather than the spread among cultures.</p><p><strong>Same data:</strong> mean = 10 · SD ≈ 2.83 · SEM = SD / √6 ≈ 1.15. Smaller SEM bars do not mean the cultures are less variable.</p></details>':''}<details><summary>Data context</summary><p>${c.description}</p></details><nav class="navigation footer-controls"><button id="comparison-prev">Previous</button><span>${position+1} / ${examples.length}</span><button id="comparison-next" ${final?'disabled':''}>${final?'Finished':'Next comparison'}</button></nav>`;
  document.querySelector('#comparison-prev').onclick=()=>position?go(examples[position-1].i):location.hash='section-4';
  document.querySelector('#comparison-next').onclick=()=>{if(!final)go(examples[position+1].i);};
}
function renderTeachingSlide(i) {
  const c=cards[i];
  const clean=text=>(text||'').replace(/^(Yes[.!:]?|Exactly[.!:]?)\s*/i,'');
  const first=c.images.length===2 && Number.isInteger(c.correct) && c.correct<2 ? c.images[1-c.correct] : c.images[0];
  const alternative=c.repair || (c.images.length===2 ? c.images[c.correct<2?c.correct:1] : null);
  const note=clean(c.feedback[c.correct] || c.takeaway || c.question);
  app.innerHTML=`<p class="presentation-kicker">Section 3 · Good and bad plots</p><h1>${c.title}</h1><p>${c.phase===0 ? clean(c.options[c.correct]) : c.question}</p><section class="figures single"><figure><img src="assets/${first}" alt="${c.title}: starting figure"></figure></section><section id="feedback" aria-live="polite"><button id="reveal-teaching">${c.steps?'Reveal first improvement':alternative?'Reveal alternative figure':'Reveal what works'}</button></section><details><summary>Context & source</summary><p>${c.description}</p>${c.source?sourceHTML(c.source):''}</details><nav class="navigation footer-controls"><button id="prev" ${i===0?'disabled':''}>Previous plot</button><span>${i+1} / ${cards.length}</span><button id="next">Next plot</button></nav>`;
  document.querySelector('#prev').onclick=()=>go(i-1);
  document.querySelector('#next').onclick=()=>{if(i===cards.length-1 || cards[i+1].phase!==c.phase){location.hash='finish-'+i;}else go(i+1);};
  document.querySelector('#reveal-teaching').onclick=()=>{
    if(c.steps){
      document.querySelector('.figures').hidden=true;
      document.querySelector('#feedback').innerHTML='<section id="walkthrough"></section>';
      showWalkthrough(Math.min(1,c.steps.length-1));
    }else{
      if(alternative){document.querySelector('.figures').classList.remove('single');document.querySelector('.figures').insertAdjacentHTML('beforeend',`<figure><img src="assets/${alternative}" alt="${c.title}: alternative figure"></figure>`);}
      document.querySelector('#feedback').innerHTML=`<p>${note}</p>${c.additionalView?'<button id="reveal-stacked">Also compare a 100% stacked bar</button>':''}`;
      if(c.additionalView)document.querySelector('#reveal-stacked').onclick=()=>{
        document.querySelector('.figures').classList.add('three-views');
        document.querySelector('#feedback').insertAdjacentHTML('beforeend', `<details class="composition-example"><summary>Example: composition across multiple samples</summary><div class="composition-example-grid"><figure><img src="assets/microbiota-composition-example.png" alt="Stacked bars showing microbiota relative abundance 40 days post-colonization, grouped without and with E. coli, with a split vertical scale"><figcaption>Supplied figure excerpt; a different dataset from taxa A–J above.</figcaption></figure><section><h2>Read the composition</h2><p>Each bar shows a sample. Coloured segments show its relative composition, adding up to 100%.</p><p>The groups compare samples <strong>without</strong> and <strong>with <em>E. coli</em></strong>, 40 days after colonization.</p><p><strong>Watch the scale:</strong> the lower part expands 0–20%. The upper part uses a different scale, so segment heights across the split cannot be compared directly.</p><p>A full colour legend is needed to identify the taxa; it is not visible in this excerpt.</p><p><strong>Discuss:</strong> what changes between samples are easy to see? Which small segments are harder to compare?</p></section></div></details>`);

        document.querySelector('.figures').insertAdjacentHTML('beforeend',`<figure><img src="assets/${c.additionalView}" alt="The same microbial read proportions in a 100% stacked bar"></figure>`);
        document.querySelector('#reveal-stacked').replaceWith(Object.assign(document.createElement('p'),{textContent:'A stacked bar shows the whole composition, but D, E and F start at different positions. Separate bars make their 10%, 8% and 7% easier to compare using a shared baseline.'}));
      };
    }
  };
}
function render(i) {
  if (i >= cards.length) { end(); return; }
  if (i < 0) { home(); return; }
  current = i;
  const c = cards[i];
  if (c.phase===2) { comparisonSlide(i); return; }
  if ([0,1,4].includes(c.phase)) { renderTeachingSlide(i); return; }
  if (c.phase === 6) {
    const examples = cards.map((card,index)=>({card,index})).filter(item=>item.card.phase===6);
    const position = examples.findIndex(item=>item.index===i);
    app.innerHTML = `<p class="presentation-kicker">Section 2 · Examples for good figures · ${position+1} / ${examples.length}</p><h1>Good plot</h1><p class="good-plot-note">${c.goodPoint}</p><section class="figures single published-slide">${c.images.map(src=>`<figure><img src="assets/${src}" alt="${c.title}"></figure>`).join('')}</section><details><summary>Source & credits</summary><p>${c.title}</p><p>${c.source ? sourceHTML(c.source) : 'Course example.'}</p></details><nav class="navigation"><button id="prev">Previous</button><a href="#section-2">Examples for good figures</a><button id="next">${position===examples.length-1?'Next section →':'Next good plot'}</button></nav>`;
    document.querySelector('#prev').onclick=()=>{if(position>0)go(examples[position-1].index);else location.hash='section-2';};
    document.querySelector('#next').onclick=()=>{if(position<examples.length-1)go(examples[position+1].index);else location.hash='section-3';};
    return;
  }
  const published = c.source && sources[c.source].credit;
  const attribution = published
    ? `<a href="${sources[c.source].url}" target="_blank" rel="noopener">${sources[c.source].label}</a>`
    : 'Course example.';
  app.innerHTML = `<p class="presentation-kicker">${c.phase === 6 || c.phase === 3 ? 'Section 2 · Examples for good figures' : c.phase === 5 ? 'Section 5 · Step-by-step improvements' : 'Section 3 · Good and bad plots'}</p><h2>${c.title}</h2>
    <section class="figure-description" aria-label="Figure description"><p>${c.description}</p><p class="attribution">Source: ${attribution}</p></section>
    ${c.focus ? `<p class="figure-focus"><strong>${c.focus}</strong></p>` : ''}<p class="question">${c.question}</p>
    <section class="figures ${c.images.length === 1 ? 'single' : ''}" aria-label="Plots">
    ${c.images.map((src,n) => `<figure>${src === 'ons-dual.png' ? '<div class="axis-key"><span>Blue, left y-axis<br>0–1,000</span><span>Gold, right y-axis<br>5–17</span></div>' : ''}<img src="assets/${src}" alt="${c.title}, ${c.images.length === 1 ? 'plot' : 'version '+String.fromCharCode(65+n)}">${c.images.length > 1 ? `<figcaption>${String.fromCharCode(65+n)}</figcaption>` : ''}</figure>`).join('')}</section>
    <div class="options" role="group" aria-label="Answer choices">${c.options.map((o,n) => `<button data-answer="${n}" aria-pressed="false">${o}</button>`).join('')}</div>
    <section id="feedback" aria-live="polite"></section>
    <details><summary>${published ? 'Credits' : 'Further reading'}${c.data ? ' & data' : ''}</summary><p>${c.source ? sourceHTML(c.source) : 'Course example.'}</p>${c.data ? `<a href="data/${c.data}" download>Download CSV</a>` : ''}</details>
    <nav class="navigation" aria-label="Plot navigation"><button id="prev" ${i === 0 ? 'disabled' : ''}>Previous plot</button><a href="#home">Overview</a><button id="next">${i === cards.length-1 || i === optionalStart-1 || (c.phase >= 3 && cards[i+1]?.phase !== c.phase) ? 'Finish' : 'Next plot'}</button></nav>`;
  document.querySelector('#prev').onclick = () => go(i-1);
  document.querySelector('#next').onclick = () => { if (i === cards.length-1 || i === optionalStart-1 || (c.phase >= 3 && cards[i+1]?.phase !== c.phase)) { location.hash = `finish-${i}`; route(); window.scrollTo(0,0); } else go(i+1); };
  document.querySelectorAll('[data-answer]').forEach(b => b.onclick = () => choose(Number(b.dataset.answer)));
  if (published && !answers.has(i)) {
    const focus = document.querySelector('.figure-focus');
    if(focus) focus.hidden=true;
    document.querySelector('.question').hidden=true;
    document.querySelector('.options').hidden=true;
    document.querySelector('#feedback').innerHTML='<button id="reveal-focus">Reveal the discussion question</button>';
    document.querySelector('#reveal-focus').onclick=()=>{if(focus)focus.hidden=false;document.querySelector('.question').hidden=false;document.querySelector('.options').hidden=false;document.querySelector('#feedback').innerHTML='';};
  }
  if (answers.has(i)) choose(answers.get(i));
}
function choose(n) {
  const c = cards[current];
  answers.set(current,n);
  document.querySelectorAll('[data-answer]').forEach(b => {
    const selected = Number(b.dataset.answer) === n;
    b.className = selected ? 'selected' : '';
    b.setAttribute('aria-pressed',String(selected));
  });
  document.querySelector('#feedback').innerHTML = `<p>${c.feedback[n]}</p>${c.repair ? `<button id="reveal-repair">Reveal improved figure</button><div id="repair-content" hidden><figure class="repair"><figcaption>${c.repairLabel || 'Corrected version'}</figcaption><img src="assets/${c.repair}" alt="Alternative display for ${c.title}"></figure>${c.repairNote ? `<p>${c.repairNote}</p>` : ''}</div>` : ''}`;
  if(c.repair) document.querySelector('#reveal-repair').onclick=()=>{document.querySelector('#repair-content').hidden=false;document.querySelector('#reveal-repair').hidden=true;};
  if (c.steps) {
    document.querySelector('.figures').hidden = true;
    document.querySelector('#feedback').insertAdjacentHTML('beforeend', '<section id="walkthrough" aria-label="Plot improvements"></section>');
    document.querySelector('#walkthrough').innerHTML='<button id="begin-walkthrough">Reveal step-by-step improvements</button>';
    document.querySelector('#begin-walkthrough').onclick=()=>showWalkthrough(walkthroughSteps.get(current) || 0);
  }
}
function showWalkthrough(step) {
  const c = cards[current];
  walkthroughSteps.set(current, step);
  const s = c.steps[step];
  const previous = c.steps[0];
  document.querySelector('#walkthrough').innerHTML = `<div class="gallery-examples"><figure><figcaption>Starting figure</figcaption><img src="assets/${previous.image}" alt="${previous.title}"></figure><figure class="${step===c.steps.length-1?'improvement-complete':''}"><figcaption>${step===c.steps.length-1?'<span class="completion-label">✓ Final improvement</span> · ':''}${s.title}</figcaption>${step ? `<img src="assets/${s.image}" alt="${s.title}">` : '<div class="consistency-placeholder">Next step reveals the first improvement.</div>'}</figure></div><p>${s.text}</p><nav class="walkthrough-navigation"><button id="step-back" ${step===0?'disabled':''}>Previous step</button><span>Step ${step+1} / ${c.steps.length}</span><button id="step-next" ${step===c.steps.length-1?'disabled':''}>Next step</button></nav>`;
  document.querySelector('#step-back').onclick = () => showWalkthrough(step-1);
  document.querySelector('#step-next').onclick = () => showWalkthrough(step+1);
}
function end(last = cards.length-1) {
  current = cards.length;
  app.innerHTML = `<p class="presentation-kicker">Section recap</p><h2>What made the figure clearer?</h2><p>Match the display to the question. Check scales and visual encodings. Keep useful detail, and remove distractions.</p><p>Choose one figure from your work. What would you change, and why?</p><p><a class="recap-next" href="#section-${cards[last]?.phase === 5 ? 6 : cards[last]?.phase === 3 || cards[last]?.phase === 6 ? 3 : 4}">Continue to the next section →</a></p><nav class="navigation"><button id="last">Previous plot</button><a href="#home">Overview</a></nav>`;
  document.querySelector('#last').onclick = () => go(last);
}
function route() {
  if(location.hash==='#microbiota-composition'){
    render(cards.findIndex(c=>c.data==='microbial-composition.csv'));
    document.querySelector('#reveal-teaching').click();
    document.querySelector('#reveal-stacked').click();
    const example=document.querySelector('.composition-example-grid').outerHTML;
    app.innerHTML=`<p class="presentation-kicker">Section 3 · Good and bad plots</p><h1>Microbiota composition across samples</h1><div class="composition-example">${example}</div><nav class="navigation"><a href="#section-3">← Good and bad plots</a><a href="#card-${current+1}">Compare pie, bars and stacked bar →</a></nav>`;
    window.scrollTo(0,0);return;
  }
  if(location.hash==='#day3'){day3Overview();window.scrollTo(0,0);return;}
  if(location.hash==='#section-11'||/^#generative-tools(?:\/[1-8])?$/.test(location.hash)){generativeToolsPage(location.hash.split('/')[1]);window.scrollTo(0,0);return;}
  if(location.hash==='#section-4'){comparisonOverview();window.scrollTo(0,0);return;}
  if(location.hash==='#day2-heatmaps'||location.hash.startsWith('#day2-heatmaps/')){day2HeatmapsPage(location.hash.split('/')[1]);window.scrollTo(0,0);return;}
  if(location.hash==='#section-10'){submissionPage();window.scrollTo(0,0);return;}
  if(location.hash==='#section-9'){iconsPage();window.scrollTo(0,0);return;}
  if(location.hash==='#section-6'){assemblyPage();window.scrollTo(0,0);return;}
  if(location.hash==='#section-8'){postProcessingPage();window.scrollTo(0,0);return;}
  if(location.hash==='#section-7'){formatsPage();window.scrollTo(0,0);return;}
  if(location.hash==='#size-walkthrough'){sizePage();window.scrollTo(0,0);return;}
  if(location.hash==='#condition-walkthrough'){conditionPage();window.scrollTo(0,0);return;}
  if (location.hash === '#heatmap-consistency') { heatmapPresentation(); window.scrollTo(0,0); return; }
  window.scrollTo(0,0);
  if (location.hash === '#library') { location.replace('#home'); home(); return; }
  const section = location.hash.match(/^#section-([235])$/);
  if (section) { sectionPage(Number(section[1])); return; }
  if (location.hash === '#point-consistency') { pointPage(); return; }
  if (location.hash === '#consistency') { consistencyPage(); return; }
  if (location.hash === '#plot-types') { plotGallery(); return; }
  const type = location.hash.match(/^#plot-([a-z]+)$/);
  if (type) { plotType(type[1]); return; }
  const finish = location.hash.match(/^#finish-(\d+)$/);
  if (finish && Number(finish[1]) < cards.length) { end(Number(finish[1])); return; }
  if (location.hash === '#finish-main') { end(optionalStart-1); return; }
  if (location.hash === '#finish-extra') { end(); return; }
  const m = location.hash.match(/^#card-(\d+)$/);
  if (m) { const i = Number(m[1])-1; if (i >= 0 && i <= cards.length) { render(i); return; } }
  home();
}
window.addEventListener('hashchange',route);
route();
