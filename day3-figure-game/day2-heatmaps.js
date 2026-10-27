function day2HeatmapsPage(id) {
 if(id==='assignment-context'){location.replace('#day2-heatmaps/r-files');return;}
 if(id==='perception'){location.replace('#day2-heatmaps/palettes');return;}
 current=-1;
 const index=day2HeatmapSlides.findIndex(slide=>slide.id===id);
 const esc=consistencyEscape;
 if(index<0){
  const topics=[['Reading heatmaps','encoding','slide-150-0.png','Click through a matrix and reveal its colour pattern.'],['Scaling and z-scores','zscore','slide-156-1.png','Switch between raw values and row z-scores.'],['Clustering','dendrogram','slide-159-1.png','See how ordering and distance change the picture.'],['Colour and perception','palettes','slide-170-0.png','Palettes, colour keys and visual context.'],['Pitfalls and special cases','interpolation','slide-179-1.png','Missing values, outliers and matrix layout.'],['Build & check','build-final','slide-166-1.png','Improve one heatmap and check the result.'],['Hands-on · create a heatmap in R','hands-on','slide-166-1.png','Install ComplexHeatmap, prepare the matrix, add settings and annotations, then practise.'],['Working with AI','working-with-ai','slide-166-1.png','Experiment with AI assistants, compare mistakes and collect good practices.']];
  app.innerHTML=`<p class="presentation-kicker">Day 2 · Part 2</p><h1>Heatmap focus</h1><p class="day2-overview-intro">Read a cell, uncover a pattern, then test the design choices.</p><nav class="day2-topics" aria-label="Heatmap topics">${topics.map(([title,target,img,note],i)=>`<a href="#day2-heatmaps/${target}"><img src="assets/day2-heatmaps/${img}" alt=""><h2><span class="day2-topic-number">${i+1}</span>${title}</h2><p>${note}</p></a>`).join('')}</nav><nav class="navigation footer-controls"><button id="day2-prev" disabled>Previous</button><span>Heatmap overview · ${day2HeatmapSlides.length} slides</span><button id="day2-next">Start heatmaps</button></nav>`;
  document.querySelector('#day2-next').onclick=()=>{location.hash='day2-heatmaps/encoding';};
  return;
 }
 const slide=day2HeatmapSlides[index];
 const useCases=id==='when'?`<div class="heatmap-use-cases">${[
 ['expression','Gene expression','Genes × samples','C: control · T: treated; colour shows relative expression within each gene.'],
 ['resistance','Resistance-gene presence','Genes × isolates','Two states: absent or present.'],
 ['taxa','Taxon abundance','Taxa × environments','Colour shows relative abundance; columns sum to 100%.'],
 ['correlation','Pairwise correlation','Variables × variables','A symmetric matrix; the diagonal is 1.']
 ].map(([file,title,axes,note])=>`<figure><h2>${title}</h2><p>${axes}</p><img src="assets/day2-heatmaps/use-case-${file}.svg" alt="${title}: ${axes}"><figcaption>${note}</figcaption></figure>`).join('')}</div><p class="day2-note">Illustrative data generated for teaching, not experimental results.</p>`:'';
 const alternatives=id==='alternatives'?`<div class="hm-alternatives"><figure><h2>When uncertainty matters</h2><img src="assets/day2-heatmaps/alternative-intervals.svg" alt="The same three estimates as colours and as points with confidence intervals"><figcaption>Intervals show uncertainty that a single colour cannot encode.</figcaption></figure><figure><h2>When a few exact values matter</h2><img src="assets/day2-heatmaps/alternative-small.svg" alt="Counts 12, 14 and 13 shown as a heatmap and directly labelled bars"><figcaption>A short labelled plot can make small differences easier to compare.</figcaption></figure></div><p class="day2-note">Illustrative data. A heatmap remains useful for an overview; choose the display for the question.</p>`:'';
 const demo=hmStoryHTML(id)||(id==='linkage'?linkageDemo():useCases||alternatives||heatmapInteractive(id));
 const supporting=id==='distance'?`<figure class="hm-supporting"><img src="assets/day2-heatmaps/distance-profiles.svg" alt="Profiles A and B have identical shape but differ by ten units; C has the opposite pattern"><figcaption>A and B share a shape but differ in level. Correlation treats their shapes as identical; Euclidean distance retains their level difference.</figcaption></figure>`:id==='linkage'?`<figure class="hm-supporting"><img src="assets/day2-heatmaps/linkage-trees.svg" alt="Single, complete and Ward dendrograms calculated from the same eight points"><figcaption>Same eight illustrative points, three linkage methods. Merge heights have method-specific interpretations.</figcaption></figure>`:id==='data-type'?`<div class="hm-data-examples"><div><h2>Continuous profiles</h2><p><code>2, 3, 5, 4<br>12, 13, 15, 14</code></p><p><strong>Euclidean:</strong> differences in level and magnitude.</p><p><strong>1 − Pearson correlation:</strong> differences in profile shape.</p><p class="day2-note">Scale features when units differ. Correlation is undefined for a constant profile.</p></div><div><h2>Presence / absence</h2><p><code>1, 0, 1, 0<br>1, 0, 0, 0</code></p><p>Jaccard compares shared presences</p></div><div><h2>Abundance</h2><p><code>60, 30, 10<br>10, 30, 60</code></p><p>Bray–Curtis compares abundance profiles</p></div></div>`:'';
 const progressive=['zheat','zprofiles','design-order','shared-scale','direction','bins','missing','correlation','same-data','distance-pattern','distance-transform'].includes(id);
 const revealed=heatmapRevealed.has(id);
 const images=slide.images.length?`<div class="day2-images ${slide.images.length===1?'single':''}">${slide.images.map((im,i)=>progressive&&i===1&&!revealed?`<figure class="hm-reveal-placeholder"><p>${id==='missing'?'How could we distinguish missing values?':'What will the other view reveal?'}</p><button id="day2-reveal">Reveal comparison</button></figure>`:`<figure><img src="assets/day2-heatmaps/${im.file}" alt="${esc(im.label)}"><figcaption>${esc(im.label)}</figcaption></figure>`).join('')}</div>`:'';
 const challengeAnswers={
 'shared-scale':'Use shared colour limits when comparing absolute values across panels. With separate limits, the same colour can represent different values.',
 'missing':'Missing is not zero. Give missing cells a distinct neutral colour or pattern, and label it in the key.',
 'outlier':'An extreme value can compress colour variation among other cells. Consider a justified transformation; if you clip the colour range, mark and disclose it.',
 'design-order':'Clustering can hide the experimental sequence. Keep the design order when time or treatment progression is the question; retain condition annotations.'
 };
 const challenge=challengeAnswers[id]?`<details class="comparison-solution"><summary>Reveal the design lesson</summary><p>${challengeAnswers[id]}</p></details>`:'';
 const bullets=slide.bullets.length?`<ul class="day2-points">${slide.bullets.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:'';
 const credits=`<details class="day2-source"><summary>Source & teaching notes</summary><p>${slide.source.length?'Adapted from “Slides plotting course-2.pptx”,':'New interactive teaching example; related course material:'} original slide${slide.source.length>1?'s':''} ${slide.source.join(', ')}. Course deck credited to Giorgos Kallergis, Steven Medina and Philipp C. Münch. Original figure images retained.</p>${slide.credit.map(([label,url])=>`<p><a href="${url}" target="_blank" rel="noopener">${esc(label)}</a></p>`).join('')}<p>The wording has been shortened for presentation. Small matrices and rectangular cells are design choices rather than blanket errors; choose clustering methods for the scientific question.</p></details>`;
 app.innerHTML=`<section class="day2-slide"><p class="presentation-kicker">Day 2 · Part 2 · ${esc(slide.group)}</p><h1>${esc(slide.title)}</h1><p class="day2-intro">${esc(slide.note)}</p>${demo||`${images}${supporting}${bullets}${slide.extra}`}${demo?`<details><summary>Original course example</summary>${images}${bullets}${slide.extra}</details>`:''}${challenge}${credits}<nav class="navigation footer-controls"><button id="day2-prev">Previous</button><span>${index+1} / ${day2HeatmapSlides.length}</span><button id="day2-next" ${index===day2HeatmapSlides.length-1?'disabled':''}>${index===day2HeatmapSlides.length-1?'Finished':'Next'}</button></nav></section>`;
 bindHeatmapInteractive(id);
 bindHmStory(id);
 if(id==='r-preview')bindWideLong();
 document.querySelectorAll('[data-assignment-cell]').forEach(button=>button.onclick=()=>{
 const [r,c]=button.dataset.assignmentCell.split(',').map(Number), row=assignmentContextData.rows[r], v=row.values[c];
 document.querySelector('#assignment-cell-readout').innerHTML=`<p><strong>SNP ${row.snp}</strong><br>Mouse 1683 · day ${assignmentContextData.days[c]}</p><p class="hm-big-value">${v.toFixed(3)} ≈ ${(v*100).toFixed(1)}%</p>`;
 document.querySelectorAll('[data-assignment-cell]').forEach(b=>b.classList.toggle('selected',b===button));
 });
 if(id==='linkage')bindLinkageDemo();
 const reveal=document.querySelector('#day2-reveal');
 if(reveal)reveal.onclick=()=>{heatmapRevealed.add(id);day2HeatmapsPage(id);};
 document.querySelector('#day2-prev').onclick=()=>{location.hash=index===0?'day2-heatmaps':`day2-heatmaps/${day2HeatmapSlides[index-1].id}`;};
 document.querySelector('#day2-next').onclick=()=>{if(index<day2HeatmapSlides.length-1)location.hash=`day2-heatmaps/${day2HeatmapSlides[index+1].id}`;};
}
