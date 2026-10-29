"use client";

import { Box, Link, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import LegalPageLayout from "./LegalPageLayout";
import LegalSection from "./LegalSection";
import LegalTable from "./LegalTable";

type CookieRow = {
  name: string;
  purpose: string;
  duration: string;
  category: string;
};

type StorageRow = {
  name: string;
  purpose: string;
  duration: string;
};

type ThirdPartyItem = {
  name: string;
  description: string;
};

const CookiesPolicyModule = () => {
  const t = useTranslations("cookiesPolicy");

  const cookieRows = t.raw("sections.ourCookies.items") as CookieRow[];
  const storageRows = t.raw("sections.storage.items") as StorageRow[];
  const thirdParties = t.raw("sections.thirdParties.items") as ThirdPartyItem[];

  return (
    <LegalPageLayout
      title={t("title")}
      lastUpdated={t("lastUpdated", { date: t("date") })}
    >
      <Typography sx={styles.intro}>{t("intro")}</Typography>

      <LegalSection
        title={t("sections.whatAre.title")}
        paragraphs={t.raw("sections.whatAre.body") as string[]}
      />

      <LegalSection
        title={t("sections.ourCookies.title")}
        paragraphs={[t("sections.ourCookies.intro")]}
      >
        <LegalTable
          codeColumn="name"
          columns={[
            { key: "name", label: t("sections.ourCookies.columns.name") },
            { key: "purpose", label: t("sections.ourCookies.columns.purpose") },
            {
              key: "duration",
              label: t("sections.ourCookies.columns.duration"),
            },
            {
              key: "category",
              label: t("sections.ourCookies.columns.category"),
            },
          ]}
          rows={cookieRows}
        />
        <Typography variant="body2" sx={styles.note}>
          {t("sections.ourCookies.note")}
        </Typography>
      </LegalSection>

      <LegalSection title={t("sections.storage.title")}>
        <LegalTable
          codeColumn="name"
          columns={[
            { key: "name", label: t("sections.storage.columns.name") },
            { key: "purpose", label: t("sections.storage.columns.purpose") },
            { key: "duration", label: t("sections.storage.columns.duration") },
          ]}
          rows={storageRows}
        />
      </LegalSection>

      <LegalSection title={t("sections.thirdParties.title")}>
        <Stack spacing={2}>
          {thirdParties.map((item) => (
            <Box key={item.name}>
              <Typography sx={styles.itemTitle}>{item.name}</Typography>
              <Typography sx={styles.itemBody}>{item.description}</Typography>
            </Box>
          ))}
        </Stack>
      </LegalSection>

      <LegalSection
        title={t("sections.consent.title")}
        paragraphs={t.raw("sections.consent.body") as string[]}
      />

      <LegalSection
        title={t("sections.manage.title")}
        paragraphs={t.raw("sections.manage.body") as string[]}
      />

      <LegalSection
        title={t("sections.changes.title")}
        paragraphs={t.raw("sections.changes.body") as string[]}
      />

      <LegalSection title={t("sections.contact.title")}>
        <Typography sx={styles.itemBody}>
          {t.rich("sections.contact.body", {
            email: (chunks) => (
              <Link href={`mailto:${chunks}`} underline="hover">
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default CookiesPolicyModule;

const styles = {
  intro: {
    fontSize: "1.1rem",
    lineHeight: 1.75,
    mb: { xs: 5, md: 6 },
  },
  note: {
    color: "text.secondary",
    lineHeight: 1.6,
  },
  itemTitle: {
    fontWeight: 700,
    mb: 0.5,
  },
  itemBody: {
    color: "text.secondary",
    lineHeight: 1.75,
  },
};
