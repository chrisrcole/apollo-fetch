import { nanoid } from "./nanoid";

const base = "http://localhost:5000/";

export const shortenLink = () => {
  return base + nanoid(5);
};
