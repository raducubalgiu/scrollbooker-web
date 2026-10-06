"use client";

import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React, { memo, useCallback } from "react";

const THEME_OPTIONS: Record<
  ThemeModeEnum,
  { label: string; description?: string }
> = {
  [ThemeModeEnum.LIGHT]: { label: "Light" },
  [ThemeModeEnum.DARK]: { label: "Dark" },
  [ThemeModeEnum.SYSTEM]: {
    label: "System",
    description: "Se potrivește cu setarea dispozitivului",
  },
};

const DisplayModule = () => {
  const { mode, setMode } = useThemeMode();

  const handleChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setMode(value as ThemeModeEnum);
    },
    [setMode]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Afișare" />

      <RadioGroup
        aria-label="Alege tema aplicației"
        name="theme-mode"
        value={mode}
        onChange={handleChange}
        sx={{ px: 2.5 }}
      >
        {ThemeModeEnum.all.map((option) => {
          const { label, description } = THEME_OPTIONS[option];

          return (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio sx={styles.radio} />}
              labelPlacement="start"
              sx={styles.item}
              label={
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {label}
                  </Typography>
                  {description && (
                    <Typography variant="caption" color="text.secondary">
                      {description}
                    </Typography>
                  )}
                </Box>
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default memo(DisplayModule);

const styles = {
  item: {
    width: "100%",
    justifyContent: "space-between",
    m: 0,
    py: 1.5,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  radio: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
