import readline from "node:readline";
import { homedir } from "node:os";
import { greet } from "./functions/greet.js";
import { listFiles } from "./functions/listFiles.js";


const fileManager = () => {
    const username = process.argv.filter(arg => arg.startsWith("--username="))[0].slice(11);
    const homeDirectory = homedir();
    let currentDirectory = homeDirectory;

    greet(username);
    const rl = readline.createInterface(process.stdin, process.stdout);

    const displayDirectory = (dir) => {
        rl.setPrompt(`You're currently in ${dir} \n`);
    }
    displayDirectory(homeDirectory);
    rl.prompt();
    rl.on('line', (command) => {
        switch(command) {
            case "ls": {
                listFiles(currentDirectory);
            }
            break;
            default: {
                console.log("Invalid input")
            }
        }
    })
};

fileManager();