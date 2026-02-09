#!/bin/bash

set -e

# store current file ownership
ORIGINAL_USER_ID=$(stat -c '%u' /external)
ORIGINAL_GROUP_ID=$(stat -c '%g' /external)

# set ownership to root to fix cargo/rust build (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R root:root /external
fi

cd /external

PNPM_ACTION_TAKEN=false

for arg in "$@"; do
  if [ "$arg" = "--clean" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules/
    PNPM_ACTION_TAKEN=true
  elif [ "$arg" = "--debug" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules/
    rm -rf .pnpm-store/
    pnpm i --loglevel verbose
    PNPM_ACTION_TAKEN=true
  fi
done

# If no specific pnpm-related action was taken by arguments, run default pnpm install
if [ "$PNPM_ACTION_TAKEN" = "false" ]; then
  echo "No specific setup arguments provided. Running default pnpm install."
  pnpm i 
fi

# restore ownership (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R ${ORIGINAL_USER_ID}:${ORIGINAL_GROUP_ID} /external
  pnpm i
fi
