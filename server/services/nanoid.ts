import crypto from "crypto";

const urlAlphabet =
  "ModuleSymbhasOwnPr0123456789ABCDEFGHNRVfgctiUvzKqYTJkLxpZXIjQW";

const buffers: { [key: number]: Buffer } = {};
const random = (bytes: number) => {
  let buffer = buffers[bytes];
  if (!buffer) {
    buffer = Buffer.allocUnsafe(bytes);
    if (bytes <= 255) buffers[bytes] = buffer;
  }
  return crypto.randomFillSync(buffer);
};

export const nanoid = (size = 21) => {
  let bytes = random(size);
  let id = "";
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
