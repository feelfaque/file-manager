import { existsSync } from "node:fs";
import { isAbsolute, join } from "node:path";

export const goToDir = (dir, command) => {
    let path = command.slice(3);

    if (!isAbsolute(path)) {
        path = join(dir, path);
    } 
    if (existsSync(path)) {
        return path;
    } else {
        console.log("Operation failed");
        return dir;
    }

}