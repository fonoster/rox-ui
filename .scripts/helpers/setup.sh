#!/bin/bash

setup() {
  local VOICE_APP="apps/voice"
  local GOOGLE_CREDENTIALS="$VOICE_APP/google_credentials.json"

  info "Installing Fonos command-line and Ngrok..."
  yarn global add @fonos/ctl ngrok

  info "Installing local dependencies..."
  yarn install

  if [[ ! -f $GOOGLE_CREDENTIALS ]]; then
    info "Copying the Google credentials template... 🔧"
    cp "$VOICE_APP/config/credentials.json" $GOOGLE_CREDENTIALS
  fi

  exit 0
}
