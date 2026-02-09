// Copyright (c) 2022 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

'use strict';

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

const { join } = require('path');

const root = join(__dirname, '..', '..', '..', '..', '..', '..');
console.log('Root: ', root);

export default {
  input: join(__dirname, 'instrument.tsx'),
  output: {
    file: join(
      root,
      'build-a321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N/EWD/instrument.js',
    ),
    format: 'es',
  },
  plugins: [
    scss({
      output: join(
        root,
        'build-a321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N/EWD/ewd.css',
      ),
    }),
    resolve(),
    ts(),
  ],
};
