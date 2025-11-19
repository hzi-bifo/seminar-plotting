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
  local extra="${4-}"
  echo "Rendering ${file} -> ${format}"
  if [[ -n "$extra" ]]; then
    R -e "rmarkdown::render('${file}', output_format=${extra}, output_dir='${out_dir}')"
  else
    R -e "rmarkdown::render('${file}', output_format='${format}', output_dir='${out_dir}')"
  fi
}

DAY2_RMDS=(
  "$SCRIPT_DIR/day2_walkthrough.Rmd"
  "$SCRIPT_DIR/day2_exercises.Rmd"
  "$SCRIPT_DIR/day2_exercises_solution.Rmd"
)

EXTRA_RMDS=(
  "$ROOT_DIR/data/00_prepare_dataset.Rmd"
)

for file in "${DAY2_RMDS[@]}" "${EXTRA_RMDS[@]}"; do
  render "$file" "html_document" "$HTML_DIR"
done

for file in "${DAY2_RMDS[@]}"; do
  render "$file" "pdf_document" "$PDF_DIR" "rmarkdown::pdf_document(latex_engine='xelatex')"
done
