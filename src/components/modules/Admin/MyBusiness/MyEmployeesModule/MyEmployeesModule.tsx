"use client";

import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import MyEmploymentRequestsTab from "./MyEmploymentRequestsTab";
import MyEmployeesTab from "./MyEmployeesTab";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

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

type MyEmployeesModuleProps = {
  initialData: PaginatedData<BusinessEmployee>;
  pageSize: number;
};

export default function MyEmployeesModule({
  initialData,
  pageSize,
}: MyEmployeesModuleProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const sections = useMemo(() => {
    switch (currentTab) {
      case 0:
        return (
          <MyEmployeesTab
            isEnabled={currentTab === 0}
            initialData={initialData}
            pageSize={pageSize}
          />
        );
      case 1:
        return <MyEmploymentRequestsTab isEnabled={currentTab === 1} />;
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
