import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

type MyProductsTabsProps = {
  currentTab: number;
  onTabChange: (_event: React.MouseEvent<HTMLElement>, newTab: number) => void;
};

const MyProductsTabs = ({ currentTab, onTabChange }: MyProductsTabsProps) => {
  return (
    <ToggleButtonGroup
      value={currentTab}
      exclusive
      onChange={onTabChange}
      aria-label="current tab"
    >
      <ToggleButton value={0} aria-label="table">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value={1} aria-label="list">
        <TableRowsIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default MyProductsTabs;
