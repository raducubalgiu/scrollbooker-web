"use client";

import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import EmployeesTab from "./EmployeesTab";
import EmploymentRequestsTab from "./EmploymentRequestsTab";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";

const TABS: CustomTabType[] = [
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

export default function MyEmployeesModule() {
  const [currentTab, setCurrentTab] = useState(0);

  const sections = useMemo(() => {
    switch (currentTab) {
      case 0:
        return <EmployeesTab isEnabled={currentTab === 0} />;
      case 1:
        return <EmploymentRequestsTab isEnabled={currentTab === 1} />;
      default:
        return null;
    }
  }, [currentTab]);

  return (
    <MainLayout hideAction title="Angajați">
      <Box>
        <CustomTabs
          currentTab={currentTab}
          setValue={setCurrentTab}
          tabs={TABS}
        />

        <Box sx={{ mt: 2.5 }}>{sections}</Box>
      </Box>
    </MainLayout>
  );
}
