require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/737ec/' + process.env.BUILD_DIR_NAME : 'external/737ec';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./build-321xlr/out/qbitsim-aircraft-a321-253/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-321xlr/out/qbitsim-aircraft-a321-253/install.json', installManifest);