import { cpus } from "node:os";

export const getCPUS = () => {
  const res = cpus().map((item) => item.model);
  if (res && typeof res !== undefined) {
    console.log(res);
  } else {
    console.error("Operation failed");
  }
};
