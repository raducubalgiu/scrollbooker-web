import { Button, Stack } from "@mui/material";
import React from "react";
import { BusinessServicesWithProducts } from "@/ts/models/booking/product/Product";

type ServiceCategoryTabsProps = {
  serviceGroups: BusinessServicesWithProducts[];
  activeServiceId: number;
  onSelect: (serviceId: number) => void;
};

const ServiceCategoryTabs = ({
  serviceGroups,
  activeServiceId,
  onSelect,
}: ServiceCategoryTabsProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {serviceGroups.map((group) => {
        const isActive = group.service.id === activeServiceId;

        return (
          <Button
            key={group.service.id}
            onClick={() => onSelect(group.service.id)}
            disableElevation
            disableRipple
            sx={{
              flexShrink: 0,
              height: 42,
              px: 1.5,
              borderRadius: 50,
              fontSize: { xs: 16, md: 18 },
              fontWeight: isActive ? 700 : 500,
              textTransform: "none",
              color: "text.primary",
              backgroundColor: isActive ? "secondary.main" : "transparent",
              "&:hover": {
                backgroundColor: isActive ? "secondary.main" : "action.hover",
              },
            }}
          >
            {group.service.short_name}
          </Button>
        );
      })}
    </Stack>
  );
};

export default ServiceCategoryTabs;
