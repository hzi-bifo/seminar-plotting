#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
HTML_DIR="$ROOT_DIR/html"
PDF_DIR="$ROOT_DIR/pdf"
mkdir -p "$HTML_DIR" "$PDF_DIR"

render_html() {
  local file="$1"
  R -e "rmarkdown::render('${file}', output_format='html_document', output_dir='${HTML_DIR}')"
}

render_pdf() {
  local file="$1"
  R -e "rmarkdown::render('${file}', output_format='pdf_document', output_dir='${PDF_DIR}')"
}

# Absolute paths to each notebook
render_html "$SCRIPT_DIR/00_prepare.Rmd"
render_pdf  "$SCRIPT_DIR/00_prepare.Rmd"
render_html "$ROOT_DIR/data/00_prepare_dataset.Rmd"
render_pdf  "$ROOT_DIR/data/00_prepare_dataset.Rmd"
render_html "$SCRIPT_DIR/01_explore_data.Rmd"
render_pdf  "$SCRIPT_DIR/01_explore_data.Rmd"
render_html "$SCRIPT_DIR/01_explore_data_exercises.Rmd"
render_pdf  "$SCRIPT_DIR/01_explore_data_exercises.Rmd"
render_html "$SCRIPT_DIR/01_explore_data_exercises_solution.Rmd"
render_pdf  "$SCRIPT_DIR/01_explore_data_exercises_solution.Rmd"
render_html "$SCRIPT_DIR/02_simple_heatmap.Rmd"
render_pdf  "$SCRIPT_DIR/02_simple_heatmap.Rmd"
render_html "$SCRIPT_DIR/03_heatmap_annotations.Rmd"
render_pdf  "$SCRIPT_DIR/03_heatmap_annotations.Rmd"
render_html "$SCRIPT_DIR/02_simple_heatmap_exercises.Rmd"
render_pdf  "$SCRIPT_DIR/02_simple_heatmap_exercises.Rmd"
render_html "$SCRIPT_DIR/02_simple_heatmap_exercises_solution.Rmd"
render_pdf  "$SCRIPT_DIR/02_simple_heatmap_exercises_solution.Rmd"
