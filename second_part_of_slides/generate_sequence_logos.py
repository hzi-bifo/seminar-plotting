"""Original DNA motifs: frequency and information logos of identical counts."""
from pathlib import Path
import csv, math
counts = [[25,25,25,25],[10,10,70,10],[90,3,4,3],[2,3,3,92],[5,85,5,5],[10,15,60,15],[40,10,40,10],[25,25,25,25]]
bases='ACGT'; colors=['#238b45','#2171b5','#a66f00','#cb181d']
with open('data/gallery-motif.csv','w') as f:
 w=csv.writer(f);w.writerow(['position',*bases]);w.writerows([[i+1,*r] for i,r in enumerate(counts)])
for kind in ('frequency','information'):
 maximum=1 if kind=='frequency' else 2
 svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="750" viewBox="0 0 1100 750">','<rect width="1100" height="750" fill="white"/>','<g font-family="Arial, sans-serif" fill="#111">']
 svg.append('<path d="M110 100 V600 H1030" fill="none" stroke="#111"/>')
 for t in [0,maximum/2,maximum]:
  y=600-t/maximum*500
  svg.append(f'<path d="M103 {y} H110" stroke="#111"/><text x="90" y="{y+7}" text-anchor="end" font-size="22">{t:g}</text>')
 for i,row in enumerate(counts):
  freq=[x/sum(row) for x in row];info=2+sum(p*math.log2(p) for p in freq if p)
  heights=[p*(1 if kind=='frequency' else info) for p in freq];bottom=600
  for j in sorted(range(4),key=lambda j:heights[j]):
   h=heights[j]/maximum*500
   if h<.01:continue
   x=130+i*110
   # Arial capitals occupy approximately 73 units at font-size 100.
   svg.append(f'<text transform="translate({x},{bottom}) scale(1,{h/73})" font-family="Arial" font-weight="bold" font-size="100" textLength="82" lengthAdjust="spacingAndGlyphs" fill="{colors[j]}">{bases[j]}</text>')
   bottom-=h
  svg.append(f'<text x="{171+i*110}" y="635" text-anchor="middle" font-size="22">{i+1}</text>')
 svg.append('<text x="560" y="690" text-anchor="middle" font-size="25">Position in aligned DNA sequences</text>')
 label='Base frequency' if kind=='frequency' else 'Information (bits)'
 svg.append(f'<text transform="translate(35,350) rotate(-90)" text-anchor="middle" font-size="25">{label}</text>')
 svg.append('<text x="550" y="55" text-anchor="middle" font-size="23">100 aligned sequences; same counts in both views</text></g></svg>')
 Path(f'assets/gallery-logo-{kind}.svg').write_text('\n'.join(svg))
