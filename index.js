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
import { getEOL } from "./functions/getEOL.js";
import { getCPUS } from "./functions/getCPUS.js";
import { getUsername } from "./functions/getUsername.js";
import { getArch } from "./functions/getArch.js";
import { calculateHash } from "./functions/calculateHash.js";
import { compressFile } from "./functions/compressFile.js";
import { decompressFile } from "./functions/decompressFile.js";
import { goodbye } from "./functions/goodbye.js";
import { goToDir } from "./functions/goToDir.js";
import { goUp } from "./functions/goUp.js";

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
      currentDirectory = goToDir(currentDirectory, command);
      displayDirectory(currentDirectory);
    } else if (command === "up") {
      currentDirectory = goUp(currentDirectory);
      displayDirectory(currentDirectory);
    } else if (command.startsWith("cat")) {
      readFile(currentDirectory, command);
    } else if (command.startsWith("add")) {
      createEmptyFile(currentDirectory, command);
    } else if (command.startsWith("rn")) {
      renameFile(currentDirectory, command);
    } else if (command.startsWith("cp")) {
      copyFile(currentDirectory, command);
    } else if (command.startsWith("mv")) {
      moveFile(currentDirectory, command);
    } else if (command.startsWith("rm")) {
      deleteFile(currentDirectory, command);
    } else if (command === "os --EOL") {
      getEOL();
    } else if (command === "os --cpus") {
      getCPUS();
    } else if (command === "os --homedir") {
      console.log(homedir());
    } else if (command === "os --username") {
      getUsername();
    } else if (command === "os --architecture") {
      getArch();
    } else if (command.startsWith("hash")) {
      calculateHash(currentDirectory, command);
    } else if (command.startsWith("compress")) {
      compressFile(currentDirectory, command);
    } else if (command.startsWith("decompress")) {
      decompressFile(currentDirectory, command);
    } else if (command === ".close") {
      rl.close();
    } else {
      console.log("Invalid input");
    }
  })
  .on("SIGINT", () => {
    rl.close()
  })
  .on("close", () => {
    goodbye()
  });
};

fileManager();
