#!/bin/bash

source "$BASE_DIR/bin/print.sh"

install_g_package() {
  [[ -z "$*" ]] && error "No arguments provided"

  for package in "$@"; do
    if npm ls -g "$package" --depth=0 | grep "$package" >/dev/null 2>&1; then
      info "The package $package is already installed globally"
    else
      info "Installing $package global package..."
      yarn global add "$package"
    fi
  done
}
