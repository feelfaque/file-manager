import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { rm } from "node:fs";
import { join, isAbsolute } from "node:path";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const moveFile = (currentDirectory, command) => {
  let oldPath = getFirstArg(command);
  if (!isAbsolute(oldPath)) {
    oldPath = join(currentDirectory, oldPath);
  }
  let newPathDir = getSecondArg(command);
  if (!isAbsolute(newPathDir)) {
    newPathDir = join(currentDirectory, newPathDir);
  }
  const fileName = getFileName(oldPath);

  if (existsSync(oldPath) && existsSync(newPathDir)) {
    const readableStream = createReadStream(oldPath, "utf-8");
    const writableStream = createWriteStream(join(newPathDir, fileName), {
      encoding: "utf-8",
    });

    readableStream.on("error", (err) => {
      console.error(err.message);
    });

    readableStream.on("data", (data) => {
      writableStream.write(data);
    });
    rm(oldPath, (err) => {
      if (err) console.error(err.message);
    });
  } else {
    console.error("File doesn't exist");
  }
};
