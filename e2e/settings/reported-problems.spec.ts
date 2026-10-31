import { expect, test } from "@playwright/test";
import { createAccount } from "../support/accounts";
import { grantSuperAdmin } from "../support/db";
import { openDevice, openForm, signInThroughApi } from "../support/devices";

const REPORT_TEXT =
  "Nu primesc notificări când cineva îmi rezervă o programare nouă.";
const ADMIN_REPLY =
  "Notificările erau oprite din setările telefonului. Le poți porni din Setări.";

test("a closed report shows the admin reply and notifies the reporter", async ({
  browser,
}) => {
  const reporterAccount = await createAccount("problem_reporter");
  const adminAccount = await createAccount("problem_admin");
  await grantSuperAdmin(adminAccount.email, "PROBLEMS_VIEW");

  const reporter = await openDevice(browser);
  const admin = await openDevice(browser);
  await signInThroughApi(reporter, reporterAccount);
  await signInThroughApi(admin, adminAccount);

  await openForm(reporter.page, "/settings/report-a-problem");
  await reporter.page.getByLabel("Descrierea problemei").fill(REPORT_TEXT);
  await reporter.page.getByRole("button", { name: "Trimite raportul" }).click();
  await expect(
    reporter.page.getByRole("heading", { name: "Rapoartele mele" }),
  ).toBeVisible();
  await expect(
    reporter.page.getByText("Primit", { exact: true }),
  ).toBeVisible();

  await admin.page.goto("/admin/my-business");
  await admin.page
    .getByRole("link", { name: /Probleme semnalate/ })
    .first()
    .click();
  await expect(admin.page).toHaveURL(/\/admin\/reported-problems/);

  const row = admin.page
    .getByRole("row")
    .filter({ hasText: REPORT_TEXT })
    .first();
  await row.getByRole("button", { name: "Status", exact: true }).click();

  const dialog = admin.page.getByRole("dialog");
  await dialog.getByLabel("Status").click();
  await admin.page.getByRole("option", { name: "Respins" }).click();
  await expect(dialog.getByRole("button", { name: "Salvează" })).toBeDisabled();

  await dialog.getByLabel("Mesaj pentru utilizator").fill(ADMIN_REPLY);
  await expect(dialog.getByText(/va primi o notificare/)).toBeVisible();
  await dialog.getByRole("button", { name: "Salvează" }).click();
  await expect(dialog).toHaveCount(0);

  await admin.page.getByRole("button", { name: "Respins" }).click();
  const closedRow = admin.page
    .getByRole("row")
    .filter({ hasText: REPORT_TEXT })
    .first();
  await expect(closedRow).toContainText("Respins");
  await closedRow.getByText(REPORT_TEXT).click();
  await expect(admin.page.getByText(ADMIN_REPLY)).toBeVisible();

  await reporter.page.reload();
  await expect(
    reporter.page.getByText("Închis", { exact: true }),
  ).toBeVisible();
  await expect(reporter.page.getByText(ADMIN_REPLY)).toBeVisible();

  await reporter.page.goto("/notifications");
  await expect(
    reporter.page.getByText(/Am închis problema raportată de tine/),
  ).toBeVisible();
});

test("the reported problems page is not available without PROBLEMS_VIEW", async ({
  browser,
}) => {
  const account = await createAccount("problem_no_permission");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);

  await device.page.goto("/admin/reported-problems");

  await expect(device.page).toHaveURL(/\/unauthorized/);
});
