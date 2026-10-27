"""Place the six panel PDFs and the shared legend on a 180 mm page at scale 1, add panel letters, export PDF + PNG."""
from pathlib import Path
import json
import pymupdf

OUT = Path(__file__).resolve().parent
TH = json.loads((OUT / "theme.json").read_text())
PT = 72 / 25.4


def main(png_dpi=600):
    pg, pm = TH["page_mm"], TH["panel_mm"]
    doc = pymupdf.open()
    page = doc.new_page(width=pg["width"] * PT, height=pg["height"] * PT)
    # Shared legend across the top.
    with pymupdf.open(OUT / "legend.pdf") as src:
        r = pymupdf.Rect(pg["outer"] * PT, pg["outer"] * PT, (pg["width"] - pg["outer"]) * PT, (pg["outer"] + pg["legend_height"]) * PT)
        page.show_pdf_page(r, src, 0)
    top = pg["outer"] + pg["legend_height"] + pg["legend_gap"]
    letters = "abcdef" if TH["panel_letter_style"] == "lower" else "ABCDEF"
    positions = {}
    for k, letter in enumerate(letters):
        row, col = divmod(k, 3)
        x = pg["outer"] + col * (pm["width"] + pg["gutter_x"])
        y = top + row * (pm["height"] + pg["gutter_y"])
        positions[letter] = (x, y)
        with pymupdf.open(OUT / f"panel_{letter}" / "figure.pdf") as src:
            assert abs(src[0].rect.width - pm["width"] * PT) < 1 and abs(src[0].rect.height - pm["height"] * PT) < 1, letter
            page.show_pdf_page(pymupdf.Rect(x * PT, y * PT, (x + pm["width"]) * PT, (y + pm["height"]) * PT), src, 0)
        page.insert_text(((x + 0.3) * PT, (y + 3.0) * PT), letter, fontsize=TH["size_pt"]["panel_letter"], fontname="hebo")
    doc.set_metadata({"title": "Microbiome responses to antibiotics (six-panel figure, redesigned)", "author": "Plotting course"})
    doc.subset_fonts()
    doc.save(OUT / "figure_optimized.pdf", garbage=4, deflate=True)
    page.get_pixmap(matrix=pymupdf.Matrix(png_dpi / 72, png_dpi / 72), alpha=False).save(OUT / "figure_optimized.png")
    # Per-panel PNG previews next to each panel PDF.
    for letter in letters:
        with pymupdf.open(OUT / f"panel_{letter}" / "figure.pdf") as src:
            src[0].get_pixmap(matrix=pymupdf.Matrix(png_dpi / 72, png_dpi / 72), alpha=False).save(OUT / f"panel_{letter}" / "figure.png")
    doc.close()
    return positions


if __name__ == "__main__":
    main()
