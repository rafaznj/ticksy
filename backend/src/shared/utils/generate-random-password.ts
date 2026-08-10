import { randomInt } from "crypto";

export function generateRandomPassword(length = 16): string {
  if (length < 8 || length > 72) {
    throw new Error("length deve estar entre 8 e 72");
  }

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%";
  const allChars = lowercase + uppercase + numbers + symbols;

  const guaranteed = [
    lowercase[randomInt(lowercase.length)],
    uppercase[randomInt(uppercase.length)],
    numbers[randomInt(numbers.length)],
    symbols[randomInt(symbols.length)],
  ];

  const remaining = Array.from(
    { length: length - guaranteed.length },
    () => allChars[randomInt(allChars.length)],
  );

  const passwordChars = [...guaranteed, ...remaining];

  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join("");
}
