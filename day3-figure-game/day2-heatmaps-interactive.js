// Small illustrative matrices for teaching; not measurements from the source deck.
const heatmapDemoRows=[[2,3,4,8,9,10],[22,23,24,28,29,30],[10,9,8,4,3,2],[40,38,36,28,26,24]];
const heatmapDemoState={encoding:false,zscore:false,principle:false,selected:[0,0]};
const heatmapRevealed=new Set();
function heatmapDemoColour(value,scaled){
 const mix=(a,b,t)=>`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(',')})`;
 if(scaled){const t=Math.min(1,Math.abs(value)/2);return mix([247,247,247],value<0?[49,112,164]:[185,79,48],t);}
 return mix([240,247,250],[30,102,139],Math.max(0,Math.min(1,value/40)));
}
function heatmapDemoMatrix(mode){
 const scaled=mode==='zscore'&&heatmapDemoState.zscore;
 const coloured=mode!=='encoding'||heatmapDemoState.encoding;
 const ordered=mode==='principle'&&heatmapDemoState.principle;
 const rowOrder=mode==='principle'?(ordered?[0,1,2,3]:[0,2,1,3]):[0,1,2,3];
 const colOrder=mode==='principle'?(ordered?[0,1,2,3,4,5]:[0,3,1,4,2,5]):[0,1,2,3,4,5];
 return `<table class="hm-demo-matrix"><caption>${scaled?'Row z-scores':'Original values'} · illustrative data</caption><thead><tr class="hm-conditions"><th>Condition</th>${colOrder.map(c=>'<th style="background:'+(c<3?'#dbeef4':'#f6dfca')+'">'+(c<3?'C':'T')+'</th>').join('')}</tr><tr><th>Feature</th>${colOrder.map(c=>`<th>S${c+1}</th>`).join('')}</tr></thead><tbody>${rowOrder.map(r=>{
 const row=heatmapDemoRows[r],mean=row.reduce((a,b)=>a+b,0)/row.length,sd=Math.sqrt(row.reduce((a,b)=>a+(b-mean)**2,0)/(row.length-1));
 return `<tr><th>${'ABCD'[r]}</th>${colOrder.map(c=>{const value=scaled?(row[c]-mean)/sd:row[c];return `<td><button data-hm-cell="${r},${c}" title="Gene ${'ABCD'[r]}, sample ${c+1}: ${value.toFixed(scaled?2:0)}" style="background:${coloured?heatmapDemoColour(value,scaled):'#fff'};color:${coloured&&!scaled&&value>23?'white':'#182b39'}" class="${heatmapDemoState.selected[0]===r&&heatmapDemoState.selected[1]===c?'selected':''}">${scaled?value.toFixed(1):value}</button></td>`;}).join('')}</tr>`;
 }).join('')}</tbody></table>`;
}
function heatmapInteractive(id){
 if(!['encoding','zscore','principle'].includes(id))return '';
 const scaled=id==='zscore'&&heatmapDemoState.zscore;
 const [r,c]=heatmapDemoState.selected,row=heatmapDemoRows[r],mean=row.reduce((a,b)=>a+b,0)/6,sd=Math.sqrt(row.reduce((a,b)=>a+(b-mean)**2,0)/5);
 const text=id==='encoding'?`<h2>One cell, one measurement</h2><p>Feature <strong>${'ABCD'[r]}</strong>, sample <strong>S${c+1}</strong></p><p class="hm-big-value">${row[c]}</p><p>Hover or click a cell to read its value. C: control; T: treated. Then add colour to see the pattern.</p>`:id==='zscore'?`<h2>Inspect feature ${'ABCD'[r]}</h2><p>Value: <strong>${row[c]}</strong><br>Row mean: <strong>${mean.toFixed(1)}</strong><br>Row SD: <strong>${sd.toFixed(2)}</strong></p><p class="hm-calculation">(${row[c]} − ${mean.toFixed(1)}) / ${sd.toFixed(2)}<br>= <strong>${((row[c]-mean)/sd).toFixed(2)}</strong></p><p>A and B have the same shape but different baselines. What happens after row scaling?</p>`:`<h2>Same values, different neighbours</h2><p>Follow the row and sample labels as the order changes.</p><p>Grouping similar profiles reveals two blocks. No measurements are changed.</p><p class="day2-note">This is a hand-arranged example. The clustering slides explain how an algorithm chooses an order.</p>`;
 return `<div class="hm-demo"><div>${heatmapDemoMatrix(id)}<div class="hm-scale"><span>${scaled?'−2':'0'}</span><div style="background:${scaled?'linear-gradient(90deg,#3170a4,#f7f7f7,#b94f30)':'linear-gradient(90deg,#f0f7fa,#1e668b)'}"></div><span>${scaled?'+2':'40'}</span><span>${scaled?'Row z-score':'Value'}</span></div></div><aside>${text}</aside></div><button class="hm-action" id="hm-toggle">${id==='encoding'?(heatmapDemoState.encoding?'Remove colour':'Add colour'):id==='zscore'?(scaled?'Show original values':'Apply row z-scores'):(heatmapDemoState.principle?'Restore mixed order':'Group similar profiles')}</button><p class="day2-note">${id==='zscore'?'Sample standard deviation (n − 1); displayed scores are rounded.':'Labels and values remain visible so you can track each observation.'}</p>`;
}
function bindHeatmapInteractive(id){
 const toggle=document.querySelector('#hm-toggle');
 if(toggle)toggle.onclick=()=>{heatmapDemoState[id]=!heatmapDemoState[id];day2HeatmapsPage(id);};
 document.querySelectorAll('[data-hm-cell]').forEach(button=>button.onclick=()=>{heatmapDemoState.selected=button.dataset.hmCell.split(',').map(Number);day2HeatmapsPage(id);});
}
