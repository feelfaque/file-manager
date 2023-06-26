import { createReadStream, existsSync } from "node:fs";
import { getFirstArg } from "../helpers/getFirstArg.js";

export const readFile = (command) => {
  const filePath = getFirstArg(command);

  if (existsSync(filePath)) {
    const stream = createReadStream(filePath, "utf-8");
    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error("The file does not exist");
        return;
      }
      throw err;
    });

    stream.on("data", (data) => {
      process.stdout.write(data);
    });
  } else {
    console.error("File doesn't exist");
  }
};
