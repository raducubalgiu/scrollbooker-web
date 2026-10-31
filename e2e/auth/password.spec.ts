import { expect, test } from "@playwright/test";
import { createAccount, NEW_PASSWORD } from "../support/accounts";
import { activeSessionsOf } from "../support/db";
import {
  expireAccessToken,
  openDevice,
  openForm,
  signInThroughApi,
  USER_AGENTS,
} from "../support/devices";
import { emailCount, waitForEmailCode } from "../support/outbox";

test("changing the password keeps only the device that changed it", async ({
  browser,
}) => {
  const account = await createAccount("change_password");
  const laptop = await openDevice(browser, USER_AGENTS.macChrome);
  const phone = await openDevice(browser, USER_AGENTS.iphoneSafari);
  await signInThroughApi(laptop, account);
  await signInThroughApi(phone, account);

  await openForm(laptop.page, "/settings/account/password");
  await laptop.page
    .locator('input[name="currentPassword"]')
    .fill(account.password);
  await laptop.page.locator('input[name="newPassword"]').fill(NEW_PASSWORD);
  await laptop.page.locator('input[name="confirmPassword"]').fill(NEW_PASSWORD);
  await laptop.page.getByRole("button", { name: "Schimbă parola" }).click();

  await expect
    .poll(async () => (await activeSessionsOf(account.email)).length)
    .toBe(1);

  await expireAccessToken(phone.context);
  await phone.page.goto("/feed");
  await expect(phone.page).toHaveURL(/\/auth\/signin/);

  await expireAccessToken(laptop.context);
  await laptop.page.goto("/feed");
  await expect(laptop.page).toHaveURL(/\/feed/);
});

test("resetting the password signs out every device", async ({ browser }) => {
  const account = await createAccount("reset_password");
  const laptop = await openDevice(browser, USER_AGENTS.macChrome);
  const phone = await openDevice(browser, USER_AGENTS.iphoneSafari);
  await signInThroughApi(laptop, account);
  await signInThroughApi(phone, account);

  const { page } = await openDevice(browser);
  await openForm(page, "/auth/forgot-password");
  await page.locator('input[name="email"]').fill(account.email);
  const emailsBefore = emailCount(account.email);
  await page.getByRole("button", { name: "Trimite codul" }).click();

  const code = await waitForEmailCode(account.email, emailsBefore);
  await expect(page).toHaveURL(/\/auth\/reset-password/);
  await page.locator('input[name="code"]').fill(code);
  await page.locator('input[name="newPassword"]').fill(NEW_PASSWORD);
  await page.locator('input[name="confirmPassword"]').fill(NEW_PASSWORD);
  await page.getByRole("button", { name: "Resetează parola" }).click();

  await expect
    .poll(async () => (await activeSessionsOf(account.email)).length)
    .toBe(0);

  for (const device of [laptop, phone]) {
    await expireAccessToken(device.context);
    await device.page.goto("/feed");
    await expect(device.page).toHaveURL(/\/auth\/signin/);
  }
});
