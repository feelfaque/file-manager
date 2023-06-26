import { existsSync, rm } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";

export const deleteFile = (command) => {
  const filePath = getFirstArg(command);

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
