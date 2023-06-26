import { username } from "../helpers/username.js"

export const goodbye = () => {
    console.log(`Thank you for using File Manager, ${username()}, goodbye!`);
}