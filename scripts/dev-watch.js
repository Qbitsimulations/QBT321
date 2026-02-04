// Copyright (c) 2024 Qbit Simulations
// SPDX-License-Identifier: GPL-3.0

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Source and destination directories
const sourceDir = path.resolve(__dirname, '..', 'qbt-321xlr/src/systems/instruments');
const destDir = path.resolve(__dirname, '..', 'build-321xlr/src/systems/instruments');
const buildDir = path.resolve(__dirname, '..', 'build-321xlr');

console.log(`Watching: ${sourceDir}`);
console.log(`Copying to: ${destDir}`);
console.log(`Running mach watch in: ${buildDir}`);

// Function to copy a file
function copyFile(src, dest) {
    try {
        // Ensure destination directory exists
        const destDirPath = path.dirname(dest);
        if (!fs.existsSync(destDirPath)) {
            fs.mkdirSync(destDirPath, { recursive: true });
        }

        fs.copyFileSync(src, dest);
        console.log(`✓ Copied: ${path.relative(sourceDir, src)}`);
    } catch (error) {
        console.error(`✗ Error copying ${src} to ${dest}:`, error.message);
    }
}

// Function to copy directory recursively
function copyDirectory(src, dest) {
    try {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const items = fs.readdirSync(src);

        for (const item of items) {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);
            const stat = fs.statSync(srcPath);

            if (stat.isDirectory()) {
                copyDirectory(srcPath, destPath);
            } else {
                copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error(`✗ Error copying directory ${src}:`, error.message);
    }
}

// Function to remove file/directory
function removeItem(itemPath) {
    try {
        if (fs.existsSync(itemPath)) {
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
                fs.rmSync(itemPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(itemPath);
            }
            console.log(`✓ Removed: ${path.relative(destDir, itemPath)}`);
        }
    } catch (error) {
        console.error(`✗ Error removing ${itemPath}:`, error.message);
    }
}

// Initial copy of all files
console.log('\n📁 Performing initial copy...');
if (fs.existsSync(sourceDir)) {
    copyDirectory(sourceDir, destDir);
    console.log('✅ Initial copy completed\n');
} else {
    console.error(`❌ Source directory does not exist: ${sourceDir}`);
    process.exit(1);
}

// Watch for changes using fs.watch
console.log('👀 Starting file watcher...');

const watchDirectory = (dir, baseSource, baseDest) => {
    try {
        const watcher = fs.watch(dir, { recursive: true }, (eventType, filename) => {
            if (!filename) {
                return;
            }

            const fullPath = path.join(dir, filename);
            const relativePath = path.relative(baseSource, fullPath);
            const destPath = path.join(baseDest, relativePath);

            // Skip temporary files and node_modules
            if (filename.includes('.tmp') || filename.includes('node_modules') || filename.startsWith('.')) {
                return;
            }

            console.log(`📝 ${eventType}: ${relativePath}`);

            if (eventType === 'rename') {
                // File/directory was added or removed
                if (fs.existsSync(fullPath)) {
                    // File/directory was added
                    const stat = fs.statSync(fullPath);
                    if (stat.isDirectory()) {
                        copyDirectory(fullPath, destPath);
                    } else {
                        copyFile(fullPath, destPath);
                    }
                } else {
                    // File/directory was removed
                    removeItem(destPath);
                }
            } else if (eventType === 'change') {
                // File content was changed
                if (fs.existsSync(fullPath)) {
                    const stat = fs.statSync(fullPath);
                    if (stat.isFile()) {
                        copyFile(fullPath, destPath);
                    }
                }
            }
        });

        watcher.on('error', (error) => {
            console.error('Watcher error:', error);
        });

        return watcher;
    } catch (error) {
        console.error('Error setting up watcher:', error);
        return null;
    }
};

const watcher = watchDirectory(sourceDir, sourceDir, destDir);

if (!watcher) {
    console.error('❌ Failed to set up file watcher');
    process.exit(1);
}

// Start mach watch in parallel
console.log('🚀 Starting mach watch...\n');

const machProcess = spawn('npx', ['mach', 'watch'], {
    cwd: buildDir,
    stdio: 'pipe',
    shell: true
});

machProcess.stdout.on('data', (data) => {
    process.stdout.write(`[MACH] ${data}`);
});

machProcess.stderr.on('data', (data) => {
    process.stderr.write(`[MACH] ${data}`);
});

machProcess.on('close', (code) => {
    console.log(`\n[MACH] Process exited with code ${code}`);
});

machProcess.on('error', (error) => {
    console.error('[MACH] Error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');

    if (watcher) {
        watcher.close();
        console.log('✅ File watcher stopped');
    }

    if (machProcess && !machProcess.killed) {
        machProcess.kill('SIGINT');
        console.log('✅ Mach watch stopped');
    }

    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down...');

    if (watcher) {
        watcher.close();
    }

    if (machProcess && !machProcess.killed) {
        machProcess.kill('SIGTERM');
    }

    process.exit(0);
});

console.log('✅ Development watcher is running!');
console.log(
    '📝 File changes in qbt-321xlr/src/systems/instruments will be copied to build-321xlr/src/systems/instruments'
);
console.log('🚀 Mach watch is running in build-321xlr');
console.log('Press Ctrl+C to stop\n');
