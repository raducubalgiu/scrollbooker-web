import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getTranslations } from "next-intl/server";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";
import LandingLogo from "@/components/modules/LandingPageModule/components/LandingLogo";

type Step = { title: string; description: string };

export default async function GetStartedModule() {
  const t = await getTranslations("getStarted");
  const steps = t.raw("steps") as Step[];

  return (
    <Box
      sx={{
        backgroundColor: LANDING_COLORS.background,
        minHeight: "100dvh",
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack
          component={Link}
          href={AppRoutes.home()}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            color: LANDING_COLORS.textSecondary,
            textDecoration: "none",
            mb: 5,
            width: "fit-content",
            "&:hover": { color: LANDING_COLORS.textPrimary },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {t("back")}
          </Typography>
        </Stack>

        <Box sx={{ mb: 5 }}>
          <LandingLogo height={24} color={LANDING_COLORS.textPrimary} />
        </Box>

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
        <Typography
          variant="h2"
          sx={{ color: LANDING_COLORS.textPrimary, mt: 1, mb: 1.5 }}
        >
          {t("title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: LANDING_COLORS.textSecondary, mb: 6, lineHeight: 1.7 }}
        >
          {t("subtitle")}
        </Typography>

        <Stack spacing={4} sx={{ mb: 5 }}>
          {steps.map((step, index) => (
            <Stack key={step.title} direction="row" spacing={2.5}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `1px solid ${LANDING_COLORS.primary}`,
                  color: LANDING_COLORS.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </Box>
              <Box>
                <Typography
                  sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 600 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.6 }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: `1px solid ${LANDING_COLORS.border}`,
            backgroundColor: LANDING_COLORS.surface,
            mb: 5,
          }}
        >
          <InfoOutlinedIcon
            fontSize="small"
            sx={{ color: LANDING_COLORS.textSecondary, mt: 0.2, flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.6 }}
          >
            {t("approvalNote")}
          </Typography>
        </Stack>

        <Button
          component={Link}
          href={AppRoutes.registerBusiness()}
          variant="contained"
          fullWidth
          disableElevation
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            backgroundColor: LANDING_COLORS.primary,
            "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
            py: 1.5,
          }}
        >
          {t("cta")}
        </Button>
      </Container>
    </Box>
  );
}
