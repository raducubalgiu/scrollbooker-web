"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useTranslations } from "next-intl";

type FaqItem = { question: string; answer: string };

type LandingFaqProps = {
  namespace?: string;
};

export default function LandingFaq({ namespace = "faq" }: LandingFaqProps) {
  const t = useTranslations(namespace);
  const { palette } = useTheme();
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
              color: palette.primary.main,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: palette.text.primary }}>
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
                border: `1px solid ${palette.divider}`,
                backgroundColor: palette.surface.main,
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreRoundedIcon
                    sx={{ color: palette.text.secondary }}
                  />
                }
                sx={{ px: 2.5, py: 0.5 }}
              >
                <Typography
                  sx={{ color: palette.text.primary, fontWeight: 600 }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: palette.text.secondary, lineHeight: 1.7 }}
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
