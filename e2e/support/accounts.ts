import { randomUUID } from "node:crypto";
import { BACKEND_URL } from "./env";
import { markUserValidated } from "./db";

export const PASSWORD = "E2ePass123";
export const NEW_PASSWORD = "E2eNewPass456";

export type Account = {
  email: string;
  password: string;
};

export function uniqueEmail(label: string) {
  return `e2e_${label}_${randomUUID().slice(0, 8)}@example.com`;
}

export async function createAccount(
  label: string,
  { validated = true }: { validated?: boolean } = {},
): Promise<Account> {
  const email = uniqueEmail(label);

  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password: PASSWORD, role_name: "client" }),
  });
  if (!response.ok) {
    throw new Error(
      `register failed: ${response.status} ${await response.text()}`,
    );
  }

  const { access_token: accessToken } = (await response.json()) as {
    access_token: string;
  };
  await fetch(`${BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (validated) await markUserValidated(email);
  return { email, password: PASSWORD };
}
