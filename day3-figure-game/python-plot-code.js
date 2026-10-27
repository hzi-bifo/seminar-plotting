// Native Matplotlib equivalents of the current browser figure stages.
function pythonPlotCode(kind, stages) {
  const points = kind === 'points';
  const literal = value => {
    if (value === true) return 'True';
    if (value === false) return 'False';
    if (Array.isArray(value)) return '[' + value.map(literal).join(', ') + ']';
    if (value && typeof value === 'object') return '{' + Object.entries(value).map(([k,v])=>JSON.stringify(k)+': '+literal(v)).join(', ') + '}';
    return JSON.stringify(value);
  };
  const settings = stages.map(stage=>points?pointStyle(stage):[0,1,2].map(p=>consistencyStyle(stage,p)));
  const data = points ? pointData : consistencyData;
  return `# Requires matplotlib: pip install matplotlib
# Same observations and styling decisions as the selected walkthrough stages.
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.ticker import MultipleLocator

DATA = ${literal(data)}
SETTINGS = ${literal(settings)}
STAGES = ${literal(stages)}

${points ? `palette = ['#0072B2', '#B34700', '#8e44ad', '#16845b', '#ce3877', '#787000']
for version, (stage, style) in enumerate(zip(STAGES, SETTINGS)):
    fig, ax = plt.subplots(figsize=(7, 6))
    fig.subplots_adjust(left=0.15, bottom=0.15, top=0.88)
    if style['connect']:
        ax.plot([d['x'] for d in DATA], [d['y'] for d in DATA], color='#777777', lw=1, zorder=1)
    for i, d in enumerate(DATA):
        colour = palette[d['group']] if style['colourBy'] == 'condition' else palette[i % 6]
        shape = 's' if style['shapeBy'] == 'condition' and d['group'] else 'o'
        ax.scatter(d['x'], d['y'], s=(2 * style['radius'])**2, marker=shape,
                   color=colour, alpha=style['opacity'], edgecolors='none', zorder=2)
        if style['labelIDs']:
            ax.annotate(d['id'], (d['x'], d['y']), xytext=(5, 5),
                        textcoords='offset points', fontsize=8, zorder=3)
    if style['colourBy'] == 'condition':
        handles = [Line2D([], [], linestyle='', marker=('s' if g and style['shapeBy'] == 'condition' else 'o'),
                          color=palette[g], label=name) for g, name in enumerate(['Control', 'Treated'])]
        ax.legend(handles=handles, loc='lower right', bbox_to_anchor=(1, 1.02), ncol=2, frameon=False)
    else:
        ax.set_title('Colours repeat in recording order', fontsize=11)
    if style['annotateExtremes']:
        for high in [False, True]:
            value = (max if high else min)(d['y'] for d in DATA)
            matches = [d for d in DATA if d['y'] == value]
            refined = style['annotationLayout'] == 'refined'
            # Positions are in data coordinates; place text clear of the cloud.
            text_xy = (68, 87) if high else ((28, 13) if refined else (9, 10))
            ids = ', '.join(d['id'] for d in matches)
            label = ('Highest' if high else 'Lowest') + f' protein B: {value}\\n' + ids
            if refined and len(matches) > 1:
                label += ' (overlapping)'
            ax.text(*text_xy, label, fontsize=10, va='top', zorder=5)
            positions = list(dict.fromkeys((d['x'], d['y']) for d in matches)) if refined else [(d['x'], d['y']) for d in matches]
            for xy in positions:
                anchor = (text_xy[0] - 2, text_xy[1] - 3) if refined else (text_xy[0] + 2, text_xy[1] + 4)
                ax.annotate('', xy=xy, xytext=anchor,
                            arrowprops=dict(arrowstyle='-', color='#555555', lw=1,
                                            shrinkA=0, shrinkB=7 if refined else 0), zorder=4)
                ax.scatter(*xy, s=140, facecolors='none', edgecolors='#333333', zorder=4)
    ax.set(xlim=(0, 100), ylim=(0, 100), xlabel=style['xTitle'], ylabel=style['yTitle'])
    ax.set_xticks(range(0, 101, 20))
    ax.set_yticks(range(0, 101, 20))
    ax.spines[['top', 'right']].set_visible(False)
    fig.savefig(f'point-stage-{stage}-view-{version}.png', dpi=180)
` : `for version, (stage, panels) in enumerate(zip(STAGES, SETTINGS)):
    fig = plt.figure(figsize=(12, 5.4))
    for p, style in enumerate(panels):
        # Retain panel positions from the teaching layout.
        ax = fig.add_axes([style['x']/725, (325-style['y']-150)/325, 165/725, 150/325])
        family = {'Georgia,serif': 'serif', 'monospace': 'monospace', 'Arial,sans-serif': 'sans-serif'}[style['family']]
        for group, values in enumerate(DATA[p]):
            colour = style['colours'][group]
            ax.plot(range(4), values, color=colour, lw=style['width'], linestyle='--' if group else '-')
            ax.scatter(range(4), values, s=[(2*r)**2 for r in style['markerSizes'][group]],
                       marker='s' if group else 'o', color=colour, zorder=3, clip_on=False)
        ax.set(xlim=(0,3), ylim=(0,style['top']))
        ax.set_xticks(range(4))
        ax.set_yticks([0, style['top']/2, style['top']])
        ax.set_xlabel('Time (days)', fontfamily=family, fontsize=style['size'])
        if style['showYTitle']:
            ax.set_ylabel('Marker-positive (%)', fontfamily=family, fontsize=style['size'])
        ax.set_title(['A · T cells','B · B cells','C · Monocytes'][p], loc='left',
                     fontfamily=family, fontsize=style['titleSize'], fontweight='bold', pad=18)
        for label in ax.get_xticklabels() + ax.get_yticklabels():
            label.set_fontfamily(family)
            label.set_fontsize(style['size'])
        if style['showGrid']:
            ax.xaxis.set_minor_locator(MultipleLocator(0.3))
            ax.yaxis.set_minor_locator(MultipleLocator(style['top']/10))
            ax.grid(True, which='both', color='#aaaaaa', lw=0.8)
            ax.tick_params(which='minor', length=0)
            ax.set_axisbelow(True)
        handles = [Line2D([], [], linestyle='', marker='s' if g else 'o',
                          color=style['colours'][g], label=name) for g,name in enumerate(['Control','Treated'])]
        legend_args = dict(loc='upper right') if style['legendPosition'] == 'inside-top-right' else dict(loc='upper center', bbox_to_anchor=(0.5,-0.3), ncol=2)
        ax.legend(handles=handles, frameon=False, prop={'family':family, 'size':style['size']}, **legend_args)
        ax.spines[['top','right']].set_visible(False)
    fig.savefig(f'consistency-stage-{stage}-view-{version}.png', dpi=180)
`}
plt.show()
`;
}
