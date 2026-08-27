#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Uso: npm run import:fichas -- /ruta/fichas-arcillas-argentinas.zip" >&2
  exit 2
fi

archive_path=$1
if [[ ! -f "$archive_path" ]]; then
  echo "No se encontró el ZIP: $archive_path" >&2
  exit 2
fi

project_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
target_dir="$project_root/public/fichas"
staging_dir=$(mktemp -d)
trap 'rm -rf "$staging_dir"' EXIT

expected_file="$staging_dir/expected.txt"
actual_file="$staging_dir/actual.txt"

printf '%s\n' \
  "Barbotina bidon 9 kg.pdf" \
  "Barbotina para Gres bidon 9 kg.pdf" \
  "Pasta Blanca con Chamote.pdf" \
  "Pasta Fuego Directo.pdf" \
  "Pasta Gres Tostado Claro.pdf" \
  "Pasta Gres Tostado Oscuro.pdf" \
  "Pasta Lisa Blanca.pdf" \
  "Pasta Raku.pdf" \
  "Pasta Roja con Chamote.pdf" \
  "Pasta Roja.pdf" | sort > "$expected_file"

if unzip -Z1 "$archive_path" | grep -Eq '(^/|(^|/)\.\.(/|$))'; then
  echo "El ZIP contiene una ruta insegura. No se modificó el proyecto." >&2
  exit 1
fi

unzip -qq "$archive_path" -d "$staging_dir/unpacked"
find "$staging_dir/unpacked" -type f -printf '%f\n' | sort > "$actual_file"

if ! diff -u "$expected_file" "$actual_file"; then
  echo "El ZIP no contiene exactamente las diez fichas autorizadas. No se modificó el proyecto." >&2
  exit 1
fi

while IFS= read -r file_name; do
  source_path=$(find "$staging_dir/unpacked" -type f -name "$file_name" -print -quit)
  if [[ -z "$source_path" ]] || ! head -c 5 "$source_path" | grep -q '^%PDF-'; then
    echo "Archivo inválido o no PDF: $file_name. No se modificó el proyecto." >&2
    exit 1
  fi
done < "$expected_file"

while IFS= read -r file_name; do
  source_path=$(find "$staging_dir/unpacked" -type f -name "$file_name" -print -quit)
  install -m 0644 "$source_path" "$target_dir/$file_name"
done < "$expected_file"

echo "Diez fichas originales incorporadas en public/fichas/."
echo "Ejecutá npm test y revisá git diff antes de confirmar el commit."
