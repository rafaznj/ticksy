/* eslint-disable no-console */
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import pc from "picocolors";

const ENV_EXAMPLE_PATH = join(process.cwd(), ".env.example");
const ENV_PATH = join(process.cwd(), ".env");

function generateSecret(): string {
  return randomBytes(64).toString("hex");
}

function main(): void {
  try {
    if (!existsSync(ENV_EXAMPLE_PATH)) {
      console.error(pc.red(".env.example file not found."));
      process.exit(1);
    }

    if (existsSync(ENV_PATH)) {
      console.warn(pc.yellow(".env already exists. Skipping environment generation."));
      process.exit(0);
    }

    const content = readFileSync(ENV_EXAMPLE_PATH, "utf8")
      .replace(/^JWT_ACCESS_SECRET=.*$/m, `JWT_ACCESS_SECRET=${generateSecret()}`)
      .replace(/^JWT_REFRESH_SECRET=.*$/m, `JWT_REFRESH_SECRET=${generateSecret()}`);

    writeFileSync(ENV_PATH, content);

    console.log(
      pc.green(
        ".env file created successfully. Review the generated .env file and fill in the remaining variables",
      ),
    );
  } catch {
    console.error(pc.red("Failed to generate the .env file."));
    process.exit(1);
  }
}

main();
