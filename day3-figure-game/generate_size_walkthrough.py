"""Figure-size lesson. Requires matplotlib; run from any directory."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent
names=['Control','Low dose','High dose']
values=[42,55,68]
# Dimensions in inches. Font size remains 10 pt: shrinking the canvas is not
# equivalent to scaling an exported image and all its text down together.
versions=[(8,5,False),(8,5,True),(5,3.5,True),(3.5,2.6,True),(1.8,1.25,True)]
for step,(width,height,tight) in enumerate(versions):
    fig,ax=plt.subplots(figsize=(width,height))
    if tight:
        fig.subplots_adjust(left=.95/width,right=1-.15/width,bottom=.65/height,top=1-.2/height)
    else:
        fig.subplots_adjust(left=.3,right=.7,bottom=.3,top=.7)
    ax.barh(names,values,color='#0072B2',height=.7)
    ax.invert_yaxis()
    ax.set_xlim(0,100)
    ax.set_xticks([0,50,100])
    ax.set_xlabel('Positive cells\n(%)' if step == 4 else 'Positive cells (%)',fontsize=10)
    ax.tick_params(labelsize=10)
    ax.spines[['top','right']].set_visible(False)
    # Intentionally preserve the canvas; tight bounding-box export would hide waste.
    fig.savefig(ROOT/f'assets/size-step-{step}-v2.png',dpi=160)
    plt.close(fig)
