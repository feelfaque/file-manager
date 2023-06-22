import readline from "node:readline";
import { homedir } from "node:os";
import { greet } from "./functions/greet.js";
import { listFiles } from "./functions/listFiles.js";
import { displayDirectory } from "./functions/displayDirectory.js";
import { readFile } from "./functions/readFile.js";
import { createEmptyFile } from "./functions/createEmptyFile.js";
import { renameFile } from "./functions/renameFile.js";
import { copyFile } from "./functions/copyFile.js";
import { moveFile } from "./functions/moveFile.js";
import { deleteFile } from "./functions/deleteFile.js";

const fileManager = () => {
  const homeDirectory = homedir();
  let currentDirectory = homeDirectory;

  greet();

  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.prompt(displayDirectory(homeDirectory));

  rl.on("line", (command) => {
    if (command === "ls") {
      listFiles(currentDirectory);
    } else if (command.startsWith("cd ")) {
      currentDirectory = `${currentDirectory}/${command.slice(3)}`;
      displayDirectory(currentDirectory);
    } else if (command === "up") {
      currentDirectory = currentDirectory.substring(
        0,
        currentDirectory.lastIndexOf("/")
      );
      displayDirectory(currentDirectory);
    } else if (command.startsWith("cat")) {
      readFile(command);
    } else if (command.startsWith("add")) {
        createEmptyFile(currentDirectory, command);
    } else if (command.startsWith("rn")) {
        renameFile(command);
    } else if (command.startsWith("cp")) {
        copyFile(command);
    } else if(command.startsWith("mv")) {
        moveFile(command);
    } else if (command.startsWith("rm")) {
        deleteFile(command);
    } else {
        console.log("Invalid input");
    }
  });
};

fileManager();
