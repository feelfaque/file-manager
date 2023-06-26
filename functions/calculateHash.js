import { createHash } from "node:crypto";
import { readFile } from 'node:fs';
import { getFirstArg } from "../helpers/getFirstArg";

export const calculateHash = async (command) => {
    const fileToHash = getFirstArg(command);
        readFile(fileToHash, 'utf8', (err, data) => {
            if(err) {
                console.error("Operation failed!");
            }
            const hash = createHash('sha256').update(data).digest('hex');
            console.log(hash);
        });
};
