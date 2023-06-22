import { rm } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";

export const deleteFile = (command) => {
  const filePath = getFirstArg(command);

  rm(filePath, (err) => {
    if (err) {
      console.error("Operation failed");
    } else {
      console.log("the file is deleted");
    }
  });
};
