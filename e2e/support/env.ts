import fs from "node:fs";
import path from "node:path";

export const WEB_URL = "http://localhost:3001";
export const BACKEND_URL = "http://localhost:8001";
export const E2E_DATABASE_URL =
  process.env.E2E_DATABASE_URL ??
  "postgresql://radu:password@127.0.0.1:5432/scroll_booker_e2e";
export const OUTBOX_PATH = path.resolve(
  process.cwd(),
  "e2e/.outbox/emails.jsonl",
);

export function nextAuthSecret(): string {
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET;

  const envFile = fs.readFileSync(
    path.resolve(process.cwd(), ".env.local"),
    "utf8",
  );
  const match = envFile.match(/^NEXTAUTH_SECRET="?([^"\n]+)"?/m);
  if (!match?.[1])
    throw new Error("NEXTAUTH_SECRET is missing from .env.local");
  return match[1];
}
