import { ExecTask, TaskOfTasks } from '@flybywiresim/igniter';
import { getInstrumentsIgniterTasks } from './build-321xlr/src/systems/instruments/buildSrc/igniter/tasks.mjs';

export default new TaskOfTasks('all', [
    // Boeing 321XLR Tasks
    new TaskOfTasks('QBT_321NY', [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks(
            'preparation',
            [
                new ExecTask('copy-cargo-config', 'npm run build:copy-cargo-config'),
                new ExecTask('copy-cmake-config', 'npm run build:copy-cmake-config'),
                new TaskOfTasks("localization", [
                        new ExecTask("efb-translation","npm run build:efb-translation"),
                        new ExecTask("locPak-translation", "npm run build:locPak-translation"),
                    ], true),
            ],
            false
        ),

        // Group all typescript and react build tasks together.
        new TaskOfTasks(
            'build',
            [
               /* new ExecTask('model', 'npm run build:model', [
                    'build-321xlr/src/model',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/SimObjects/AirPlanes/A321_XLR/model',
                ]),*/
                new ExecTask('behavior', 'npm run build:behavior', [
                    'build-321xlr/src/behavior',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/ModelBehaviorDefs/A32NX/generated',
                ]),
                
                new ExecTask('extras-host', 'npm run build:extras-host', [
                    'build-321xlr/src/systems/extras-host',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N/ExtrasHost',
                    'build-common/src/systems/shared/src/extras',
                ]),
                new ExecTask('systems-host', 'npm run build:systems-host', [
                    'build-321xlr/src/systems/systems-host',
                    'build-common/src/systems/datalink',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/html_ui/Pages/VCockpit/Instruments/QBT_321N/SystemsHost',
                ]),                
                //new TaskOfTasks('instruments', getInstrumentsIgniterTasks(), true)
            ],
            true,
        ),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        /*new TaskOfTasks(
            'wasm',
            [
                new ExecTask('systems', 'npm run build:systems', [
                    'build-321xlr/src/wasm/systems',
                    'build-common/src/wasm/systems',
                    'Cargo.lock',
                    'Cargo.toml',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/SimObjects/AirPlanes/A321_XLR/panel/systems.wasm'
                ]),
                new ExecTask(
                    'systems-terronnd',
                    ['npm run build:terronnd'],
                    [
                        'build-common/src/wasm/terronnd',
                        'build-321xlr/out/qbitsim-aircraft-a321-253/SimObjects/AirPlanes/A321_XLR/panel/terronnd.wasm',
                        'build-common/src/wasm/terronnd/out/terronnd.wasm'
                    ]
                ),
                new ExecTask('cpp-wasm-cmake', 'npm run build:cpp-wasm-cmake', [
                    'build-common/src/wasm/cpp-msfs-framework',
                    'build-common/src/wasm/extra-backend',
                    'build-common/src/wasm/fadec_common',
                    'build-321xlr/src/wasm/extra-backend-a32nx',
                    'build-321xlr/src/wasm/fadec_a32nx',
                    'build-321xlr/out/qbitsim-aircraft-a321-253/SimObjects/AirPlanes/A321_XLR/panel/extra-backend-a32nx.wasm'
                ])
            ],
            true
        ),
        // Create final package meta files.
        new TaskOfTasks(
            'dist',
            [new ExecTask('metadata', 'npm run build:metadata'), new ExecTask('manifests', 'npm run build:manifest')],
            true
        )*/
    ])
]);
