import { expect, test } from "@playwright/test";
import { createAccount } from "../support/accounts";
import { openDevice, signInThroughApi } from "../support/devices";

test("an anonymous visitor is sent to sign-in with the original page as callback", async ({
  browser,
}) => {
  const { page } = await openDevice(browser);

  await page.goto("/feed");

  await expect(page).toHaveURL(/\/auth\/signin\?callbackUrl=%2Ffeed/);
});

test("public pages stay reachable without an account", async ({ browser }) => {
  const { page } = await openDevice(browser);

  const response = await page.goto("/for-business");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/for-business/);
});

test("an account that has not finished onboarding is held in onboarding", async ({
  browser,
}) => {
  const account = await createAccount("unvalidated", { validated: false });
  const device = await openDevice(browser);
  await signInThroughApi(device, account);

  await device.page.goto("/feed");

  await expect(device.page).toHaveURL(/\/onboarding/);
});

test("a validated account visiting sign-in is sent to the feed", async ({
  browser,
}) => {
  const account = await createAccount("validated");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);

  await device.page.goto("/auth/signin");

  await expect(device.page).toHaveURL(/\/feed/);
});
