import { arch } from "node:os";

export const getArch = () => {
  const res = arch();
  if (res && typeof res !== undefined) {
    console.log(res);
  } else {
    console.error("Operation failed");
  }
};
