"use client";

import React, { useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import MySchedulesModule from "../MySchedulesModule/MySchedulesModule";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import BusinessDescriptionTab from "./BusinessDescriptionTab";
import BusinessAddressTab from "./BusinessAddressTab";
import BusinessGalleryTab from "./BusinessGalleryTab";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useGetMyBusinessDetails } from "@/controllers/booking/business/business.controller";

const TABS: CustomTabType[] = [
  { key: 0, label: "Sumar" },
  { key: 1, label: "Descriere" },
  { key: 2, label: "Galerie foto" },
  { key: 3, label: "Program" },
];

export default function MyBusinessDetailsModule() {
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

  const { id, location, has_employees, schedules } = myBusinessDetails || {};

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <BusinessAddressTab
            address={location?.formatted_address ?? ""}
            map_url={location?.map_url ?? ""}
            has_employees={has_employees ?? false}
          />
        );
      case 1:
        return (
          <BusinessDescriptionTab businessId={id} defaultDescription={""} />
        );
      case 2:
        return <BusinessGalleryTab businessId={id} initialImages={[]} />;
      case 3:
        return <MySchedulesModule data={schedules} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout hideAction title="Detalii Business">
      <CustomTabs
        currentTab={currentTab}
        setValue={setCurrentTab}
        tabs={TABS}
      />
      <Paper sx={{ mt: 3, p: 3 }}>{renderTabContent()}</Paper>
    </MainLayout>
  );
}
