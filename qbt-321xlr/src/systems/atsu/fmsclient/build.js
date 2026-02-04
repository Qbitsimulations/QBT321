// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const outFile = 'build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/JS/QBT_321N/atsu/fmsclient.js';

esbuild.build(createModuleBuild('build-321xlr', 'AtsuFmsClient', path.join(__dirname, 'src/index.ts'), outFile, __dirname));
