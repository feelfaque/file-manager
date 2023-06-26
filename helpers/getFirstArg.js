export const getFirstArg = (command) => {
    if (command.includes("'") ) {
        return command
          .slice(command.indexOf("'") + 1, command.lastIndexOf("'"))
          .split("' '")[0];
      } else {
        return command.split(" ")[1];
      }
} 