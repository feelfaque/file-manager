import { createHash } from "node:crypto";
import { existsSync, readFile } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";

export const calculateHash = async (command) => {
  const fileToHash = getFirstArg(command);

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
