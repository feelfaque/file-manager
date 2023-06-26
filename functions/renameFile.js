import { join, dirname, isAbsolute } from "node:path";
import { rename } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const renameFile = (currentDirectory, command) => {
  let oldPath = getFirstArg(command);
  if(!isAbsolute(oldPath)) {
    oldPath = join(currentDirectory, oldPath);
  }
  
  const oldName = getFileName(oldPath);
  const newName = getSecondArg(command);
  const dir = dirname(oldPath);
  const newPath = join(dir, newName);


  rename(oldPath, newPath, (err) => {
    if (err) {
      console.log("Operation failed");
    } else {
        console.log(`File ${oldName} is renamed to ${newName}`);
    }
  });
};
