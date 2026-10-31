import { expect, test } from "@playwright/test";
import { createAccount } from "../support/accounts";
import { activeSessionsOf, sessionsOf } from "../support/db";
import { openDevice, openForm, signInThroughApi } from "../support/devices";
import { WEB_URL } from "../support/env";

test("login through the form opens the feed and records a web session", async ({
  browser,
}) => {
  const account = await createAccount("login");
  const { page } = await openDevice(browser);

  await openForm(page, "/auth/signin");
  await page.locator('input[name="identifier"]').fill(account.email);
  await page.locator('input[name="password"]').fill(account.password);
  await page.getByRole("button", { name: "Conectare", exact: true }).click();

  await expect(page).toHaveURL(/\/feed/);
  const sessions = await activeSessionsOf(account.email);
  expect(sessions).toHaveLength(1);
  expect(sessions[0]).toMatchObject({
    platform: "web",
    device_name: "Chrome (macOS)",
  });
});

test("login with a wrong password stays on the sign-in page", async ({
  browser,
}) => {
  const account = await createAccount("wrong_password");
  const { page } = await openDevice(browser);

  await openForm(page, "/auth/signin");
  await page.locator('input[name="identifier"]').fill(account.email);
  await page.locator('input[name="password"]').fill("WrongPass999");
  await page.getByRole("button", { name: "Conectare", exact: true }).click();

  await expect(page).toHaveURL(/\/auth\/signin/);
  expect(await activeSessionsOf(account.email)).toHaveLength(0);
});

test("logout from the account menu revokes only this device's session", async ({
  browser,
}) => {
  const account = await createAccount("logout");
  const laptop = await openDevice(browser);
  const otherLaptop = await openDevice(browser);
  await signInThroughApi(laptop, account);
  await signInThroughApi(otherLaptop, account);

  await laptop.page.goto("/settings/account/info");
  await laptop.page.getByRole("button", { name: "Meniul contului" }).click();
  await laptop.page.getByRole("menuitem", { name: "Delogare" }).click();

  await expect(laptop.page).toHaveURL(`${WEB_URL}/`);
  await expect
    .poll(async () => (await activeSessionsOf(account.email)).length)
    .toBe(1);
  const revoked = (await sessionsOf(account.email)).filter(
    (session) => session.platform === "web" && !session.active,
  );
  expect(revoked.map((session) => session.revoked_reason)).toEqual(["logout"]);

  await otherLaptop.page.goto("/feed");
  await expect(otherLaptop.page).toHaveURL(/\/feed/);
});
