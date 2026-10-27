from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent/'assets'
img=Image.open(ROOT/'format-300dpi.png').convert('RGB')
img.save(ROOT/'format-compressed.jpg',quality=12,subsampling=2)
# Identical crop including y-axis text and a fine axis line.
box=(0,200,260,650)
for name,source in [('png',img),('jpeg',Image.open(ROOT/'format-compressed.jpg'))]:
    source.crop(box).resize((520,900),Image.Resampling.NEAREST).save(ROOT/f'compression-detail-{name}.png')
