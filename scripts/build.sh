#!/bin/bash

set -ex

# store current file ownership
ORIGINAL_USER_ID=$(stat -c '%u' /external)
ORIGINAL_GROUP_ID=$(stat -c '%g' /external)

# set ownership to root to fix cargo/rust build (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R root:root /external
  rm -rf /external/flybywire
  rm -rf /external/build-321xlr/src
  rm -rf /external/qbt-321xlr/src
fi

# Loop through the arguments
args=()
for arg in "$@"; do
  # If the argument is "-clean", perform some action
  if [ "$arg" = "-clean" ]; then
    echo "Removing out directories..."
    rm -rf /external/build-321xlr/out
    rm -rf /external/build-321xlr/bundles
  else
    # Otherwise, add the arg it to the new array
    args+=("$arg")
  fi
done

# run build
time npx igniter -r QBT_321NY "$@"

# restore ownership (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R ${ORIGINAL_USER_ID}:${ORIGINAL_GROUP_ID} /external
fi