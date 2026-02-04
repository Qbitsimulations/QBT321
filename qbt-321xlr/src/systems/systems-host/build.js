// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const outFile = 'build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N/SystemsHost/index.js';

// process.env.FBW_TYPECHECK = "1";

esbuild.build(createModuleBuild('build-321xlr', undefined, path.join(__dirname, './index.ts'), outFile, __dirname));
