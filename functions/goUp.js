import { homedir } from "node:os";

export const goUp = (currentDirectory) => {
  if (currentDirectory === homedir()) {
    console.error("Operation failed. You can't go higher than home directory");
    return currentDirectory;
  } else {
    return currentDirectory.substring(
      0,
      currentDirectory.lastIndexOf("/")
    );
  }
    
}