"use client";

import { Stack, Switch, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useLandingTheme } from "../LandingThemeContext";

type LandingThemeToggleProps = {
  justifyContent?: "center" | "flex-start";
};

export default function LandingThemeToggle({
  justifyContent = "flex-start",
}: LandingThemeToggleProps) {
  const t = useTranslations("themeToggle");
  const { mode, colors, toggleMode } = useLandingTheme();

  return (
    <Stack
      component="label"
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent={justifyContent}
      sx={{ cursor: "pointer", width: "fit-content" }}
    >
      <Switch
        checked={mode === "dark"}
        onChange={toggleMode}
        size="small"
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: colors.primary,
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: colors.primary,
          },
        }}
      />
      <Typography variant="body2" sx={{ color: colors.textSecondary, fontWeight: 600 }}>
        {mode === "dark" ? t("switchToLight") : t("switchToDark")}
      </Typography>
    </Stack>
  );
}
