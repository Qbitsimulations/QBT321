// Copyright (c) 2021-2024 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

import fs from 'fs';
import path, { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs
        .readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => {
        const instrumentPath = join(Directories.instruments, 'src', name);
        const config = JSON.parse(fs.readFileSync(join(instrumentPath, 'config.json')));
        return new ExecTask(name, `cd build-321xlr && mach build -f ${name}`, [
            join('build-321xlr/src/systems/instruments/src', name),
            'build-321xlr/src/systems/instruments/src/Common',
            join('build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N', name),
            ...(config.extraDeps || []).map((p) =>
                path.isAbsolute(p)
                    ? path.relative('/', p)
                    : path.relative(Directories.root, path.resolve(join(instrumentPath, p))),
            ),
        ]);
    });
}
