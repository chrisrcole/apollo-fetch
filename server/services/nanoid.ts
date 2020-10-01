import crypto from "crypto";

const urlAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
  let mask = (2 << (31 - Math.clz32((urlAlphabet.length - 1) | 1))) - 1;
  let step = Math.ceil((1.6 * mask * size) / urlAlphabet.length);

  let id = "";
  while (true) {
    let bytes = random(step);
    let i = step;
    while (i--) {
      id += urlAlphabet[bytes[i] & mask] || "";
      if (id.length === +size) return id;
    }
  }
};
