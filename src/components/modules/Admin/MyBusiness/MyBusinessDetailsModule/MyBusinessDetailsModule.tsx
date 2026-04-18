"use client";

import React, { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MySchedulesModule from "../MySchedulesModule/MySchedulesModule";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import { Business } from "@/ts/models/booking/business/Business";
import BusinessDescriptionTab from "./BusinessDescriptionTab";
import BusinessAddressTab from "./BusinessAddressTab";
import BusinessGalleryTab from "./BusinessGalleryTab";

type MyBusinessDetailsProps = {
  business: Business;
};

const TABS: CustomTabType[] = [
  { key: 0, label: "Sumar" },
  { key: 1, label: "Descriere" },
  { key: 2, label: "Galerie foto" },
  { key: 3, label: "Program" },
];

export default function MyBusinessDetailsModule({
  business,
}: MyBusinessDetailsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const sections = useMemo(() => {
    switch (currentTab) {
      case 0:
        return (
          <BusinessAddressTab
            address={business.formatted_address}
            map_url={business.map_url}
            has_employees={business.has_employees}
          />
        );
      case 1:
        return (
          <BusinessDescriptionTab
            businessId={business.id}
            defaultDescription={business.description}
          />
        );
      case 2:
        return (
          <BusinessGalleryTab businessId={business.id} initialImages={[]} />
        );
      case 3:
        return (
          <>
            <Typography variant="h6" sx={{ mb: 2.5 }}>
              Programul locației
            </Typography>
            <MySchedulesModule data={business.schedules} />
          </>
        );
      default:
        return null;
    }
  }, [currentTab, business]);

  return (
    <Box>
      <CustomTabs
        currentTab={currentTab}
        setValue={setCurrentTab}
        tabs={TABS}
      />
      <Paper sx={{ mt: 3, p: 2.5 }}>{sections}</Paper>
    </Box>
  );
}
