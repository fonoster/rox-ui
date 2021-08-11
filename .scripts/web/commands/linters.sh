#!/bin/bash

linters() {
  yarn git:branch
  yarn lint:format
  yarn lint:check
  yarn lint:ts:check
  yarn apps:web lint:styles

  exit 0
}
