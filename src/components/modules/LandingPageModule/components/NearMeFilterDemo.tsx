"use client";

import { useState } from "react";
import { alpha, Box, Stack, Switch, Typography } from "@mui/material";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

export default function NearMeFilterDemo() {
  const t = useTranslations("nearMe.demo");
  const LANDING_COLORS = useLandingColors();
  const services = t.raw("services") as string[];
  const [selected, setSelected] = useState<number[]>([0, 2]);
  const [isNearMe, setIsNearMe] = useState(true);

  const toggleService = (index: number) => {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index].sort((a, b) => a - b),
    );
  };

  const selectedLabels = selected.map((i) => services[i]).join(", ");
  const resultLabel = selected.length
    ? t("resultServices", { services: selectedLabels })
    : t("resultAll");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 380,
        mx: "auto",
        borderRadius: 4,
        border: `1px solid ${LANDING_COLORS.border}`,
        backgroundColor: LANDING_COLORS.background,
        boxShadow: `0 40px 100px -40px ${alpha(LANDING_COLORS.primary, 0.45)}`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1.25 }}>
        <Box
          sx={{
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: LANDING_COLORS.border,
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TuneRoundedIcon
            fontSize="small"
            sx={{ color: LANDING_COLORS.textPrimary }}
          />
          <Typography
            sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
          >
            {t("title")}
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Typography
            variant="body2"
            sx={{ color: LANDING_COLORS.textSecondary, fontWeight: 600 }}
          >
            {t("servicesLabel")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {services.map((service, index) => {
              const isSelected = selected.includes(index);

              return (
                <Box
                  key={service}
                  component="button"
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleService(index)}
                  sx={{
                    cursor: "pointer",
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 50,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    border: `1px solid ${
                      isSelected
                        ? LANDING_COLORS.primary
                        : LANDING_COLORS.border
                    }`,
                    backgroundColor: isSelected
                      ? LANDING_COLORS.primary
                      : "transparent",
                    color: isSelected ? "#fff" : LANDING_COLORS.textPrimary,
                    transition: "background-color 0.15s, border-color 0.15s",
                  }}
                >
                  {service}
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            p: 1.5,
            borderRadius: 3,
            backgroundColor: LANDING_COLORS.surface,
            border: `1px solid ${
              isNearMe
                ? alpha(LANDING_COLORS.primary, 0.5)
                : LANDING_COLORS.border
            }`,
            transition: "border-color 0.15s",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: alpha(LANDING_COLORS.primary, 0.12),
              color: LANDING_COLORS.primary,
            }}
          >
            <NearMeRoundedIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
            >
              {t("nearMeLabel")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: LANDING_COLORS.textSecondary }}
            >
              {t("nearMeHint")}
            </Typography>
          </Box>
          <Switch
            checked={isNearMe}
            onChange={(event) => setIsNearMe(event.target.checked)}
            slotProps={{ input: { "aria-label": t("nearMeLabel") } }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: LANDING_COLORS.primary,
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: LANDING_COLORS.primary,
              },
            }}
          />
        </Stack>

        <Box
          aria-live="polite"
          sx={{
            px: 1.5,
            py: 1.25,
            borderRadius: 2,
            backgroundColor: alpha(LANDING_COLORS.primary, 0.08),
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 600 }}
          >
            {resultLabel}
            {isNearMe && (
              <Box component="span" sx={{ color: LANDING_COLORS.primary }}>
                {" · "}
                {t("resultNearMe")}
              </Box>
            )}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
