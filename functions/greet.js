import { username } from "../helpers/username.js";

export const greet = () => {
    console.log(`Welcome to the File Manager, ${username()}!`);
}