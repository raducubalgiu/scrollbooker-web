import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

const ExploreSidebar = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box
      sx={{
        ml: 6,
        flex: 1,
        minWidth: 320,
        maxWidth: 600,
        width: "100%",
        height: "100%",
        minHeight: 0,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Servicii"
          value={0}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
        <Tab
          label="Comentarii"
          value={2}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
        <Tab
          label="Recenzii"
          value={3}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
      </Tabs>
    </Box>
  );
};

export default ExploreSidebar;
