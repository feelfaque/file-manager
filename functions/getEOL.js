import { EOL } from "node:os";

export const getEOL = () => {
  const res = JSON.stringify(EOL);
  if (res && typeof res !== undefined) {
    console.log(res);
  } else {
    console.error("Operation failed");
  }
};
