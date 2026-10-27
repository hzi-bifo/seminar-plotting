"""Compare actual SVG/PNG bytes at fixed canvas size and raster resolution."""
from pathlib import Path
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent
rng=np.random.default_rng(42)
x=rng.uniform(0,100,50000)
y=np.clip(.6*x+rng.normal(15,12,50000),0,100)
results=[]
for n in [50,500,50000]:
    fig,ax=plt.subplots(figsize=(4,3))
    fig.subplots_adjust(left=.17,bottom=.18,right=.96,top=.95)
    ax.scatter(x[:n],y[:n],s=5,alpha=.35,color='#0072B2',edgecolors='none')
    ax.set(xlim=(0,100),ylim=(0,100),xlabel='Protein A',ylabel='Protein B')
    ax.spines[['top','right']].set_visible(False)
    base=ROOT/'assets'/f'file-size-{n}'
    fig.savefig(str(base)+'.png',dpi=150)
    fig.savefig(str(base)+'.svg')
    if n == 50000:
        fig.savefig(ROOT/'assets/file-size-50000-vector.pdf')
        for collection in ax.collections:
            collection.set_rasterized(True)
        fig.savefig(ROOT/'assets/file-size-50000-hybrid.pdf', dpi=150)
    plt.close(fig)
    results.append(dict(points=n,pngBytes=base.with_suffix('.png').stat().st_size,svgBytes=base.with_suffix('.svg').stat().st_size))
(ROOT/'file-size-data.js').write_text('const fileSizeExamples = '+json.dumps(results)+';\n')
print(json.dumps(results))
