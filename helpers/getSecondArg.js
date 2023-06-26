export const getSecondArg = (command) => {
  if (command.indexOf("'") ) {
    return command
      .slice(command.indexOf("'") + 1, command.lastIndexOf("'"))
      .split("' '")[1];
  } else if (command.indexOf("\"")) {
    return command
      .slice(command.indexOf("\"") + 1, command.lastIndexOf("\""))
      .split("' '")[1];
  } else {
    return command.split(" ")[2];
  }
};
