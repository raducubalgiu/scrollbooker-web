import fs from "node:fs";
import { expect } from "@playwright/test";
import { OUTBOX_PATH } from "./env";

type OutboxEntry = { to: string[]; subject: string; html: string };

function entriesFor(email: string): OutboxEntry[] {
  if (!fs.existsSync(OUTBOX_PATH)) return [];
  return fs
    .readFileSync(OUTBOX_PATH, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as OutboxEntry)
    .filter((entry) => entry.to.includes(email));
}

export async function waitForEmailCode(
  email: string,
  afterCount = 0,
): Promise<string> {
  let code: string | undefined;

  await expect
    .poll(
      () => {
        const entries = entriesFor(email);
        if (entries.length <= afterCount) return undefined;
        code = entries.at(-1)?.html.match(/>\s*(\d{6})\s*</)?.[1];
        return code;
      },
      { message: `no email code for ${email}`, timeout: 15_000 },
    )
    .toBeTruthy();

  return code as string;
}

export function emailCount(email: string) {
  return entriesFor(email).length;
}
