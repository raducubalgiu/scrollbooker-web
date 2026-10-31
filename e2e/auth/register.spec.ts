import { expect, test } from "@playwright/test";
import { PASSWORD, uniqueEmail } from "../support/accounts";
import { activeSessionsOf } from "../support/db";
import { openDevice, openForm } from "../support/devices";
import { waitForEmailCode } from "../support/outbox";

test("register signs in, verifies the email and leaves a single session", async ({
  browser,
}) => {
  const email = uniqueEmail("register");
  const { page } = await openDevice(browser);

  await openForm(page, "/auth/register");
  await page.locator('input[name="identifier"]').fill(email);
  await page.locator('input[name="password"]').fill(PASSWORD);
  await page.getByRole("button", { name: "Creează cont" }).click();

  await expect(page).toHaveURL(/\/onboarding/);
  await expect(page.getByText("Verifică emailul")).toBeVisible();

  const code = await waitForEmailCode(email);
  await page.getByPlaceholder("Introdu codul").fill(code);
  await page.getByRole("button", { name: "Verifică", exact: true }).click();

  await expect(page.getByText("Nume de utilizator")).toBeVisible();

  const sessions = await activeSessionsOf(email);
  expect(sessions).toHaveLength(1);
  expect(sessions[0]).toMatchObject({
    platform: "web",
    device_name: "Chrome (macOS)",
  });
});
