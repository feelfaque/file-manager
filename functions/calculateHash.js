import { createHash } from "node:crypto";
import { existsSync, readFile } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { isAbsolute, join } from "node:path";

export const calculateHash = async (currentDirectory, command) => {
  let fileToHash = getFirstArg(command);
  if (!isAbsolute(fileToHash)) {
    fileToHash = join(currentDirectory, fileToHash);
  }
  if (existsSync(fileToHash)) {
    readFile(fileToHash, "utf8", (err, data) => {
      if (err) {
        console.error("Operation failed!");
      }
      const hash = createHash("sha256").update(data).digest("hex");
      console.log(hash);
    });
  } else {
    console.error("File doesn't exist");
  }
};
