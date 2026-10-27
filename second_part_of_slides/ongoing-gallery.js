const ongoingGalleryState={query:'',shelf:'all'};
function ongoingGalleryHTML(){
 const esc=consistencyEscape;
 const shelves=[...new Map(ongoingGalleryItems.map(i=>[i.s,i.sn])).entries()];
 return `<p>Browse all ${ongoingGalleryItems.length.toLocaleString()} drawings from the local library. Click an icon to open its SVG.</p><div class="ongoing-gallery-controls"><label>Search <input id="ongoing-search" type="search" placeholder="Phage, bacteria, microscope…" value="${esc(ongoingGalleryState.query)}"></label><label>Category <select id="ongoing-shelf"><option value="all">All categories</option>${shelves.map(([id,name])=>`<option value="${id}" ${ongoingGalleryState.shelf===id?'selected':''}>${esc(name)}</option>`).join('')}</select></label><span id="ongoing-count" role="status"></span></div><p class="assembly-note">Graphics provided by <a href="https://ongoingscience.com/os/graphics" target="_blank" rel="noopener">Ongoing Science</a>. Local snapshot · 26 October 2026. AI-generated schematics; check scientific details. <a href="assets/ongoing-science/graphics-terms.html" target="_blank" rel="noopener">Saved graphics terms</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0 where applicable</a>.</p><div id="ongoing-gallery-results"></div>`;
}
function bindOngoingGallery(){
 const results=document.querySelector('#ongoing-gallery-results');if(!results)return;
 const esc=consistencyEscape;
 const draw=()=>{
  const query=ongoingGalleryState.query.trim().toLowerCase();
  const items=ongoingGalleryItems.filter(i=>(ongoingGalleryState.shelf==='all'||i.s===ongoingGalleryState.shelf)&&(!query||`${i.n} ${i.nd} ${i.k}`.toLowerCase().includes(query)));
  document.querySelector('#ongoing-count').textContent=`${items.length.toLocaleString()} / ${ongoingGalleryItems.length.toLocaleString()} drawings`;
  const groups=new Map();for(const item of items){if(!groups.has(item.sn))groups.set(item.sn,[]);groups.get(item.sn).push(item);}
  results.innerHTML=items.length?[...groups].map(([name,icons])=>`<section class="ongoing-gallery-group"><h2>${esc(name)} <small>${icons.length}</small></h2><div class="ongoing-icon-grid">${icons.map(i=>`<a href="assets/ongoing-science/${i.id}.svg" target="_blank" rel="noopener" title="${esc(i.n)}"><img src="assets/ongoing-science/${i.id}.svg" alt="${esc(i.n)}" loading="lazy" decoding="async" width="150" height="150"><span>${esc(i.n)}</span><small>${esc(i.cn)}</small></a>`).join('')}</div></section>`).join(''):'<p>No matching drawings. Try another term or category.</p>';
 };
 document.querySelector('#ongoing-search').oninput=e=>{ongoingGalleryState.query=e.target.value;draw();};
 document.querySelector('#ongoing-shelf').onchange=e=>{ongoingGalleryState.shelf=e.target.value;draw();};
 draw();
}
