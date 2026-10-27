"""A logo's height convention must be explicit; both versions use identical glyphs."""
from pathlib import Path
s=Path('assets/gallery-logo-information.svg').read_text()
Path('assets/repair-seqlogo-1.svg').write_text(s.replace('Information (bits)','Score').replace('100 aligned sequences; same counts in both views','DNA motif'))
Path('assets/repair-seqlogo-2.svg').write_text(s.replace('100 aligned sequences; same counts in both views','100 sequences; uniform background; no small-sample correction'))
