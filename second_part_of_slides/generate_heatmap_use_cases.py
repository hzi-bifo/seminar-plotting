"""Illustrative matrices for the Day 2 heatmap use-case slide."""
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
out=Path(__file__).parent/'assets/day2-heatmaps'
plt.rcParams.update({'font.family':'sans-serif','font.size':10,'axes.spines.top':False,'axes.spines.right':False})
rng=np.random.default_rng(17)
def draw(name,data,rows,cols,label,cmap,vmin=None,vmax=None,binary=False):
 fig,ax=plt.subplots(figsize=(4.5,2.9),layout='constrained')
 im=ax.imshow(data,cmap=cmap,vmin=vmin,vmax=vmax,aspect='auto',interpolation='nearest')
 ax.set_yticks(range(len(rows)),rows);ax.set_xticks(range(len(cols)),cols)
 ax.tick_params(length=0,pad=5)
 cb=fig.colorbar(im,ax=ax,fraction=.045,pad=.04);cb.set_label(label)
 if binary:cb.set_ticks([0,1],labels=['Absent','Present'])
 fig.savefig(out/f'use-case-{name}.svg');plt.close(fig)
x=np.array([[-1,-1.2,-.7,.8,1.2,1],[1,1.3,.7,-.8,-1.1,-1],[-.7,-1,-.9,1.1,.6,1.3],[.2,.5,.1,-.3,-.2,-.3]])
draw('expression',x,['Gene A','Gene B','Gene C','Gene D'],['C1','C2','C3','T1','T2','T3'],'Row z-score','RdBu_r',-1.5,1.5)
x=np.array([[1,1,0,0,1,0],[0,1,1,0,0,0],[0,0,0,1,1,1],[1,0,1,0,0,1]])
from matplotlib.colors import ListedColormap
draw('resistance',x,['Gene A','Gene B','Gene C','Gene D'],['I1','I2','I3','I4','I5','I6'],'Gene presence',ListedColormap(['#edf2f5','#256782']),0,1,True)
x=np.array([[.55,.45,.1,.05],[.15,.25,.1,.15],[.1,.05,.55,.5],[.2,.25,.25,.3]])*100
draw('taxa',x,['Taxon A','Taxon B','Taxon C','Taxon D'],['Soil 1','Soil 2','Water 1','Water 2'],'Relative abundance (%)','viridis',0,60)
base=rng.normal(size=(60,2));profiles=np.column_stack([base[:,0],base[:,0]+rng.normal(0,.3,60),base[:,1],base[:,1]+rng.normal(0,.3,60),-base[:,0]])
draw('correlation',np.corrcoef(profiles.T),['A','B','C','D','E'],['A','B','C','D','E'],'Pearson r','RdBu_r',-1,1)
# Alternative displays retain the same values within each comparison.
fig,axs=plt.subplots(1,2,figsize=(8,2.8),layout='constrained')
a=np.array([[4.8,5.1,5.3]])
axs[0].imshow(a,cmap='viridis',vmin=0,vmax=6,aspect='auto');axs[0].set_xticks(range(3),['A','B','C']);axs[0].set_yticks([]);axs[0].set_title('Colour alone')
axs[1].errorbar([4.8,5.1,5.3],range(3),xerr=[.6,.2,.4],fmt='o',color='#0072b2',capsize=4);axs[1].set_yticks(range(3),['A','B','C']);axs[1].invert_yaxis();axs[1].set_xlabel('Estimate with illustrative 95% CI');axs[1].set_xlim(4,6);axs[1].set_title('Points and intervals')
fig.savefig(out/'alternative-intervals.svg');plt.close(fig)
fig,axs=plt.subplots(1,2,figsize=(8,2.8),layout='constrained');vals=[12,14,13]
axs[0].imshow([vals],cmap='Blues',vmin=0,vmax=15,aspect='auto');axs[0].set_xticks(range(3),['A','B','C']);axs[0].set_yticks([]);axs[0].set_title('Three colours')
axs[1].barh(['A','B','C'],vals,color='#0072b2',height=.55);axs[1].invert_yaxis();axs[1].set_xlim(0,17);axs[1].set_xlabel('Count');axs[1].set_title('Directly labelled values')
for i,v in enumerate(vals):axs[1].text(v+.3,i,str(v),va='center')
fig.savefig(out/'alternative-small.svg');plt.close(fig)
# Profile shape versus magnitude, using two simple series.
fig,ax=plt.subplots(figsize=(6,2.7),layout='constrained')
for values,label,color in [([2,3,5,4],'A','#0072b2'),([12,13,15,14],'B','#c45100'),([5,4,2,3],'C','#6b7891')]:ax.plot(range(1,5),values,'o-',label=label,color=color)
ax.set_xticks(range(1,5));ax.set_xlabel('Sample');ax.set_ylabel('Value');ax.legend(ncol=3,frameon=False,loc='upper left');fig.savefig(out/'distance-profiles.svg');plt.close(fig)
# Actual linkage trees for one fixed set of points.
from scipy.cluster.hierarchy import linkage,dendrogram
points=np.array([[0,0],[0,.5],[.6,.2],[2,0],[3.4,.1],[4.8,0],[5,.5],[5.3,.1]])
fig,axs=plt.subplots(1,3,figsize=(10,2.8),layout='constrained')
for ax,method in zip(axs,['single','complete','ward']):
 dendrogram(linkage(points,method=method),ax=ax,labels=list('ABCDEFGH'),color_threshold=0,above_threshold_color='#316e8b');ax.set_title(method.capitalize());ax.set_ylabel('Merge height')
fig.savefig(out/'linkage-trees.svg');plt.close(fig)
