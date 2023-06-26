import { open } from "node:fs";
import { join } from "node:path";
import { getFirstArg } from "../helpers/getFirstArg.js";

export const createEmptyFile = (dir, command) => {
  const fileName = getFirstArg(command);
  const filePath = join(dir, fileName);

  open(filePath, "w", (err) => {
    if (err) {
      if (err.code === "EEXIST") {
        console.error("myfile already exists");
        return;
      }
      throw err;
    } else {
      console.log(`File ${fileName} is created.`);
    }
  });
};
