"""Same points, labels and axes; rasterize only the point layer."""
from pathlib import Path
import re
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent/'assets'
rng=np.random.default_rng(42)
x=rng.uniform(0,100,5000)
y=np.clip(.6*x+rng.normal(15,12,5000),0,100)
plt.rcParams['svg.fonttype']='none'
fig,ax=plt.subplots(figsize=(4,3))
fig.subplots_adjust(left=.18,bottom=.2,right=.95,top=.95)
points=ax.scatter(x,y,s=3,alpha=.4,color='#0072B2',edgecolors='none')
ax.set(xlim=(0,100),ylim=(0,100),xlabel='Protein A',ylabel='Protein B')
ax.spines[['top','right']].set_visible(False)
for raster in [False,True]:
    points.set_rasterized(raster)
    name='hybrid' if raster else 'vector'
    fig.savefig(ROOT/f'rasterize-{name}.svg',dpi=100)
    fig.savefig(ROOT/f'rasterize-{name}.pdf',dpi=100)
    svg=(ROOT/f'rasterize-{name}.svg').read_text()
    # View includes a section of the left axis, its 20 tick, and nearby points.
    svg=re.sub(r'viewBox="[^"]+"','viewBox="25 115 100 65"',svg,count=1)
    (ROOT/f'rasterize-{name}-zoom.svg').write_text(svg)
plt.close(fig)
