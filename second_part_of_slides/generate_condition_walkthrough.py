"""Same measurements in every view. Run from any directory; requires numpy and matplotlib."""
from pathlib import Path
import csv
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT = Path(__file__).resolve().parent
with (ROOT / 'data/walkthrough-distribution.csv').open() as handle:
    rows = list(csv.DictReader(handle))
groups = [np.array([float(r['signal']) for r in rows if r['condition'] == name]) for name in ['A', 'B']]
rng = np.random.default_rng(42)
jitter = [rng.uniform(-0.18, 0.18, len(v)) for v in groups]
for step in range(7):
    fig, ax = plt.subplots(figsize=(3.0, 3.0) if step == 6 else (6.2, 4.6), layout='constrained')
    if step in [2, 3]:
        ax.boxplot(groups, positions=[1, 2], widths=0.48, patch_artist=True,
                   showfliers=step == 2, boxprops={'facecolor': '#e5edf0'},
                   medianprops={'color': '#222'}, zorder=1)
    if step in [4, 5, 6]:
        # Fixed absolute bandwidth and density-to-width mapping across both groups.
        for i, v in enumerate(groups, 1):
            y = np.linspace(v.min(), v.max(), 250)
            density = np.exp(-0.5 * ((y[:, None]-v[None, :])/0.65)**2).mean(axis=1)/(0.65*np.sqrt(2*np.pi))
            ax.fill_betweenx(y, i-density*1.1, i+density*1.1,
                             facecolor='#e5edf0', edgecolor='#687880', zorder=1)
    if step in [0, 1, 3, 5, 6]:
        for i, v in enumerate(groups):
            x = np.full(len(v), i+1, dtype=float)
            if step != 0:
                x += jitter[i]
            ax.scatter(x, v, s=90 if step == 0 else 18, alpha=1 if step == 0 else 0.55,
                       color='#0072B2', edgecolors='none', zorder=2)
    if step >= 5:
        for i, v in enumerate(groups, 1):
            ax.plot([i-.17, i+.17], [np.median(v)]*2, color='#222', lw=2, zorder=3)
    ax.set(xlim=(0.5, 2.5), ylim=(0, 18), xlabel='Condition', ylabel='Reporter signal (a.u.)',
           xticks=[1, 2], xticklabels=['A (n = 80)', 'B (n = 80)'])
    ax.spines[['top','right']].set_visible(False)
    fig.savefig(ROOT / f'assets/condition-step-{step}.png', dpi=170)
    if step == 6:
        fig.savefig(ROOT / 'assets/condition-publication.pdf')
        fig.savefig(ROOT / 'assets/condition-publication.svg')
    plt.close(fig)
