#!/bin/bash

setup() {
  local VOICE_APP="apps/voice"
  local GOOGLE_CREDENTIALS="$VOICE_APP/google_credentials.json"

  install_g_package @fonos/ctl ngrok

  if [[ ! -d node_modules ]]; then
    info "Installing local dependencies..."
    yarn install
  fi

  if [[ ! -f $GOOGLE_CREDENTIALS ]]; then
    info "Copying the Google credentials template... 🔧"
    cp "$VOICE_APP/config/credentials.json" $GOOGLE_CREDENTIALS
  fi

  exit 0
}
