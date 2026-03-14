"use client";

import React, { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import { alpha } from "@mui/system";
import MySchedulesModule from "../MySchedulesModule/MySchedulesModule";
import { ScheduleResponseType } from "@/ts/models/booking/schedule/ScheduleType";

type LocationTabsClientProps = {
  schedules: ScheduleResponseType[];
};

export default function LocationTabsClient({
  schedules,
}: LocationTabsClientProps) {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          display: "inline-block",
          bgcolor: "transparent",
          p: 0.25,
          borderRadius: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={(_, v) => setValue(v)}
          variant="standard"
          TabIndicatorProps={{ sx: { display: "none" } }}
          sx={{ display: "flex" }}
        >
          {[
            { key: 0, label: "Sumar" },
            { key: 1, label: "Descriere" },
            { key: 2, label: "Galerie foto" },
            { key: 3, label: "Program" },
          ].map((t) => (
            <Tab
              key={t.key}
              label={t.label}
              sx={{
                textTransform: "none",
                px: 3,
                py: 1,
                mr: 0.5,
                borderRadius: 50,
                bgcolor: "background.paper",
                color: "text.secondary",
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

      <Paper sx={{ mt: 3, p: 5 }}>
        {value === 0 && <Typography>Conținut: Detalii</Typography>}
        {value === 1 && <Typography>Conținut: Descriere</Typography>}
        {value === 2 && <Typography>Conținut: Galerie foto</Typography>}
        {value === 3 && <MySchedulesModule data={schedules} />}
      </Paper>
    </Box>
  );
}
