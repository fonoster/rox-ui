#!/bin/bash

# Run the styles and javascript files on different servers as the parcel
# will compile the folder hierarchy if done together. To keep everything at
# the same level, compile the separate style files and browser-sync
# takes care of keeping your browser in sync when any type of file changes.
#
# @author Fonoster
#
web_start() {
  local APP="./apps/web"
  local CONFIG_FILE="$APP/app.config.json"
  local ENV_CONFIG_FILE="$APP/src/config/envs/develop.config.json"

  info "Building web application and resources in development mode..."

  if [[ ! -f $CONFIG_FILE ]]; then
    info "Copying the development configuration... 🔧"
    cp $ENV_CONFIG_FILE $CONFIG_FILE
  fi

  rimraf "$APP/dist"

  concurrently -n "Styles,Typescript,Browsersync" \
    "yarn apps:web start:styles" \
    "yarn apps:web start" \
    "browser-sync start --proxy localhost:3085 --port 3080 --files $APP"

  exit 0
}
