// A connected example throughout the chapter. All values are illustrative.
const hmStory={transform:'raw',palette:'sequential',mid:20,max:40,metric:'correlation',merges:0,order:[0,2,1,3],build:0,designGrouped:false};
function hmValues(mode){
 return heatmapDemoRows.map(row=>{
 const mean=row.reduce((a,b)=>a+b)/6,sd=Math.sqrt(row.reduce((s,v)=>s+(v-mean)**2,0)/5);
 return row.map(v=>mode==='z'?(v-mean)/sd:mode==='log'?Math.log2(v+1):v);
 });
}
function hmStoryMatrix({mode='raw',order=[0,1,2,3],palette='sequential',mid=20,max=40,annotations=true,groups=null,colOrder=[0,1,2,3,4,5]}={}){
 const values=hmValues(mode),limit=mode==='z'?2:mode==='log'?Math.log2(41):max;
 const colour=v=>{
 if(palette==='rainbow')return 'hsl('+ (240-240*Math.max(0,Math.min(1,v/limit)))+',80%,65%)';
 if(palette==='diverging')return heatmapDemoColour(2*(v-mid)/(v<mid?Math.max(.001,mid-(mode==='z'?-2:0)):Math.max(.001,limit-mid)),true);
 return heatmapDemoColour(v/limit*40,false);
 };
 return `<table class="hm-demo-matrix story-matrix"><caption>Same 4 genes × 6 samples · ${{raw:'original values',log:'log₂(value + 1)',z:'row z-scores'}[mode]}</caption><thead>${annotations?`<tr class="hm-conditions"><th>Condition</th>${colOrder.map(c=>`<th style="background:${c<3?'#dbeef4':'#f6dfca'}">${c<3?'Control':'Treated'}</th>`).join('')}</tr>`:''}<tr><th>Gene</th>${colOrder.map(i=>'<th>S'+(i+1)+'</th>').join('')}</tr></thead><tbody>${order.map(r=>`<tr><th style="${groups?'border-left:6px solid '+['#0072b2','#c64f16','#24816c','#8756a6'][groups.findIndex(g=>g.includes(r))]+';':''}">${'ABCD'[r]}</th>${colOrder.map((c,pos)=>{const v=values[r][c];return `<td style="${pos>0&&(colOrder[pos-1]<3)!==(c<3)?'border-left:5px solid #fff;':''}"><button title="Gene ${'ABCD'[r]}, S${c+1}: ${v.toFixed(mode==='raw'?0:2)}" style="background:${colour(v)};color:${palette==='sequential'&&v/limit>.57?'white':'#162b39'}">${v.toFixed(mode==='raw'?0:1)}</button></td>`;}).join('')}</tr>`).join('')}</tbody></table><div class="hm-scale"><span>${mode==='z'?'−2':'0'}</span><div style="background:${palette==='diverging'?'linear-gradient(90deg,#3170a4,#f7f7f7,#b94f30)':palette==='rainbow'?'linear-gradient(90deg,blue,cyan,lime,yellow,red)':'linear-gradient(90deg,#f0f7fa,#1e668b)'}"></div><span>${limit.toFixed(mode==='raw'?0:1)}</span><span>${palette==='diverging'?'Midpoint: '+mid:''}</span></div>`;
}
function hmCluster(){
 const rows=heatmapDemoRows;
 const dist=(a,b)=>{
 if(hmStory.metric==='euclidean')return Math.hypot(...rows[a].map((v,i)=>v-rows[b][i]));
 const centre=r=>{const m=r.reduce((s,v)=>s+v)/6;return r.map(v=>v-m);};
 const x=centre(rows[a]),y=centre(rows[b]);
 return Math.max(0,1-x.reduce((s,v,i)=>s+v*y[i],0)/(Math.hypot(...x)*Math.hypot(...y)));
 };
 let active=rows.map((_,i)=>({ids:[i],height:0})),out=[];
 while(active.length>1){
 let score=Infinity,pair;
 for(let a=0;a<active.length;a++)for(let b=a+1;b<active.length;b++){
 const d=active[a].ids.flatMap(i=>active[b].ids.map(j=>dist(i,j))).reduce((s,v)=>s+v)/(active[a].ids.length*active[b].ids.length);
 if(d<score){score=d;pair=[a,b];}
 }
 const [a,b]=pair,left=active[a],right=active[b],node={ids:[...left.ids,...right.ids],left,right,height:score};
 out.push(node);active=active.filter((_,i)=>i!==a&&i!==b);active.push(node);
 }return out;
}
function hmClusteringHTML(){
 const nodes=hmCluster(),step=hmStory.merges,order=step?nodes[2].ids:hmStory.order;
 let groups=[0,1,2,3].map(i=>[i]);
 nodes.slice(0,step).forEach(n=>{groups=groups.filter(g=>!g.some(i=>n.ids.includes(i)));groups.push(n.ids);});
 const max=Math.max(nodes[2].height,.001),ys=Object.fromEntries(order.map((r,i)=>[r,48+i*48]));
 let paths='';
 const draw=n=>{
 if(!n.left)return {x:270,y:ys[n.ids[0]]};
 const l=draw(n.left),r=draw(n.right),x=260-n.height/max*225,y=(l.y+r.y)/2;
 paths+=`<path d="M${l.x} ${l.y}H${x}V${r.y}H${r.x}" fill="none" stroke="${nodes.indexOf(n)<step?'#0072b2':'#cdd4d8'}" stroke-width="3"/>`;
 return {x,y};
 };draw(nodes[2]);
 return `<div class="linkage-controls"><span>Distance:</span>${['correlation','euclidean'].map(m=>`<button data-hm-metric="${m}" aria-pressed="${hmStory.metric===m}">${m==='correlation'?'1 − Pearson r':'Euclidean'}</button>`).join('')}<span>Average linkage</span></div><div class="hm-story-cluster"><div><svg viewBox="0 0 320 240" role="img" aria-label="Dendrogram of the four genes">${paths}${order.map(r=>`<text x="280" y="${ys[r]+5}">${'ABCD'[r]}</text>`).join('')}</svg><p>Branch length shows merge distance; pale branches are not merged yet.</p></div><div>${hmStoryMatrix({mode:'z',order,palette:'diverging',mid:0,groups})}</div></div><div class="linkage-controls"><label>Merge step <input id="hm-cut" type="range" min="0" max="3" step="1" value="${step}"></label><strong>${4-step} clusters</strong><button id="hm-merge" ${step===3?'disabled':''}>Next merge</button><button id="hm-swap">Swap first two rows manually</button></div><p class="day2-note">Distances use original values; colours show row z-scores. Drag through the merge steps to cut the tree into 4, 3, 2 or 1 clusters. Equal-height merges are resolved in a fixed order.</p>`;
}
function hmDistanceDemo(){
 const rows=heatmapDemoRows.slice(0,3), colours=['#0072b2','#c64f16','#24816c'];
 const mini=(row,r)=>`<svg viewBox="0 0 340 180" role="img" aria-label="Gene ${'ABC'[r]} values across samples S1 to S6"><path d="M40 15V140H320" fill="none" stroke="#647580"/>${[0,20,40].map(v=>`<text x="33" y="${144-v*3}" text-anchor="end" font-size="12">${v}</text>`).join('')}<polyline points="${row.map((v,i)=>`${52+i*50},${140-v*3}`).join(' ')}" fill="none" stroke="${colours[r]}" stroke-width="3"/>${row.map((v,i)=>`<circle cx="${52+i*50}" cy="${140-v*3}" r="4" fill="${colours[r]}"/><text x="${52+i*50}" y="160" text-anchor="middle" font-size="12">S${i+1}</text>`).join('')}</svg>`;
 const pair=(a,b)=>{
 const x=rows[a],y=rows[b],mx=x.reduce((s,v)=>s+v)/6,my=y.reduce((s,v)=>s+v)/6;
 const corr=x.reduce((s,v,i)=>s+(v-mx)*(y[i]-my),0)/(Math.hypot(...x.map(v=>v-mx))*Math.hypot(...y.map(v=>v-my)));
 return `<tr><th>${'ABC'[a]} ↔ ${'ABC'[b]}</th><td>${Math.hypot(...x.map((v,i)=>v-y[i])).toFixed(1)}</td><td>${Math.max(0,1-corr).toFixed(1)}</td></tr>`;
 };
 return `<p>Each row is one gene measured across the same six samples. The small line plot shows that row’s profile—not its mean.</p><div class="hm-distance-layout"><div class="hm-profile-rows">${rows.map((row,r)=>`<article><div><h2>Gene ${'ABC'[r]}</h2><p>${row.join(' · ')}</p></div>${mini(row,r)}</article>`).join('')}<p class="day2-note">Identical y-axis limits (0–40) · illustrative expression values.</p></div><aside><h2>Which genes are most similar?</h2><table class="day2-table"><thead><tr><th>Pair</th><th>Euclidean</th><th>1 − Pearson r</th></tr></thead><tbody>${pair(0,1)}${pair(0,2)}${pair(1,2)}</tbody></table><p>Smaller distance = more similar.</p><details><summary>Reveal the interpretation</summary><p><strong>Euclidean: A and C are closest.</strong> Their values are nearer, even though they move in opposite directions.</p><p><strong>Correlation: A and B match.</strong> Both rise with the same shape, despite B’s higher baseline. Their correlation distance is 0.</p><p>Choose whether your question concerns expression levels or response patterns.</p></details></aside></div>`;
}
// Larger deterministic illustrative matrix, held fixed across palette choices.
const hmPaletteData=Array.from({length:18},(_,r)=>Array.from({length:12},(_,c)=>Math.max(0,Math.min(40,Math.round(8+(r%6)*3+(r<6?(c>=6?13:0):r<12?(c<6?13:0):5)+3*Math.sin(r*2.1+c*1.7))))));
function hmPalettePlot(){
 const {palette,max,mid}=hmStory;
 const colour=v=>palette==='rainbow'?`hsl(${240-240*Math.min(1,v/max)},80%,60%)`:palette==='diverging'?heatmapDemoColour(2*(v-mid)/(v<mid?Math.max(1,mid):Math.max(1,max-mid)),true):heatmapDemoColour(v/max*40,false);
 return `<svg class="hm-palette-plot" viewBox="0 0 530 470" role="img" aria-label="Illustrative expression heatmap with 18 genes and 12 samples"><text x="200" y="19" text-anchor="middle" font-size="14">Control</text><text x="380" y="19" text-anchor="middle" font-size="14">Treated</text><rect x="110" y="26" width="180" height="12" fill="#dbeef4"/><rect x="290" y="26" width="180" height="12" fill="#f6dfca"/>${hmPaletteData.map((row,r)=>`<text x="100" y="${55+r*20}" text-anchor="end" font-size="12">Gene ${r+1}</text>${row.map((v,c)=>`<rect x="${110+c*30}" y="${41+r*20}" width="30" height="20" fill="${colour(v)}"><title>Gene ${r+1}, sample ${c+1}: ${v}</title></rect>`).join('')}`).join('')}${Array.from({length:12},(_,c)=>`<text x="${125+c*30}" y="420" text-anchor="middle" font-size="11">S${c+1}</text>`).join('')}<defs><linearGradient id="hm-palette-key">${Array.from({length:41},(_,i)=>`<stop offset="${i/40*100}%" stop-color="${colour(i/40*max)}"/>`).join('')}</linearGradient></defs><rect x="140" y="438" width="240" height="12" fill="url(#hm-palette-key)"/><text x="130" y="450" text-anchor="end" font-size="12">0</text><text x="390" y="450" font-size="12">${max}</text><text x="260" y="468" text-anchor="middle" font-size="12">Expression (illustrative units)</text></svg>`;
}
function hmStoryHTML(id){
 if(id==='distance')return hmDistanceDemo();
 if(id==='design-order')return `<div class="hm-design-legend"><span><i style="background:#dbeef4"></i>Control · S1–S3</span><span><i style="background:#f6dfca"></i>Treated · S4–S6</span></div><div class="hm-final-preview" style="max-width:900px">${hmStoryMatrix({mode:'z',palette:'diverging',mid:0,colOrder:hmStory.designGrouped?[0,1,2,3,4,5]:[0,3,1,4,2,5]})}</div><div class="linkage-controls"><button id="hm-design-toggle">${hmStory.designGrouped?'Mix the sample order':'Group samples by condition'}</button><strong>${hmStory.designGrouped?'Control │ Treated':'Conditions are interleaved'}</strong></div><p>The annotation belongs to the sample and moves with it. Colour in the strip shows <strong>condition</strong>; colour in the cells shows <strong>row z-score</strong>.</p><details><summary>When to cluster within groups</summary><p>Keep condition blocks fixed when comparing control and treatment. You can then cluster samples within each block. For a time course, preserve meaningful time order instead. This toggle only rearranges samples; it does not perform clustering.</p></details>`;
 if(id==='zscore')return `<div class="linkage-controls">${[['raw','Original'],['log','Log₂(value + 1)'],['z','Row z-score']].map(([m,l])=>`<button data-hm-transform="${m}" aria-pressed="${hmStory.transform===m}">${l}</button>`).join('')}</div><div class="hm-demo"><div>${hmStoryMatrix({mode:hmStory.transform,palette:hmStory.transform==='z'?'diverging':'sequential',mid:0})}</div><aside><h2>Abundance or response pattern?</h2><p>${{raw:'A and B rise in the same way, but B has higher values.',log:'Log compresses large differences. The +1 allows zeros; the choice of offset matters.',z:'A and B now match. Each gene is centred on its own mean and divided by its sample SD.'}[hmStory.transform]}</p><p><strong>Changed:</strong> values and colour scale.<br><strong>Fixed:</strong> samples, gene order and original observations.</p></aside></div>`;
 if(id==='dendrogram')return hmClusteringHTML();
 if(id==='palettes')return `<div class="linkage-controls">${['sequential','diverging','rainbow'].map(m=>`<button data-hm-palette="${m}" aria-pressed="${hmStory.palette===m}">${m}</button>`).join('')}<label>Upper limit <input id="hm-limit" type="range" min="10" max="60" value="${hmStory.max}"></label><label>Midpoint <input id="hm-mid" type="range" min="1" max="39" value="${hmStory.mid}" ${hmStory.palette!=='diverging'?'disabled':''}></label></div><div class="hm-demo"><div>${hmPalettePlot()}</div><aside><button id="hm-recommend">Recommended for these data</button><p id="hm-recommend-note" hidden><strong>Sequential, 0–40:</strong> these are non-negative expression values with no special midpoint. Light to dark shows increasing magnitude without clipping.</p><h2>Does the colour tell the right story?</h2><p>Sequential: ordered magnitude.<br>Diverging: deviations from a meaningful reference.<br>Rainbow: hue changes can suggest boundaries.</p><p>18 genes × 12 samples · illustrative data. Hover a cell to read its value.</p><p>Lower the upper limit: values above it get the same end colour. For centred z-scores, choose a diverging palette instead.</p><p><strong>Fixed:</strong> every measurement.<br><strong>Changed:</strong> only the colour mapping.</p></aside></div>`;
 if(id==='build-final'){
 const k=hmStory.build,titles=['Starting figure','Transform to row z-scores','Use a meaningful colour scale','Order related profiles','Add condition annotations','Make labels readable','Export at the intended size'];
 const codeR=['p <- ggplot(df, aes(sample, gene, fill = value)) + geom_tile()','mat_z <- t(scale(t(mat)))','p + scale_fill_gradient2(low = "#3170a4", mid = "white", high = "#b94f30", midpoint = 0, limits = c(-2, 2))','hc <- hclust(as.dist(1 - cor(t(mat))), method = "average")','annotation <- data.frame(condition = rep(c("Control", "Treated"), each = 3))','p + theme_minimal(base_size = 10) + labs(x = "Sample", y = "Gene")','ggsave("heatmap.pdf", p, width = 90, height = 70, units = "mm")'];
 const codePy=['ax.imshow(mat, cmap="jet")','z = (mat - mat.mean(axis=1, keepdims=True)) / mat.std(axis=1, ddof=1, keepdims=True)','ax.imshow(z, cmap="RdBu_r", vmin=-2, vmax=2)','tree = linkage(pdist(mat, metric="correlation"), method="average")\norder = leaves_list(tree)','conditions = ["Control"] * 3 + ["Treated"] * 3\n# Draw a condition colour strip above the columns.','ax.set_xticks(range(6), labels=sample_names)\nax.set_yticks(range(4), labels=gene_names)','fig.set_size_inches(90 / 25.4, 70 / 25.4)\nfig.savefig("heatmap.pdf", bbox_inches="tight")'];
 return `<h2>${k+1} / 7 · ${titles[k]}</h2><div class="hm-final-preview" style="max-width:${k===6?'480px':'720px'};font-size:${k<5?'12px':'16px'}">${hmStoryMatrix({mode:k?'z':'raw',order:k>=3?[0,1,2,3]:[0,2,1,3],palette:k>=2?'diverging':'rainbow',mid:0,annotations:k>=4})}</div><p>${k===6?'Compact, with readable labels. Inspect the exported file at its final size.':'Same observations throughout; each step changes one display decision.'}</p><div class="linkage-controls"><button id="hm-build-back" ${k===0?'disabled':''}>Previous improvement</button><button id="hm-build-next" ${k===6?'disabled':''}>${k===6?'Finished':'Next improvement'}</button></div><details><summary>Show R / Python change</summary><p>Illustrative snippets; use the same data and ordering in your plotting code.</p><div class="assembly-code"><div><h3>R</h3><pre><code>${consistencyEscape(codeR[k])}</code></pre></div><div><h3>Python</h3><pre><code>${consistencyEscape(codePy[k])}</code></pre></div></div></details>`;
 }
 if(id==='heatmap-checklist')return `<div class="hm-checklist">${[['▦','Values','What does one cell represent?'],['↦','Transformation','Raw, log or scaled—and why?'],['◐','Colour scale','Label units, limits and midpoint.'],['⑂','Ordering','Explain distance, linkage or design order.'],['▰','Annotations','Show conditions and missing values.'],['Aa','Readability','Check labels and colour key at final size.']].map(([icon,title,note])=>`<article><span aria-hidden="true">${icon}</span><h2>${title}</h2><p>${note}</p></article>`).join('')}</div>`;
 return '';
}
function bindHmStory(id){
 const rerender=()=>day2HeatmapsPage(id);
 const recommend=document.querySelector('#hm-recommend');if(recommend)recommend.onclick=()=>{hmStory.palette='sequential';hmStory.max=40;hmStory.mid=20;rerender();document.querySelector('#hm-recommend-note').hidden=false;};
 const design=document.querySelector('#hm-design-toggle');if(design)design.onclick=()=>{hmStory.designGrouped=!hmStory.designGrouped;rerender();};
 for(const [attr,key] of [['transform','transform'],['palette','palette'],['metric','metric']])document.querySelectorAll('[data-hm-'+attr+']').forEach(b=>b.onclick=()=>{hmStory[key]=b.dataset['hm'+attr[0].toUpperCase()+attr.slice(1)];rerender();});
 for(const [name,key] of [['limit','max'],['mid','mid'],['cut','merges']]){const e=document.querySelector('#hm-'+name);if(e)e.onchange=()=>{hmStory[key]=Number(e.value);if(key==='max')hmStory.mid=Math.min(hmStory.mid,hmStory.max-1);rerender();document.querySelector('#hm-'+name)?.focus();};}
 for(const [name,fn] of [['merge',()=>hmStory.merges=Math.min(3,hmStory.merges+1)],['swap',()=>{hmStory.merges=0;[hmStory.order[0],hmStory.order[1]]=[hmStory.order[1],hmStory.order[0]];}],['build-back',()=>hmStory.build--],['build-next',()=>hmStory.build++]]){const b=document.querySelector('#hm-'+name);if(b)b.onclick=()=>{fn();rerender();};}
}
const hmPracticeIndex=day2HeatmapSlides.findIndex(s=>s.id==='practice');
day2HeatmapSlides.splice(hmPracticeIndex,0,...[
 {id:'build-final',title:'Build a final heatmap',note:'One dataset, one decision at a time.'},
 {id:'heatmap-checklist',title:'Before you share: six heatmap checks',note:'Can someone understand the figure without guessing?'}
].map(s=>({...s,group:'Putting it together',images:[],bullets:[],credit:[],source:[],extra:''})));
