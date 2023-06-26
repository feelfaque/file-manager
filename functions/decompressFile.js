import { brotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { getFileName } from "../helpers/getFileName";

export const decompressFile = async () => {
  const filePath = getFirstArg(command);
  const destPath = getSecondArg(command);
  const fileName = getFileName(destPath);

  const readableStream = createReadStream(filePath);
  const writableStream = createWriteStream(destPath);

  const brotli = brotliDecompress();
  const stream = readableStream.pipe(brotli).pipe(writableStream);

  stream.on("error", () => {
    console.error("Operation failed");
  });
  stream.on("finish", () => {
    console.log(`${fileName} is decompressed`);
  });
};

