import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";
import { getSecondArg } from "../helpers/getSecondArg.js";
import { getFileName } from "../helpers/getFileName.js";

export const decompressFile = async (command) => {
  const filePath = getFirstArg(command);
  const destPath = getSecondArg(command);
  const fileName = getFileName(destPath);

  const readableStream = createReadStream(filePath);
  const writableStream = createWriteStream(destPath);

  const brotli = createBrotliDecompress();
  const stream = readableStream.pipe(brotli).pipe(writableStream);

  stream.on("error", () => {
    console.error("Operation failed");
  });
  stream.on("finish", () => {
    console.log(`${fileName} is decompressed`);
  });
};
