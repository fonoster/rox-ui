#!/bin/bash

prefix() {
  local message

  message=$(echo "$1" | awk '{print toupper($0)}')

  echo -e "[$message]:"
}

error() {
  for err in "$@"; do
    echo -e "🔥 $(prefix "error") $err\n"
  done

  exit 1
}

info() {
  echo -e "🔔 $(prefix "info") $1\n"
}
