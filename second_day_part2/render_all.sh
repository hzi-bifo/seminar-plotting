#!/usr/bin/env bash
set -euo pipefail

HTML_DIR="second_day_part2/html"
PDF_DIR="second_day_part2/pdf"
mkdir -p "$HTML_DIR" "$PDF_DIR"

render_html() {
  local file="$1"
  R -e "rmarkdown::render('${file}', output_format='html_document', output_dir='${HTML_DIR}')"
}

render_pdf() {
  local file="$1"
  R -e "rmarkdown::render('${file}', output_format='pdf_document', output_dir='${PDF_DIR}')"
}

render_html 'second_day_part2/scripts/00_prepare.Rmd'
render_html 'second_day_part2/data/00_prepare_dataset.Rmd'
render_html 'second_day_part2/scripts/01_explore_data.Rmd'
render_html 'second_day_part2/scripts/01_explore_data_exercises.Rmd'
render_html 'second_day_part2/scripts/01_explore_data_exercises_solution.Rmd'
render_html 'second_day_part2/scripts/02_simple_heatmap.Rmd'
render_pdf  'second_day_part2/scripts/02_simple_heatmap.Rmd'
render_html 'second_day_part2/scripts/02_simple_heatmap_exercises.Rmd'
render_pdf  'second_day_part2/scripts/02_simple_heatmap_exercises.Rmd'
render_html 'second_day_part2/scripts/02_simple_heatmap_exercises_solution.Rmd'
render_pdf  'second_day_part2/scripts/02_simple_heatmap_exercises_solution.Rmd'
