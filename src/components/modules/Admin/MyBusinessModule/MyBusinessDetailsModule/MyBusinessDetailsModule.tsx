"use client";

import React, { useState } from "react";
import { Box, CircularProgress, Paper, useTheme } from "@mui/material";
import MySchedulesModule from "../MySchedulesModule/MySchedulesModule";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import BusinessGalleryTab from "./BusinessGalleryTab";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useGetMyBusinessDetails } from "@/controllers/booking/business.controller";
import MyBusinessSummaryTab from "./MyBusinessSummaryTab";
import MyBusinessDescriptionTab from "./MyBusinessDescriptionTab";

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

  const { id, schedules } = myBusinessDetails || {};

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <MyBusinessSummaryTab businessDetails={myBusinessDetails} />;
      case 1:
        return (
          <MyBusinessDescriptionTab businessId={id} defaultDescription={""} />
        );
      case 2:
        return (
          <BusinessGalleryTab
            businessId={id}
            mediaFiles={myBusinessDetails.media_files}
          />
        );
      case 3:
        return <MySchedulesModule data={schedules} />;
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
      <Paper sx={{ mt: 3, p: 3 }}>{renderTabContent()}</Paper>
    </MainLayout>
  );
}
