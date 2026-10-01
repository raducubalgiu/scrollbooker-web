import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid2 as Grid,
  Alert,
  Avatar,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useTranslations } from "next-intl";

const CollectBusinessValidationStep = () => {
  const t = useTranslations("onboarding.validation");

  const nextSteps = [
    {
      icon: <PersonAddOutlinedIcon color="primary" />,
      title: t("steps.employeeAccount.title"),
      description: t("steps.employeeAccount.description"),
    },
    {
      icon: <MailOutlineIcon color="primary" />,
      title: t("steps.invitation.title"),
      description: t("steps.invitation.description"),
    },
    {
      icon: <EventAvailableIcon color="primary" />,
      title: t("steps.calendarActivation.title"),
      description: t("steps.calendarActivation.description"),
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        "&::-webkit-scrollbar": { width: "5px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "divider",
          borderRadius: "10px",
        },
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Stack alignItems="center" spacing={2} mb={6}>
          <CheckCircleOutlineIcon sx={{ fontSize: 70, color: "success.main" }} />
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {t("title")}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
            {t("subtitle")}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ color: "text.secondary" }}
          >
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{t("responseTime")}</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 6 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t("nextTitle")}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {t("nextSubtitle")}
          </Typography>

          <Grid container spacing={3}>
            {nextSteps.map((step, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    borderColor: "divider",
                    bgcolor: "background.default",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      color: "primary.main",
                      mb: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mt: 6,
            borderRadius: 3,
            textAlign: "left",
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {t("helpTitle")}
          </Typography>
          <Typography variant="body2">{t("helpSubtitle")}</Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default CollectBusinessValidationStep;
