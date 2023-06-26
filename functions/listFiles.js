import { readdir } from "node:fs";

export const listFiles = (dir) => {
  readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        delete file.path;
        let fileType = file[Object.getOwnPropertySymbols(file)[0]];
        if (fileType === 1) {
          file.type = "file";
        } else if (fileType === 2) {
          file.type = "directory";
        } else {
          file.type = "-";
        }
      });
      console.table(files.sort((a, b) => (a.type > b.type) ? 1: -1));
    }
  });
};
