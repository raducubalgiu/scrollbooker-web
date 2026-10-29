import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getTranslations } from "next-intl/server";
import { AppRoutes } from "@/utils/routes";
import AuthLayout from "@/components/modules/AuthModule/AuthLayout";
import AuthHeading from "@/components/modules/AuthModule/AuthHeading";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";

type Step = { title: string; description: string };

export default async function GetStartedModule() {
  const t = await getTranslations("getStarted");
  const steps = t.raw("steps") as Step[];

  return (
    <AuthLayout>
      <Stack
        component={Link}
        href={AppRoutes.home()}
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          color: "text.secondary",
          textDecoration: "none",
          mb: 4,
          width: "fit-content",
          "&:hover": { color: "text.primary" },
        }}
      >
        <ArrowBackRoundedIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t("back")}
        </Typography>
      </Stack>

      <AuthHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <Stack spacing={3.5} sx={{ mb: 5 }}>
        {steps.map((step, index) => (
          <Stack key={step.title} direction="row" spacing={2.5}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: 1,
                borderColor: "primary.main",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {index + 1}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{step.title}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
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
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          mb: 5,
        }}
      >
        <InfoOutlinedIcon
          fontSize="small"
          sx={{ color: "text.secondary", mt: 0.2, flexShrink: 0 }}
        />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
        >
          {t("approvalNote")}
        </Typography>
      </Stack>

      <AuthGradientButton
        href={AppRoutes.registerBusiness()}
        endIcon={<ArrowForwardRoundedIcon />}
      >
        {t("cta")}
      </AuthGradientButton>
    </AuthLayout>
  );
}
