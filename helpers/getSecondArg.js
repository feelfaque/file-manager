export const getSecondArg = (command) => {
  if (command.includes("'") ) {
    return command
      .slice(command.indexOf("'") + 1, command.lastIndexOf("'"))
      .split("' '")[1];
  } else {
    return command.split(" ")[2];
  }
};
