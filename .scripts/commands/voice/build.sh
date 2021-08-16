#!/bin/bash

voice_build() {
  local APP="./apps/voice"

  info "Building voice application..."

  rimraf "$APP/dist" "$APP/tsconfig.tsbuildinfo"

  yarn apps:voice build

  exit 0
}
