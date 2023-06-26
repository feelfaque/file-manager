import { statSync, existsSync } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";
import { isAbsolute, join } from "node:path";

export const decompressFile = async (currentDirectory, command) => {
  let filePath = getFirstArg(command);
  let destPath = getSecondArg(command);

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }
  if (!isAbsolute(destPath)) {
    destPath = join(currentDirectory, destPath);
  }

  if (existsSync(filePath)) {
    if (existsSync(destPath)) {
      const fileName = getFileName(filePath).slice(0, -3);
      destPath = join(destPath, fileName);

      const readableStream = createReadStream(filePath);
      const writableStream = createWriteStream(destPath);

      const brotli = createBrotliDecompress();
      const stream = readableStream.pipe(brotli).pipe(writableStream);

      stream.on("error", () => {
        console.error("Operation failed");
      });
      stream.on("finish", () => {
        console.log(`The file is decompressed`);
      });
    } else {
      console.error("Operation failed. Destination path has to be a directory");
    }
  } else {
    console.error("Operation failed");
  }
};
