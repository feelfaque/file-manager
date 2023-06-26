import { createReadStream, existsSync } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { isAbsolute, join } from "node:path";

export const readFile = (currentDirectory, command) => {
  let filePath = getFirstArg(command);

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }
  if (existsSync(filePath)) {
    const stream = createReadStream(filePath, "utf-8");
    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error("Operation failed. The file does not exist");
        return;
      }
      console.log("Operation failed");
    });

    stream.on("data", (data) => {
      process.stdout.write(`${data}\n`);
    });
  } else {
    console.error("File doesn't exist");
  }
};
