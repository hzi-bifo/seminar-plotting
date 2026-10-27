"""Illustrative study summaries; bubble area encodes sample size."""
from pathlib import Path
import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parent
rows=[('A',1,32,20),('B',2,48,50),('C',3,44,100),('D',4,68,200),('E',5,62,50)]
with (ROOT/'data/bubble-sample-sizes.csv').open('w') as f:
    w=csv.writer(f);w.writerow(['study','dose_mg_L','response_percent','independent_samples']);w.writerows(rows)
for good in [False,True]:
    fig,ax=plt.subplots(figsize=(6.5,4.5),layout='constrained')
    for label,x,y,n in rows:
        ax.scatter(x,y,s=n*4,color='#0072B2',alpha=.65,edgecolor='#004c78')
        ax.annotate(f'{label} · n={n}' if good else label,(x,y),xytext=(0,22),textcoords='offset points',ha='center',fontsize=10)
    ax.set(xlim=(.3,6.6),ylim=(0,100),xlabel='Dose (mg/L)',ylabel='Responding samples (%)',xticks=range(1,6))
    ax.spines[['top','right']].set_visible(False)
    if good:
        handles=[ax.scatter([],[],s=n*4,color='#0072B2',alpha=.65,edgecolor='#004c78',label=str(n)) for n in [20,50,100,200]]
        ax.legend(handles=handles,title='Sample size (n)\nCircle area ∝ n',loc='lower right',frameon=False,labelspacing=1.25,borderpad=1)
    fig.savefig(ROOT/f'assets/bubble-samples-{2 if good else 1}.png',dpi=170)
    plt.close(fig)
