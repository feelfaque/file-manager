export const username = () => {
    return process.argv
    .filter((arg) => arg.startsWith("--username="))[0]
    .split("=")[1];
}