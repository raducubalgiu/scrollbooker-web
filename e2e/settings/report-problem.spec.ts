import { expect, test } from "@playwright/test";
import { Client } from "pg";
import { createAccount } from "../support/accounts";
import { openDevice, openForm, signInThroughApi } from "../support/devices";
import { E2E_DATABASE_URL } from "../support/env";

const REPORT_TEXT =
  "Când apăs pe „Rezervă”, pagina rămâne albă și nu se întâmplă nimic.";

function pngFile(name: string) {
  return {
    name,
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64",
    ),
  };
}

async function storedProblems(email: string) {
  const client = new Client({ connectionString: E2E_DATABASE_URL });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT p.text, p.platform, p.device_name
         FROM problems p JOIN users u ON u.id = p.user_id
        WHERE u.email = $1`,
      [email],
    );
    return result.rows as {
      text: string;
      platform: string;
      device_name: string | null;
    }[];
  } finally {
    await client.end();
  }
}

test("a text-only problem report is stored with the web device context", async ({
  browser,
}) => {
  const account = await createAccount("report_problem");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);
  const { page } = device;

  await openForm(page, "/settings/report-a-problem");
  const submit = page.getByRole("button", { name: "Trimite raportul" });

  await page.getByLabel("Descrierea problemei").fill("Prea scurt");
  await expect(submit).toBeDisabled();

  await page.getByLabel("Descrierea problemei").fill(REPORT_TEXT);
  await submit.click();

  await expect(
    page.getByText("Mulțumim! Am primit raportul tău."),
  ).toBeVisible();
  expect(await storedProblems(account.email)).toEqual([
    { text: REPORT_TEXT, platform: "web", device_name: "Chrome (macOS)" },
  ]);
});

test("the photo picker keeps at most three screenshots and can remove them", async ({
  browser,
}) => {
  const account = await createAccount("report_problem_photos");
  const device = await openDevice(browser);
  await signInThroughApi(device, account);
  const { page } = device;

  await openForm(page, "/settings/report-a-problem");
  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles([
    pngFile("1.png"),
    pngFile("2.png"),
    pngFile("3.png"),
    pngFile("4.png"),
  ]);

  await expect(page.getByRole("img", { name: /Captura/ })).toHaveCount(3);
  await expect(
    page.getByText("Poți atașa maximum 3 fotografii."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Adaugă o captură de ecran" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Elimină captura 2" }).click();

  await expect(page.getByRole("img", { name: /Captura/ })).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Adaugă o captură de ecran" }),
  ).toBeVisible();

  await fileInput.setInputFiles([
    {
      name: "notes.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF"),
    },
  ]);
  await expect(
    page.getByText(
      "Poți adăuga doar imagini JPG, PNG, WebP sau AVIF de maximum 8 MB.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: /Captura/ })).toHaveCount(2);
});
