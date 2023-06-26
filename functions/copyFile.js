import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { join } from "node:path";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const copyFile = (command) => {
  const oldPath = getFirstArg(command);
  const newDir = getSecondArg(command);
  const fileName = getFileName(oldPath);
  const newPath = join(newDir, fileName);

  if (existsSync(oldPath)) {
    const readableStream = createReadStream(oldPath, "utf-8");
    const writableStream = createWriteStream(newPath, { encoding: "utf-8" });

    readableStream.on("error", (err) => console.error("Operation failed"));
    writableStream.on("error", (err) => console.error("Operation failed"));

    readableStream.pipe(writableStream);
  } else {
    console.error("File doesn't exist");
  }
};
