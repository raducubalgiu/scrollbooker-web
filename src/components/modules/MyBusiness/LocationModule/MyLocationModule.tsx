"use client";

import React, { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MySchedulesModule from "../MySchedulesModule/MySchedulesModule";
import { ScheduleResponseType } from "@/ts/models/booking/schedule/ScheduleType";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";

type LocationTabsClientProps = {
  schedules: ScheduleResponseType[];
};

const TABS: CustomTabType[] = [
  { key: 0, label: "Sumar" },
  { key: 1, label: "Descriere" },
  { key: 2, label: "Galerie foto" },
  { key: 3, label: "Program" },
];

export default function MyLocationModule({
  schedules,
}: LocationTabsClientProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const sections = useMemo(() => {
    switch (currentTab) {
      case 0:
        return <Typography>Conținut: Detalii</Typography>;
      case 1:
        return <Typography>Conținut: Descriere</Typography>;
      case 2:
        return <Typography>Conținut: Galerie foto</Typography>;
      case 3:
        return <MySchedulesModule data={schedules} />;
      default:
        return null;
    }
  }, [currentTab, schedules]);

  return (
    <Box>
      <CustomTabs
        currentTab={currentTab}
        setValue={setCurrentTab}
        tabs={TABS}
      />
      <Paper sx={{ mt: 3, p: 5 }}>{sections}</Paper>
    </Box>
  );
}
