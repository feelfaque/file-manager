import readline from "node:readline";
import { homedir } from "node:os";
import { greet } from "./functions/greet.js";
import { listFiles } from "./functions/listFiles.js";
import { displayDirectory } from "./functions/displayDirectory.js";


const fileManager = () => {
    const username = process.argv.filter(arg => arg.startsWith("--username="))[0].slice(11);
    const homeDirectory = homedir();
    let currentDirectory = homeDirectory;

    greet(username);
    const rl = readline.createInterface(process.stdin, process.stdout);

    rl.prompt(displayDirectory(homeDirectory));
    rl.on('line', (command) => {
        if (command === "ls") {
            listFiles(currentDirectory);
        } else if (command.startsWith("cd ")) {
            currentDirectory = `${currentDirectory}/${command.slice(3)}`;
            displayDirectory(currentDirectory);
        } else if (command === "up") {
            currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/'));
            displayDirectory(currentDirectory);
        }
    })
};

fileManager();