#!/bin/bash

voice_start() {
  local APP="./apps/voice"

  info "Building voice application in development mode..."

  rimraf "$APP/dist" "$APP/tsconfig.tsbuildinfo"

  yarn apps:voice build

  info "Starting voice server and ngrok..."

  concurrently -n "Voice,Ngrok" "yarn apps:voice start" "ngrok http 3000"
}
