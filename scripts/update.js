// Copyright (c) 2024 Qbit Simulations
// SPDX-License-Identifier: GPL-3.0

'use strict';

const path = require('path');

const chokidar = require('chokidar');
const { exec } = require('child_process');

// Define your folder paths here
const folders = [
    path.resolve(__dirname, '..', 'qbt-321xlr/src/project/Package/html_ui'),
    path.resolve(__dirname, '..', 'qbt-321xlr/src')
];

// Create a watcher for all folders
const watcher = chokidar.watch(folders, {
  persistent: true,
  ignoreInitial: true
});

// Function to sync the updated file across all folders
function syncFile(filePath, updatedFolder) {
  const fileName = path.basename(filePath);

  folders.forEach(folder => {
    if (folder !== updatedFolder) {
      // Copy the updated file to other folders
      exec(`cp "${filePath}" "${path.join(folder, fileName)}"`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error syncing file to ${folder}:`, stderr);
        } else {
          console.log(`File synced to ${folder}:`, fileName);
        }
      });
    }
  });
}

// Watch for file changes and trigger sync
watcher.on('change', filePath => {
  const updatedFolder = path.dirname(filePath);
  console.log(`File changed: ${filePath}`);
  syncFile(filePath, updatedFolder);
});

console.log('Watching for file changes...');