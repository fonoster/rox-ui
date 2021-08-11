#!/bin/bash

source "$BASE_DIR/bin/print.sh"

import() {
  [[ -z "$*" ]] && error "No arguments provided"

  local FILES=("${@:-${$1[*]}}")

  for file in ${FILES[*]};
  do
    if [[ -f "$file" ]]; then
      source "$file"
    fi
  done
}
