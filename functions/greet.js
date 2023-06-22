export const greet = () => {
    const username = process.argv
    .filter((arg) => arg.startsWith("--username="))[0]
    .split("=")[1];
    console.log(`Welcome to the File Manager, ${username}!`);
}