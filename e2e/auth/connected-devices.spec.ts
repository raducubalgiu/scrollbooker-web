import { expect, test } from "@playwright/test";
import { createAccount } from "../support/accounts";
import { activeSessionsOf } from "../support/db";
import {
  expireAccessToken,
  openDevice,
  signInThroughApi,
  USER_AGENTS,
} from "../support/devices";

test("signing out another device from connected devices sends it to login", async ({
  browser,
}) => {
  const account = await createAccount("revoke_one");
  const laptop = await openDevice(browser, USER_AGENTS.macChrome);
  const phone = await openDevice(browser, USER_AGENTS.iphoneSafari);
  await signInThroughApi(laptop, account);
  await signInThroughApi(phone, account);

  await laptop.page.goto("/settings/account/connected-devices");
  await expect(laptop.page.getByText("Acest dispozitiv")).toBeVisible();

  const phoneRow = laptop.page
    .locator("div")
    .filter({ has: laptop.page.getByText("Safari (iOS)", { exact: true }) })
    .filter({
      has: laptop.page.getByRole("button", {
        name: "Deconectează",
        exact: true,
      }),
    })
    .last();
  await phoneRow
    .getByRole("button", { name: "Deconectează", exact: true })
    .click();
  await laptop.page
    .getByRole("dialog")
    .getByRole("button", { name: "Deconectează" })
    .click();

  await expect(
    laptop.page.getByText("Safari (iOS)", { exact: true }),
  ).toHaveCount(0);
  await expect(
    laptop.page.getByText("Nu ești conectat pe alte dispozitive."),
  ).toBeVisible();

  await expireAccessToken(phone.context);
  await phone.page.goto("/feed");
  await expect(phone.page).toHaveURL(/\/auth\/signin/);

  await expireAccessToken(laptop.context);
  await laptop.page.goto("/feed");
  await expect(laptop.page).toHaveURL(/\/feed/);
});

test("signing out all other devices keeps only the current one", async ({
  browser,
}) => {
  const account = await createAccount("revoke_others");
  const laptop = await openDevice(browser, USER_AGENTS.macChrome);
  const phone = await openDevice(browser, USER_AGENTS.iphoneSafari);
  const secondLaptop = await openDevice(browser, USER_AGENTS.macChrome);
  await Promise.all([
    signInThroughApi(laptop, account),
    signInThroughApi(phone, account),
    signInThroughApi(secondLaptop, account),
  ]);

  await laptop.page.goto("/settings/account/connected-devices");
  await laptop.page
    .getByRole("button", { name: "Deconectează toate celelalte dispozitive" })
    .click();
  await laptop.page
    .getByRole("dialog")
    .getByRole("button", { name: "Deconectează" })
    .click();

  await expect(
    laptop.page.getByText("Nu ești conectat pe alte dispozitive."),
  ).toBeVisible();
  expect(await activeSessionsOf(account.email)).toHaveLength(1);

  for (const device of [phone, secondLaptop]) {
    await expireAccessToken(device.context);
    await device.page.goto("/feed");
    await expect(device.page).toHaveURL(/\/auth\/signin/);
  }
});
