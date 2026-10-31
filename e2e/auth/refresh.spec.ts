import { expect, test } from "@playwright/test";
import { createAccount } from "../support/accounts";
import { activeSessionsOf, sessionsOf } from "../support/db";
import {
  expireAccessToken,
  openDevice,
  readSessionToken,
  signInThroughApi,
} from "../support/devices";

test("an expired access token is refreshed on navigation and the cookie keeps the rotated token", async ({
  browser,
}) => {
  const account = await createAccount("refresh");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);
  const before = await readSessionToken(device.context);

  await expireAccessToken(device.context);
  await device.page.goto("/settings/account/connected-devices");

  await expect(device.page.getByText("Acest dispozitiv")).toBeVisible();
  const after = await readSessionToken(device.context);
  expect(after?.refreshToken).not.toBe(before?.refreshToken);
  expect(after?.accessTokenExpires).toBeGreaterThan(Date.now());

  await expireAccessToken(device.context);
  await device.page.goto("/feed");
  await expect(device.page).toHaveURL(/\/feed/);

  const sessions = await activeSessionsOf(account.email);
  expect(sessions).toHaveLength(1);
  expect(sessions[0]?.rotated).toBe(true);
});

test("parallel requests with an expired token do not trigger reuse detection", async ({
  browser,
}) => {
  const account = await createAccount("parallel_refresh");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);

  await expireAccessToken(device.context);
  const responses = await Promise.all(
    Array.from({ length: 6 }, () =>
      device.context.request.get("/api/protected/auth/user-info"),
    ),
  );
  expect(responses.map((response) => response.status())).toEqual(
    Array(6).fill(200),
  );

  await device.page.goto("/feed");
  await expect(device.page).toHaveURL(/\/feed/);

  const webSessions = (await sessionsOf(account.email)).filter(
    (session) => session.platform === "web",
  );
  expect(webSessions).toHaveLength(1);
  expect(webSessions[0]).toMatchObject({ active: true, revoked_reason: null });
});
