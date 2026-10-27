// Euclidean agglomeration: deterministic ties, Ward heights use sqrt(2 * delta SSE).
const linkagePoints=[[0,0],[1,0],[2.4,.3],[4,.2],[5.8,.6],[7,1],[7.3,2.8],[9,3]];
const linkageState={method:'single',step:0};
function linkageTree(method){
 const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
 const centroid=ids=>[0,1].map(k=>ids.reduce((sum,i)=>sum+linkagePoints[i][k],0)/ids.length);
 const score=(a,b)=>{
  if(method==='ward')return Math.sqrt(2*a.length*b.length/(a.length+b.length))*distance(centroid(a),centroid(b));
  const pairs=a.flatMap(i=>b.map(j=>distance(linkagePoints[i],linkagePoints[j])));
  return method==='single'?Math.min(...pairs):Math.max(...pairs);
 };
 let active=linkagePoints.map((p,i)=>({ids:[i],id:i,height:0})),merges=[];
 while(active.length>1){
  let best=Infinity,ai=0,bi=1;
  for(let a=0;a<active.length;a++)for(let b=a+1;b<active.length;b++){
   const d=score(active[a].ids,active[b].ids);if(d<best){best=d;ai=a;bi=b;}
  }
  const left=active[ai],right=active[bi],node={ids:[...left.ids,...right.ids],id:8+merges.length,height:best,left,right};
  merges.push(node);active=active.filter((_,i)=>i!==ai&&i!==bi);active.push(node);
 }
 return merges;
}
function linkageDemo(){
 const {method,step}=linkageState,merges=linkageTree(method),last=merges[step-1];
 let groups=linkagePoints.map((_,i)=>[i]);
 merges.slice(0,step).forEach(m=>{groups=groups.filter(g=>!g.some(i=>m.ids.includes(i)));groups.push(m.ids);});
 const colours=['#0072b2','#c64f16','#24816c','#8756a6','#926c00','#c04e84','#466b85','#555'];
 const colour=i=>colours[groups.findIndex(g=>g.includes(i))];
 const names=ids=>ids.map(i=>'ABCDEFGH'[i]).join(', ');
 const dots=linkagePoints.map(([x,y],i)=>`<circle cx="${65+x*38}" cy="${220-y*38}" r="10" fill="${colour(i)}"/><text x="${65+x*38}" y="${203-y*38}" text-anchor="middle">${'ABCDEFGH'[i]}</text>`).join('');
 const leaves=n=>n.left?[...leaves(n.left),...leaves(n.right)]:[n.id],order=leaves(merges[6]);
 const xs=Object.fromEntries(order.map((id,i)=>[id,55+i*53]));
 const max=merges[6].height,yy=h=>250-h/max*205;
 let paths='';
 merges.forEach((m,i)=>{
  m.x=(m.left.x??xs[m.left.id])/2+(m.right.x??xs[m.right.id])/2;
  if(i<step)paths+=`<path d="M${m.left.x??xs[m.left.id]} ${yy(m.left.height)} V${yy(m.height)} H${m.right.x??xs[m.right.id]} V${yy(m.right.height)}" fill="none" stroke="${i===step-1?'#c64f16':'#416574'}" stroke-width="${i===step-1?4:2}"/>`;
 });
 const pointAxes=`<path d="M65 53V220H445" fill="none" stroke="#647580"/>${[0,2,4,6,8,10].map(v=>`<path d="M${65+v*38} 220v5" stroke="#647580"/><text x="${65+v*38}" y="244" text-anchor="middle" font-size="13">${v}</text>`).join('')}${[0,1,2,3,4].map(v=>`<path d="M60 ${220-v*38}h5" stroke="#647580"/><text x="53" y="${225-v*38}" text-anchor="end" font-size="13">${v}</text>`).join('')}<text x="255" y="278" text-anchor="middle">Feature x</text><text transform="translate(20 140) rotate(-90)" text-anchor="middle">Feature y</text>`;
 const tree=`<svg viewBox="0 0 480 295" role="img" aria-label="Dendrogram after ${step} merges"><path d="M30 40V250H450" fill="none" stroke="#aaa"/>${[0,.5,1].map(f=>`<text x="25" y="${yy(max*f)+5}" text-anchor="end" font-size="12">${(max*f).toFixed(1)}</text>`).join('')}${paths}${order.map(i=>`<text x="${xs[i]}" y="275" text-anchor="middle" fill="${colour(i)}">${'ABCDEFGH'[i]}</text>`).join('')}</svg>`;
 const explanation={single:'Nearest pair between two groups.',complete:'Farthest pair between two groups.',ward:'Smallest increase in within-group sum of squares (Euclidean geometry).'}[method];
 return `<div class="linkage-controls" role="group" aria-label="Linkage method">${['single','complete','ward'].map(m=>`<button data-linkage="${m}" aria-pressed="${method===m}">${m[0].toUpperCase()+m.slice(1)}</button>`).join('')}<span>${explanation}</span></div><div class="linkage-panels"><figure><h2>Same eight points</h2><svg viewBox="0 0 480 295" role="img" aria-label="Eight points coloured by current cluster">${pointAxes}${dots}</svg><figcaption>Equal units on both axes · colour shows current groups.</figcaption></figure><figure><h2>Build the tree</h2>${tree}<figcaption>${method==='ward'?'Height = √(2 × increase in sum of squares)':'Height = '+(method==='single'?'nearest':'farthest')+' between-group distance'}</figcaption></figure></div><div class="linkage-status" aria-live="polite">${last?`Merge ${step}: {${names(last.left.ids)}} + {${names(last.right.ids)}} · height ${last.height.toFixed(2)}`:'Start with eight separate groups. Which will merge first?'}<br><small>${8-step} groups remain. Switch methods at the same step to compare.</small></div><div class="linkage-controls"><button id="linkage-reset">Reset</button><button id="linkage-back" ${step===0?'disabled':''}>Undo merge</button><button id="linkage-next" ${step===7?'disabled':''}>${step===7?'Tree complete':'Next merge →'}</button><button id="linkage-all" ${step===7?'disabled':''}>Show full tree</button></div>`;
}
function bindLinkageDemo(){
 document.querySelectorAll('[data-linkage]').forEach(b=>b.onclick=()=>{linkageState.method=b.dataset.linkage;day2HeatmapsPage('linkage');});
 for(const [id,step] of [['reset',0],['back',linkageState.step-1],['next',linkageState.step+1],['all',7]]){
  const b=document.querySelector('#linkage-'+id);if(b)b.onclick=()=>{linkageState.step=Math.max(0,Math.min(7,step));day2HeatmapsPage('linkage');};
 }
}
