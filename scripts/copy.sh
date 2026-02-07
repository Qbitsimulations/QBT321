#!/bin/bash

set -ex

df -h

#remove directory if it exist
rm -rvf ./build-common

# copy from FBW COMMON source and qbt COMMON into one src
cp -r ./flybywire/fbw-common/. ./build-common
cp -r ./qbt-common/. ./build-common

#remove directory if it exist
rm -rvf ./build-321xlr

# create directory
mkdir -p ./build-321xlr/src
mkdir -p ./build-321xlr/out

mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253-lock-highlight

mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/config/QBT_321N/a321-253ny
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/CSS
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Fonts
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Images
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/JS
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/Airliners/Qbit_A321_Neo/EFB
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/ModelBehaviorDefs/A32NX
mkdir -p ./build-321xlr/out/qbitsim-aircraft-a321-253/effects

# merge from FBW A32NX/base to A321xlr/base
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/config/a32nx/a320-251n/. ./build-321xlr/out/qbitsim-aircraft-a321-253/config/QBT_321N/a321-253ny
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/effects/. ./build-321xlr/out/qbitsim-aircraft-a321-253/effects
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/CSS
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Fonts/QBT_321N
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Images/QBT_321N
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/JS/QBT_321N
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/QBT_321N_Utils
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/A32NX/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo/. ./build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/Airliners/Qbit_A321_Neo
cp -r ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/ModelBehaviorDefs/. ./build-321xlr/out/qbitsim-aircraft-a321-253/ModelBehaviorDefs
cp -r ./flybywire/fbw-a32nx/src/base/.eslintrc.js ./build-321xlr/out

# override with custom files from A321xlr/base
cp -r ./qbt-321xlr/src/base/. ./build-321xlr/out

# merge from FBW A32NX/behavior to A321xlr/behavior
mkdir -p ./build-321xlr/src/behavior
cp -r ./flybywire/fbw-a32nx/src/behavior/. ./build-321xlr/src/behavior
cp -r ./qbt-321xlr/src/behavior/. ./build-321xlr/src/behavior

# merge from FBW A32NX/fonts to A321xlr/fonts
mkdir -p ./build-321xlr/src/fonts
cp -r ./flybywire/fbw-a32nx/src/fonts/. ./build-321xlr/src/fonts

# merge from FBW A32NX/localization to A321xlr/localization
mkdir -p ./build-321xlr/src/localization
cp -r ./flybywire/fbw-a32nx/src/localization/. ./build-321xlr/src/localization
cp -r ./qbt-321xlr/src/localization/. ./build-321xlr/src/localization

# merge from FBW A32NX/model to A321xlr/model
# mkdir -p ./build-321xlr/src/model
# cp -r ./flybywire/fbw-a32nx/src/model/. ./build-321xlr/src/model
# cp -r ./qbt-321xlr/src/model/. ./build-321xlr/src/model

# merge from FBW A32NX/systems to A321xlr/systems
mkdir -p ./build-321xlr/src/systems
cp -r ./flybywire/fbw-a32nx/src/systems/. ./build-321xlr/src/systems
cp -r ./qbt-321xlr/src/systems/. ./build-321xlr/src/systems

# merge from FBW A32NX/wasm to A321xlr/wasm
mkdir -p ./build-321xlr/src/wasm
mkdir -p ./build-321xlr/src/wasm/fbw_a320
mkdir -p ./build-321xlr/src/wasm/fadec_a32nx
mkdir -p ./build-321xlr/src/wasm/systems/a320_systems
cp -r ./flybywire/fbw-a32nx/src/wasm/. ./build-321xlr/src/wasm
cp -r ./qbt-321xlr/src/wasm/. ./build-321xlr/src/wasm

# copy extra files
cp -r ./qbt-321xlr/.env ./build-321xlr/.env
cp -r ./qbt-321xlr/mach.config.js ./build-321xlr/mach.config.js

# ingame panels
mkdir -p qbt-ingamepanels-checklist-fix
cp -r ./flybywire/fbw-ingamepanels-checklist-fix/. ./qbt-ingamepanels-checklist-fix

: <<'END_COMMENT'
# copy from FBW A32NX source and 737 into one src
cp -r ./flybywire/fbw-a32nx/src/behavior/. ./build-321xlr/src/behavior

cp -r ./flybywire/fbw-a32nx/src/fonts/. ./build-321xlr/src/fonts
cp -r ./flybywire/fbw-a32nx/src/localization/. ./build-321xlr/src/localization
cp -r ./flybywire/fbw-a32nx/src/systems/. ./build-321xlr/src/systems
rm -rvf ./build-321xlr/src/systems/instruments/src
mkdir -p ./build-321xlr/src/wasm/fbw_a320
cp -r ./flybywire/fbw-a32nx/src/wasm/fbw_a320/. ./build-321xlr/src/wasm/fbw_a320
mkdir -p ./build-321xlr/src/wasm/fadec_a32nx
cp -r ./flybywire/fbw-a32nx/src/wasm/fadec_a32nx/. ./build-321xlr/src/wasm/fadec_a32nx
mkdir -p ./build-321xlr/src/wasm/systems/a320_systems
cp -r ./flybywire/fbw-a32nx/src/wasm/systems/a320_systems/. ./build-321xlr/src/wasm/systems/a320_systems
cp -r ./flybywire/fbw-a32nx/src/wasm/systems/a320_systems_wasm/. ./build-321xlr/src/wasm/systems/a320_systems_wasm
cp -r ./flybywire/fbw-a32nx/src/systems/instruments/. ./build-321xlr/src/systems/instruments
cp -r ./flybywire/fbw-a32nx/src/wasm/extra-backend-a32nx/. ./build-321xlr/src/wasm/extra-backend-a32nx
cp -r ./flybywire/fbw-a32nx/src/model/. ./build-321xlr/src/model

cp -r ./qbt-321xlr/.env ./build-321xlr/.env
cp -r ./qbt-321xlr/mach.config.js ./build-321xlr/mach.config.js

cp -r ./qbt-321xlr/src/behavior/. ./build-321xlr/src/behavior
cp -r ./qbt-321xlr/src/localization/. ./build-321xlr/src/localization
cp -r ./qbt-321xlr/src/systems/instruments/. ./build-321xlr/src/systems/instruments
cp -r ./qbt-321xlr/src/model/. ./build-321xlr/src/model
cp -r ./qbt-321xlr/src/systems/. ./build-321xlr/src/systems
cp -r ./qbt-321xlr/src/wasm/. ./build-321xlr/src/wasm

# copy base of 737 to out
cp -r ./qbt-321xlr/src/base/qbitsim-aircraft-a321-253/. ./build-321xlr/out/qbitsim-aircraft-a321-253
# cp -r ./qbt-321xlr/src/base/qbitsim-aircraft-a321-253-lock-highlight/. ./build-321xlr/out/qbitsim-aircraft-a321-253-lock-highlight

chmod +x ./build-321xlr/src/wasm/fbw_a320/build.sh
chmod +x ./build-321xlr/src/wasm/fadec_a32nx/build.sh
#chmod +x ./build-321xlr/src/wasm/flypad-backend/build.sh
END_COMMENT
