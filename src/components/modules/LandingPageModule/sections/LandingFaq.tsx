"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

type FaqItem = { question: string; answer: string };

type LandingFaqProps = {
  namespace?: string;
};

export default function LandingFaq({ namespace = "faq" }: LandingFaqProps) {
  const t = useTranslations(namespace);
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as FaqItem[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Box component="section" id="faq" sx={{ py: { xs: 8, md: 12 } }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container maxWidth="md">
        <Stack spacing={1.5} sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              color: LANDING_COLORS.primary,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            {t("title")}
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          {items.map((item) => (
            <Accordion
              key={item.question}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: "12px !important",
                border: `1px solid ${LANDING_COLORS.border}`,
                backgroundColor: LANDING_COLORS.surface,
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreRoundedIcon
                    sx={{ color: LANDING_COLORS.textSecondary }}
                  />
                }
                sx={{ px: 2.5, py: 0.5 }}
              >
                <Typography
                  sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 600 }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
