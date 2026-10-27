"""Generate raster/vector teaching exports. Requires matplotlib and Pillow."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from PIL import Image
ROOT=Path(__file__).resolve().parent/'assets'
fig,ax=plt.subplots(figsize=(4,3),layout='constrained')
ax.plot([0,1,2,3],[2,4,3,7],'-o',color='#0072B2',lw=1.5,markersize=5)
ax.set(xlabel='Time (days)',ylabel='Response',xticks=[0,1,2,3],ylim=(0,8))
ax.spines[['top','right']].set_visible(False)
for dpi in [72,150,300,600]:
    fig.savefig(ROOT/f'format-{dpi}dpi.png',dpi=dpi)
fig.savefig(ROOT/'format-vector.svg')
fig.savefig(ROOT/'format-vector.pdf')
plt.close(fig)
# Identical pixel region in the same plot, shown with nearest-neighbour scaling.
for dpi in [72,150,300,600]:
    img=Image.open(ROOT/f'format-{dpi}dpi.png')
    w,h=img.size
    img.crop((int(w*.62),int(h*.24),int(w*.84),int(h*.46))).resize((528,396),Image.Resampling.NEAREST).save(ROOT/f'format-detail-{dpi}.png')

# Crop the SVG viewBox to the same region, retaining vector paths.
import re
svg=(ROOT/'format-vector.svg').read_text()
svg=re.sub(r'viewBox="[^"]+"', 'viewBox="178.56 51.84 63.36 47.52"', svg, count=1)
(ROOT/'format-detail-vector.svg').write_text(svg)
