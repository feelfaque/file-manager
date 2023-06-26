import { userInfo } from "node:os";

export const getUsername = () => {
  const username = userInfo()?.username;
  if (username && typeof username !== undefined) {
    console.log(username);
  } else {
    console.error("Operation failed");
  }
};
