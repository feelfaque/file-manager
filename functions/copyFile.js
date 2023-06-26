import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const copyFile = (currentDirectory, command) => {
  let oldPath = getFirstArg(command);
  if (!isAbsolute(oldPath)) {
    oldPath = join(currentDirectory, oldPath);
  }
  let newDir = getSecondArg(command);
  if (!isAbsolute(newDir)) {
    newDir = join(currentDirectory, newDir);
  }
  const fileName = getFileName(oldPath);
  const newPath = join(newDir, fileName);

  if (existsSync(oldPath) && existsSync(newDir)) {
    const readableStream = createReadStream(oldPath, "utf-8");
    const writableStream = createWriteStream(newPath, { encoding: "utf-8" });

    readableStream.on("error", (err) => console.error("Operation failed"));
    writableStream.on("error", (err) => console.error("Operation failed"));

    readableStream.pipe(writableStream);
  } else {
    console.error("Operation failed. File doesn't exist");
  }
};
