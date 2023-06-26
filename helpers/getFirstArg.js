export const getFirstArg = (command) => {
    if (command.indexOf("'") ) {
        return command
          .slice(command.indexOf("'") + 1, command.lastIndexOf("'"))
          .split("' '")[0];
      } else if (command.indexOf("\"")) {
        return command
          .slice(command.indexOf("\"") + 1, command.lastIndexOf("\""))
          .split("' '")[0];
      } else {
        return command.split(" ")[1];
      }
} 