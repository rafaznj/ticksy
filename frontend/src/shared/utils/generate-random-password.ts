const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%&*";

export function generateRandomPassword(length = 16): string {
  const safeLength = Math.max(length, 8);
  const allChars = UPPERCASE + LOWERCASE + DIGITS + SYMBOLS;

  const randomValues = new Uint32Array(safeLength);
  crypto.getRandomValues(randomValues);

  const guaranteed = [
    UPPERCASE[randomValues[0] % UPPERCASE.length],
    LOWERCASE[randomValues[1] % LOWERCASE.length],
    DIGITS[randomValues[2] % DIGITS.length],
    SYMBOLS[randomValues[3] % SYMBOLS.length],
  ];

  const remaining = Array.from({ length: safeLength - guaranteed.length }, (_, i) => {
    return allChars[randomValues[i + 4] % allChars.length];
  });

  const password = [...guaranteed, ...remaining];
  for (let i = password.length - 1; i > 0; i--) {
    const j = randomValues[i % randomValues.length] % (i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}
