#!/bin/bash

# Remove lines of development code
#
# This is a kind of patch-package for some lines of code that should not appear
# in production-build due to the size and security of the assistant.
#
# @author Fonoster
#
patch_line() {
  local PATCH_FILES=(
    "apps/*/src/*.ts*"
    "apps/*/src/**/*.ts*"
    "apps/*/src/**/**/*.ts*"
    "apps/*/src/**/**/**/*.ts*"
    "apps/*/src/**/**/**/**/*.ts*"
  )

  # This is the comment that you should use in your files for the lines that you want to patch.
  # Example:
  # if (__DEV__) ... // @patch-line

  local COMMENT_LINE="@patch-line"

  info "Patch lines"

  for file in ${PATCH_FILES[*]}; do
    if [[ -f "$file" ]]; then

      case $OS in
      MACOS)
        sed -i '' "/$COMMENT_LINE/d" "$file"
        ;;
      *)
        sed -i "/$COMMENT_LINE/d" "$file"
        ;;
      esac

      info "Run patch-line on $file"
    fi
  done

  exit 0
}
