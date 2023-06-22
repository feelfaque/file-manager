import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs";
import { join } from "node:path";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const moveFile = (command) => {
  const oldPath = getFirstArg(command);
  const newPathDir = getSecondArg(command);
  const fileName = getFileName(oldPath);

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
};
