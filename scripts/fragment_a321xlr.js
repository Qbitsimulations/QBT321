const fragmenter = require('@flybywiresim/fragmenter');
const fs = require('fs');

const execute = async () => {
  try {
    const result = await fragmenter.pack({
      version: require('./fragmenter_version').version,
      packOptions: { splitFileSize: 102_760_448, keepCompleteModulesAfterSplit: false },
      baseDir: './build-321xlr/out/qbitsim-aircraft-a321-253',
      outDir: './build-321xlr/out/build-modules',
      modules: [
        {
          name: 'effects',
          sourceDir: './effects',
        },
        {
          name: 'html_ui',
          sourceDir: './html_ui',
        },
        {
          name: 'CUSTOMIZE',
          sourceDir: './CUSTOMIZE',
        },
        {
          name: 'ModelBehaviorDefs',
          sourceDir: './ModelBehaviorDefs',
        },
        {
          name: 'Textures',
          sourceDir: './SimObjects/AirPlanes/A321_XLR/TEXTURE',
        },
        {
          name: 'Sound',
          sourceDir: './SimObjects/AirPlanes/A321_XLR/sound',
        },
        {
          name: 'Model',
          sourceDir: './SimObjects/AirPlanes/A321_XLR/model',
        },
        {
          name: 'Panels',
          sourceDir: './SimObjects/AirPlanes/A321_XLR/panel',
        },
      ],
    });
    console.log(result);
    console.log(fs.readFileSync('./build-321xlr/out/build-modules/modules.json').toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

execute();
