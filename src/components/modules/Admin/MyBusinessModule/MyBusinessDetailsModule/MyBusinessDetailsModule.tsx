"use client";

import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import BusinessGalleryTab from "./BusinessGalleryTab";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useGetMyBusinessDetails } from "@/controllers/booking/business.controller";
import MyBusinessSummaryTab from "./MyBusinessSummaryTab";
import MyBusinessDescriptionTab from "./MyBusinessDescriptionTab";
import { SchedulesForm } from "../MySchedulesModule/SchedulesForm";

const TABS: CustomTabType[] = [
  { key: 0, label: "Sumar" },
  { key: 1, label: "Descriere" },
  { key: 2, label: "Galerie foto" },
  { key: 3, label: "Program" },
];

export default function MyBusinessDetailsModule() {
  const { data: myBusinessDetails, isLoading } = useGetMyBusinessDetails();
  const [currentTab, setCurrentTab] = useState(0);
  const [footer, setFooter] = useState<React.ReactNode>(null);

  if (isLoading || !myBusinessDetails) {
    return (
      <MainLayout hideAction title="Detalii Business">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  const { id, schedules, description } = myBusinessDetails || {};

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <MyBusinessSummaryTab businessDetails={myBusinessDetails} />;
      case 1:
        return (
          <MyBusinessDescriptionTab
            businessId={id}
            defaultDescription={description}
            onFooterChange={setFooter}
          />
        );
      case 2:
        return (
          <BusinessGalleryTab
            businessId={id}
            mediaFiles={myBusinessDetails.media_files}
            onFooterChange={setFooter}
          />
        );
      case 3:
        return (
          <SchedulesForm
            initialSchedules={schedules}
            onFooterChange={setFooter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout
      hideAction
      title="Detalii Business"
      footer={currentTab === 0 ? null : footer}
    >
      <CustomTabs
        currentTab={currentTab}
        setValue={setCurrentTab}
        tabs={TABS}
      />
      <Box mt={1.5}>{renderTabContent()}</Box>
    </MainLayout>
  );
}
