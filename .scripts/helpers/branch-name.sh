#!/bin/bash

# This script evaluates your local branch to validate that it follows Roxanne naming rules.
LC_ALL=C

is_valid_branch() {
  local DEFAULT_IFS branch names regex

  branch=$(git branch --show-current | awk '{print tolower($0)}')
  names=(
    "develop"
    "main"
    "build"
    "chore"
    "ci"
    "docs"
    "feat"
    "fix"
    "perf"
    "refactor"
    "style"
    "test"
    "release"
    "wip"
  )

  DEFAULT_IFS=$IFS

  IFS="|"

  regex="(${names[*]})"

  info "Checking if your branch name matches the naming rules..."

  if [[ ! $branch =~ $regex ]]; then

    info "Use one of these conventional commit prefixes:"

    for name in ${names[*]}; do
      echo "   * $name"
    done

    echo -e "\n"

    error "Oops! Your branch '$branch' doesn't seem to comply with the naming rules."
  fi

  info "$branch - LGTM! ✅ "

  IFS=$DEFAULT_IFS

  exit 0
}
