"use client";

import React, { useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const { data: myBusinessDetails, isLoading } = useGetMyBusinessDetails();
  const [currentTab, setCurrentTab] = useState(0);

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
          />
        );
      case 2:
        return (
          <BusinessGalleryTab
            businessId={id}
            mediaFiles={myBusinessDetails.media_files}
          />
        );
      case 3:
        return <SchedulesForm initialSchedules={schedules} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout
      hideAction
      title="Detalii Business"
      sx={{
        bgcolor:
          theme.palette.mode === "dark"
            ? "background.default"
            : "background.paper",
        minHeight: "100%",
      }}
    >
      <CustomTabs
        currentTab={currentTab}
        setValue={setCurrentTab}
        tabs={TABS}
      />
      <Box mt={2.5}>{renderTabContent()}</Box>
    </MainLayout>
  );
}
