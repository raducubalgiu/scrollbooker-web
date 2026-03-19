import Modal from "@/components/core/Modal/Modal";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

const UItem = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5 }}
    >
      <Stack flexDirection="row" alignItems="center">
        <Avatar sx={{ width: 60, height: 60 }} />
        <Box sx={{ ml: 1.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Raducu Balgiu
          </Typography>
          <Typography color="text.secondary">@radu_balgiu</Typography>
        </Box>
      </Stack>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {}}
        size="large"
        disableElevation
      >
        Urmaresti
      </Button>
    </Stack>
  );
};

type ProfileSocialModalProps = {
  open: boolean;
  handleClose: () => void;
};

const ProfileSocialModal = ({ open, handleClose }: ProfileSocialModalProps) => {
  const tabs = useMemo(
    () => [
      {
        route: "ratings",
        label: "Recenzii",
      },
      {
        route: "followers",
        label: "Urmaritori",
      },
      {
        route: "followings",
        label: "Urmaresti",
      },
    ],
    []
  );

  const [currentTab, setCurrentTab] = useState(tabs[0]?.route);

  const styles = {
    container: {
      width: "100%",
      bgcolor: "transparent",
      borderBottom: 1,
      borderColor: "divider",
    },
    tabs: {
      "& .MuiTabs-indicator": {
        height: 3,
        borderRadius: 2,
      },
      "& .MuiTab-root": {
        textTransform: "none",
        minHeight: 56,
      },
    },
    label: { fontSize: 20, fontWeight: 600 },
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      actions={[]}
      dividers={false}
      maxWidth="xl"
    >
      <Box sx={styles.container}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={styles.tabs}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.route}
              value={tab.route}
              label={<Typography sx={styles.label}>{tab.label}</Typography>}
              sx={{ minWidth: 200 }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mx: 1 }}>
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
        <UItem />
      </Box>
    </Modal>
  );
};

export default ProfileSocialModal;
