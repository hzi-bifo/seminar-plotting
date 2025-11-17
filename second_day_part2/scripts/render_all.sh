#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
HTML_DIR="$ROOT_DIR/html"
PDF_DIR="$ROOT_DIR/pdf"
mkdir -p "$HTML_DIR" "$PDF_DIR"

render() {
  local file="$1"
  local format="$2"
  local out_dir="$3"
  echo "Rendering ${file} -> ${format}"
  R -e "rmarkdown::render('${file}', output_format='${format}', output_dir='${out_dir}')"
}

ALL_RMDS=(
  "$SCRIPT_DIR/00_prepare.Rmd"
  "$ROOT_DIR/data/00_prepare_dataset.Rmd"
  "$SCRIPT_DIR/01_explore_data.Rmd"
  "$SCRIPT_DIR/01_explore_data_exercises.Rmd"
  "$SCRIPT_DIR/01_explore_data_exercises_solution.Rmd"
  "$SCRIPT_DIR/02_simple_heatmap.Rmd"
  "$SCRIPT_DIR/02_simple_heatmap_exercises.Rmd"
  "$SCRIPT_DIR/02_simple_heatmap_exercises_solution.Rmd"
  "$SCRIPT_DIR/03_heatmap_annotations.Rmd"
  "$SCRIPT_DIR/04_full_heatmap.Rmd"
  "$SCRIPT_DIR/04_full_heatmap_exercises.Rmd"
  "$SCRIPT_DIR/04_full_heatmap_exercises_solution.Rmd"
)

HEATMAP_RMDS=(
  "$SCRIPT_DIR/02_simple_heatmap.Rmd"
  "$SCRIPT_DIR/02_simple_heatmap_exercises.Rmd"
  "$SCRIPT_DIR/02_simple_heatmap_exercises_solution.Rmd"
  "$SCRIPT_DIR/03_heatmap_annotations.Rmd"
  "$SCRIPT_DIR/04_full_heatmap.Rmd"
  "$SCRIPT_DIR/04_full_heatmap_exercises.Rmd"
  "$SCRIPT_DIR/04_full_heatmap_exercises_solution.Rmd"
)

for file in "${ALL_RMDS[@]}"; do
  render "$file" "html_document" "$HTML_DIR"
done

for file in "${HEATMAP_RMDS[@]}"; do
  render "$file" "pdf_document" "$PDF_DIR"
done
