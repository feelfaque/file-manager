import { join, dirname } from "node:path";
import { rename } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const renameFile = (command) => {
    const oldPath = getFirstArg(command);
    const oldName = getFileName(oldPath);
    const newName = getSecondArg(command);
    const dir = dirname(oldPath);
    const newPath = join(dir, newName)
    
    rename(oldPath, newPath, (err) => {
        if(err) {
            if (err.code === "ENOENT") {
                console.error("The file you want to rename doesn't exist");
            }
            console.log("Operation failed");
        } else {
            console.log(`File ${oldName} is renamed to ${newName}`);
        }
    });
}