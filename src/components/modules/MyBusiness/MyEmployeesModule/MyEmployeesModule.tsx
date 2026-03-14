"use client";

import React, { useState } from "react";
import { alpha, Box, Paper, Tab, Tabs } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import EmployeesTab from "./EmployeesTab";
import EmploymentRequestsTab from "./EmploymentRequestsTab";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export default function MyEmployeesModule() {
  const [value, setValue] = useState(0);

  const tabs = [
    {
      key: 0,
      label: "Angajati",
      icon: <PeopleAltOutlinedIcon color="inherit" />,
    },
    {
      key: 1,
      label: "Cereri de angajare",
      icon: <ScheduleSendOutlinedIcon color="inherit" />,
    },
  ];

  return (
    <MainLayout hideAction title="Angajați">
      <Box>
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
            value={value}
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
                icon={t.icon}
                sx={{
                  textTransform: "none",
                  px: 5,
                  py: 0.25,
                  minHeight: 50,
                  display: "inline-flex",
                  alignItems: "center",
                  mr: 0.75,
                  minWidth: "auto",
                  borderRadius: 50,
                  bgcolor: "background.paper",
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

        <Box sx={{ mt: 2.5 }}>
          {value === 0 && <EmployeesTab isEnabled={value === 0} />}
          {value === 1 && <EmploymentRequestsTab isEnabled={value === 1} />}
        </Box>
      </Box>
    </MainLayout>
  );
}
