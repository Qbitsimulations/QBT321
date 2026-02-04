#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-321xlr/out/qbitsim-aircraft-a321-253/. ./qbt-321xlr/src/project/PackageSources

cd /external/qbt-321xlr/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete