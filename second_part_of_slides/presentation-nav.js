// Shared controls proxy the current lesson's existing actions.
const slideBar = document.createElement('nav');
slideBar.className='slide-bar';
slideBar.setAttribute('aria-label','Presentation navigation');
document.body.append(slideBar);
function updateSlideBar() {
  const visible = selector => [...app.querySelectorAll(selector)].find(el=>!el.disabled && !el.hidden && !el.closest('[hidden]'));
  const back=visible('#inkscape-prev, #generative-prev, #comparison-prev, #day2-prev, #submission-prev, #icons-prev, #assembly-prev, #post-prev, #format-prev, #size-prev, #condition-prev, #heatmap-prev, #type-prev, #gallery-prev, #consistency-prev, #point-prev, #step-back, #prev, #last');
  const next=visible('#chapter-start, #day2-reveal, #reveal-teaching, #reveal-focus, #reveal-repair, #begin-walkthrough, #step-next, .recap-next') || visible('#inkscape-next, #generative-next, #comparison-next, #day2-next, #submission-next, #icons-next, #assembly-next, #post-next, #format-next, #size-next, #condition-next, #heatmap-next, #type-next, #gallery-next, #consistency-next, #point-next, #next');
  const plotDetail = /^#plot-(?!types$)[a-z]+$/.test(location.hash);
  const pageProgress = app.querySelector('.footer-controls span')?.textContent;
  const finished = app.querySelector('#inkscape-next:disabled, #generative-next:disabled, #comparison-next:disabled, #day2-next:disabled, #submission-next:disabled, #icons-next:disabled, #assembly-next:disabled, #post-next:disabled, #format-next:disabled, #size-next:disabled, #condition-next:disabled, #consistency-next:disabled, #point-next:disabled, #heatmap-next:disabled');
  const chapter=day3ChapterFor(location.hash);
  const chapterEnd=finished && chapter;
  const chapterIndex=day3Chapters.findIndex(c=>c[0]===String(chapter));
  const nextChapter=day3Chapters[chapterIndex+1];
  const progress=pageProgress || app.querySelector('.consistency-progress')?.textContent || app.querySelector('.presentation-kicker')?.textContent || 'Figures that communicate';
  slideBar.innerHTML=`<a class="slide-overview" href="#home" aria-label="Return to presentation overview" title="Overview (Esc)" aria-keyshortcuts="Escape">Overview</a>${location.hash.startsWith('#day2-heatmaps/')?'<a class="slide-overview" href="#day2-heatmaps">Heatmap topics</a>':''}${location.hash.startsWith('#card-') && cards[current]?.phase===2?'<a class="slide-overview" href="#section-4">Comparisons</a>':''}${plotDetail?'<a class="slide-overview" href="#plot-types">Plot types</a>':''}${location.hash && !['#home','#day3'].includes(location.hash) && !location.hash.startsWith('#day2-heatmaps')?'<a class="slide-overview" href="#day3">Day 3 topics</a>':''}<a class="slide-overview" href="break.html" target="_blank" rel="noopener" title="Open the break page in a new tab">Break</a><button id="slide-back" ${back?'':'disabled'}>${back?.textContent.includes('Back to plot types')?'← Plot types':'← Previous'}</button><span class="slide-status ${pageProgress?'slide-page-count':''}">${progress}</span><button id="slide-forward" ${finished&&!chapterEnd?'disabled':''}>${chapterEnd?(nextChapter?'Next chapter →':'Day 3 topics →'):finished?'Finished':next?next.textContent:'Next section →'}</button>`;
  slideBar.querySelector('#slide-back').onclick=()=>back?.click();
  slideBar.querySelector('#slide-forward').onclick=()=>{
    if(chapterEnd){location.hash=nextChapter?'chapter-'+nextChapter[0]:'day3';return;}
    if(finished)return;
    if(next){next.click();return;}
    const hash=location.hash;
    location.hash=hash==='#home'?'day2-heatmaps':hash==='#day3'?'chapter-1':hash.startsWith('#plot-')||hash==='#plot-types'?'section-2':hash==='#section-3'?'card-'+(cards.findIndex(c=>c.phase===0)+1):hash==='#section-4'?'card-'+(cards.findIndex(c=>c.phase===2)+1):hash==='#section-5'?'consistency':hash==='#section-2'?'card-'+(cards.indexOf(publishedGoodExamples[0])+1):'day3';
  };
}
new MutationObserver(updateSlideBar).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','disabled']});
updateSlideBar();
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){e.preventDefault();location.hash='home';return;}
  if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,button,a,summary,[contenteditable]'))return;
  if(e.key==='ArrowRight'){e.preventDefault();slideBar.querySelector('#slide-forward').click();}
  if(e.key==='ArrowLeft'){e.preventDefault();slideBar.querySelector('#slide-back').click();}
});
