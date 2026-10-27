"""Same plot with transparent or opaque backgrounds and dark/light ink."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent/'assets'
for name,ink,transparent in [('transparent-dark','#15232e',True),('white','#15232e',False),('transparent-light','#f2f7fa',True)]:
    fig,ax=plt.subplots(figsize=(4,3),layout='constrained')
    ax.plot([0,1,2,3],[2,4,3,7],'-o',color='#299bce',lw=2,markersize=6)
    ax.set(xlim=(-.15,3.15),ylim=(0,8),xticks=[0,1,2,3],yticks=[0,4,8])
    ax.set_xlabel('Time (days)',color=ink)
    ax.set_ylabel('Response',color=ink)
    ax.tick_params(colors=ink)
    ax.spines[['top','right']].set_visible(False)
    for spine in ax.spines.values():spine.set_color(ink)
    fig.savefig(ROOT/f'alpha-{name}.png',dpi=150,transparent=transparent,facecolor='none' if transparent else 'white')
    plt.close(fig)
