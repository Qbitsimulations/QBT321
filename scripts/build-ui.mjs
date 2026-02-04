import React, { useState, useEffect } from 'react';
import { render, Box, Text, Newline, useApp } from 'ink';
import { spawn } from 'child_process';
import mainTask from '../igniter.config.mjs';

const h = React.createElement;

const logo = `  _    _ ______  _    _ _       ___  _  _ _____   __  __ _____ 
 | |  | |____  || |  | | |     / _ \\| || |_   _| |  \\/  | ____|
 | |  | |   / / | |  | | |    | | | | || | | |   | |\\/| |  _|  
 | |__| |  / /  | |__| | |___ | |_| |__  __| |   | |  | | |___ 
  \\____/  /_/    \\____/|_____|\\___/   |_| |_|   |_|  |_ |_____|
`;

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [activeTaskOutput, setActiveTaskOutput] = useState('');
    const { exit } = useApp();

    const runTasks = async (tasksToRun) => {
        for (let i = 0; i < tasksToRun.length; i++) {
            const task = tasksToRun[i];
            
            setTasks(currentTasks => {
                const newTasks = [...currentTasks];
                newTasks[i].status = 'running';
                return newTasks;
            });
            setActiveTaskOutput(`Running: ${task.command}\n\n`);

            const child = spawn(task.command, { shell: true, stdio: 'pipe' });

            let output = '';
            child.stdout.on('data', (data) => {
                const dataStr = data.toString();
                output += dataStr;
                setActiveTaskOutput(current => current + dataStr);
            });
            child.stderr.on('data', (data) => {
                const dataStr = data.toString();
                output += dataStr;
                setActiveTaskOutput(current => current + dataStr);
            });

            const exitCode = await new Promise((resolve) => {
                child.on('close', resolve);
            });
            
            setTasks(currentTasks => {
                const newTasks = [...currentTasks];
                newTasks[i].status = exitCode === 0 ? 'completed' : 'failed';
                newTasks[i].output = output;
                return newTasks;
            });

            if (exitCode !== 0) {
                break;
            }
        }
        setTimeout(() => exit(), 500); // Give a moment for the last render
    };

    useEffect(() => {
        const extractedTasks = [];
        function extractTasks(task) {
            if (task.tasks) {
                task.tasks.forEach(extractTasks);
            } else if(task.command) {
                const command = Array.isArray(task.command) ? task.command.join(' && ') : task.command;
                extractedTasks.push({ name: task.key, command: command, status: 'pending', output: '' });
            }
        }
        extractTasks(mainTask);
        setTasks(extractedTasks);

        runTasks(extractedTasks);
    }, []);

    const taskItems = tasks.map((task, index) => {
        let icon;
        let color = 'white';
        switch (task.status) {
            case 'running':
                icon = '●';
                color = 'yellow';
                break;
            case 'completed':
                icon = '✔';
                color = 'green';
                break;
            case 'failed':
                icon = '✖';
                color = 'red';
                break;
            default:
                icon = '○';
        }
        return h(Text, { key: index, color: color }, `${icon} ${task.name}`);
    });

    return h(
        Box,
        { flexDirection: 'column' },
        h(Text, { bold: true, color:'blue' }, logo),
        h(Text, { bold: true, color:'blue' }, 'A321XLR Build'),
        h(Newline),
        h(Box, { flexDirection: 'row' }, 
            h(Box, {flexDirection: 'column', marginRight: 4, width: '30%'}, ...taskItems),
            h(Box, {flexDirection: 'column', borderStyle: 'round', width: '70%', height: 15}, h(Text, {}, activeTaskOutput))
        )
    );
};

render(h(App));