import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

type MyProductsHeaderProps = {
  currentTab: number;
  onTabChange: (_event: React.MouseEvent<HTMLElement>, newTab: number) => void;
  onOpenAddModal: () => void;
};

const MyProductsHeader = ({
  currentTab,
  onTabChange,
  onOpenAddModal,
}: MyProductsHeaderProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={2.5}
    >
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

      <Button
        variant="contained"
        size="large"
        disableElevation
        onClick={onOpenAddModal}
      >
        Adauga un serviciu nou
      </Button>
    </Stack>
  );
};

export default MyProductsHeader;
