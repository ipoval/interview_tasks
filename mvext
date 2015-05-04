#!/usr/bin/env bash

# Move filename extension from one to another
# Usage: ./mvext txt jpg

[[ $# -eq 2 ]] || { echo "$0" requires 2 parameters >&2; exit 1; }

for file in *".$1"; do
  mv -- $file "${file/%$1/$2}"
done

exit 0
