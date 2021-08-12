#!/bin/bash

web_build() {
  info "Building application and resources..."

  rimraf "apps/web/dist"

  yarn apps:web build
  yarn apps:web build:styles

  exit 0
}
