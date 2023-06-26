import { existsSync, rm } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { isAbsolute, join } from "node:path";

export const deleteFile = (currentDirectory, command) => {
  let filePath = getFirstArg(command);

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }
  if (existsSync(filePath)) {
    rm(filePath, (err) => {
      if (err) {
        console.error("Operation failed");
      } else {
        console.log("the file is deleted");
      }
    });
  } else {
    console.error("File doesn't exist");
  }
};
