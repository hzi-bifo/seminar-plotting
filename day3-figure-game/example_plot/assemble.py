"""Place vector PDFs at intentionally inconsistent sizes and offsets."""
from pathlib import Path
import pymupdf as fitz

ROOT = Path(__file__).resolve().parent


def main():
    document = fitz.open()
    page = document.new_page(width=1152, height=700)
    page.insert_text((24, 25), "Microbiome responses to antibiotics", fontsize=15, fontname="hebo")
    page.insert_text((24, 43), "Day 1 qPCR + Day 2 PCA and SNP heatmap data | six intentionally mismatched collaborator exports", fontsize=10, color=(.35,.35,.35))
    # x, y, width, height: preserve each source's proportions without aligning plot areas.
    placements = [
        ("a", (18, 72, 380, 263), "a", "hebo", 18),
        ("b", (414, 85, 310, 248), "B.", "tiro", 19),
        ("c", (755, 63, 360, 308), "(c)", "hebo", 13),
        ("d", (18, 393, 387, 251), "D", "cour", 18),
        ("e", (411, 399, 360, 259), "e)", "tiro", 15),
        ("f", (796, 385, 333, 275), "F", "hebo", 21),
    ]
    for panel, (x, y, w, h), label, font, size in placements:
        with fitz.open(ROOT / f"panel_{panel}" / "figure.pdf") as source:
            page.show_pdf_page(fitz.Rect(x, y, x+w, y+h), source, 0)
        page.insert_text((x+3, y-4), label, fontname=font, fontsize=size)
    page.insert_text((24, 685), "Starting version for redesign: colours, typography, legends, spacing and panel labels are intentionally inconsistent.", fontsize=9)
    document.set_metadata({"title": "Unoptimized six-panel figure - Day 1 and Day 2 course data", "author": "Plotting course"})
    document.save(ROOT / "figure_unoptimized.pdf", garbage=4, deflate=True)
    page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False).save(ROOT / "figure_unoptimized.png")
    document.close()


if __name__ == "__main__":
    main()
