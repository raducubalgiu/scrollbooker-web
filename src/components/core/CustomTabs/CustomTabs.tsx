import { alpha, Paper, Tab, Tabs } from "@mui/material";
import React from "react";

export type CustomTabType = {
  key: number;
  label: string;
  icon?: React.ReactNode;
};

export type CustomTabsProps = {
  currentTab: number;
  setValue: (value: number) => void;
  tabs: CustomTabType[];
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  currentTab,
  setValue,
  tabs,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-block",
        bgcolor: "transparent",
        p: 0.25,
        boxShadow: "none",
        borderRadius: 3,
      }}
    >
      <Tabs
        value={currentTab}
        onChange={(_, v) => setValue(v)}
        variant="standard"
        sx={{
          display: "flex",
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        {tabs.map((t) => (
          <Tab
            key={t.key}
            label={t.label}
            iconPosition="start"
            sx={{
              textTransform: "none",
              px: 2.5,
              py: 0.25,
              minHeight: 50,
              display: "inline-flex",
              alignItems: "center",
              mr: 0.75,
              minWidth: "auto",
              borderRadius: 50,
              bgcolor: "background.paper",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 6px 18px rgba(0,0,0,0.06)"
                  : "none",
              fontSize: 16,
              color: "text.secondary",
              "& .MuiTab-iconWrapper": {
                display: "inline-flex",
                alignItems: "center",
                mr: 1,
                "& svg": { width: 18, height: 18 },
              },
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "common.white",
                fontWeight: 700,
                boxShadow: "none",
              },
              "&:hover": { opacity: 0.92 },
              "&.Mui-focusVisible": {
                boxShadow: (theme) =>
                  `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
              },
            }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default CustomTabs;
