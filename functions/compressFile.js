import { existsSync } from "node:fs";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getFileName } from "../helpers/getFileName.js";
import { dirname, isAbsolute, join } from "node:path";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { statSync } from "node:fs";

export const compressFile = async (currentDirectory, command) => {
  let filePath = getFirstArg(command);
  let destPath = getSecondArg(command);

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }
  if (!isAbsolute(destPath)) {
    destPath = join(currentDirectory, destPath);
  }

  if (existsSync(filePath)) {
    if(existsSync(destPath)){
      const fileName = `${getFileName(filePath)}.br`;
      destPath = join(destPath, fileName);
      const readableStream = createReadStream(filePath);
      const writableStream = createWriteStream(destPath);

      const brotli = createBrotliCompress();
      const stream = readableStream.pipe(brotli).pipe(writableStream);
      stream.on("error", () => {
        console.error("Operation failed");
      });
      stream.on("finish", () => {
        console.log(`The file is compressed`);
      });
    } else {
      console.error("Operation failed. Destination path has to be a directory");
    }
  } else {
    console.error("File doesn't exist");
  }
};
