"""Same vector canvas and measurements, different visual element sizes."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent/'assets'
for name,font,marker,line in [('small',5,2,.4),('readable',10,6,1.5)]:
    fig,ax=plt.subplots(figsize=(4,3))
    fig.subplots_adjust(left=.18,bottom=.2,right=.95,top=.93)
    ax.plot([0,1,2,3],[2,4,3,7],'-o',color='#0072B2',lw=line,markersize=marker)
    ax.set(xlim=(-.15,3.15),ylim=(0,8),xticks=[0,1,2,3],yticks=[0,2,4,6,8])
    ax.set_xlabel('Time (days)',fontsize=font)
    ax.set_ylabel('Response',fontsize=font)
    ax.tick_params(labelsize=font,width=line)
    ax.spines[['top','right']].set_visible(False)
    for spine in ax.spines.values():spine.set_linewidth(line)
    fig.savefig(ROOT/f'readability-{name}.svg')
    plt.close(fig)

# Compensate for reduced display widths with stronger source typography.
for percent,font,marker,line in [(40,16,8,2),(30,20,10,2.4)]:
    fig,ax=plt.subplots(figsize=(4,3),layout='constrained')
    ax.plot([0,1,2,3],[2,4,3,7],'-o',color='#0072B2',lw=line,markersize=marker)
    ax.set(xlim=(-.15,3.15),ylim=(0,8),xticks=[0,1,2,3],yticks=[0,4,8])
    ax.set_xlabel('Time (days)',fontsize=font,labelpad=3)
    ax.set_ylabel('Response',fontsize=font,labelpad=3)
    ax.tick_params(labelsize=font,width=1.2,pad=3)
    ax.spines[['top','right']].set_visible(False)
    ax.spines[['left','bottom']].set_linewidth(1.2)
    fig.savefig(ROOT/f'readability-compact-{percent}.svg')
    plt.close(fig)
