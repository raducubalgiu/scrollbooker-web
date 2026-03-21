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
import React, { useCallback, useMemo, useState, useEffect } from "react";
import SocialReviewsTab from "./SocialReviewsTab";
import SocialFollowersTab from "./SocialFollowersTab";
import SocialFollowingsTab from "./SocialFollowingsTab";
import { SocialTabEnum } from "./SocialTabEnum";
import { SocialModalProps } from "../ProfileModule";

const UItem = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5 }}
    >
      <Stack flexDirection="row" alignItems="center">
        <Avatar sx={{ width: 70, height: 70 }} />
        <Box sx={{ ml: 2.5 }}>
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
  socialModal: SocialModalProps | null;
  handleClose: () => void;
};

const SocialModal = ({
  open,
  socialModal,
  handleClose,
}: ProfileSocialModalProps) => {
  const tabs = useMemo(
    () => [
      {
        route: SocialTabEnum.REVIEWS,
        label: "Recenzii",
      },
      {
        route: SocialTabEnum.FOLLOWERS,
        label: "Urmaritori",
      },
      {
        route: SocialTabEnum.FOLLOWINGS,
        label: "Urmaresti",
      },
    ],
    []
  );

  const [currentTab, setCurrentTab] = useState<SocialTabEnum>(
    socialModal?.selectedTab ?? tabs[0].route
  );

  useEffect(() => {
    const available = tabs.map((t) => t.route);
    if (
      socialModal?.selectedTab !== null &&
      socialModal?.selectedTab !== undefined &&
      available.includes(socialModal?.selectedTab)
    ) {
      setCurrentTab(socialModal?.selectedTab);
    }
  }, [socialModal, tabs]);

  useEffect(() => {
    const available = tabs.map((t) => t.route);
    if (!available.includes(currentTab)) {
      setCurrentTab(tabs[0].route);
    }
  }, [tabs]);

  const styles = {
    container: {
      width: "100%",
      bgcolor: "transparent",
      borderBottom: 1,
      borderColor: "divider",
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: "background.paper",
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
    tabsContent: {
      mx: 1,
      flex: 1,
      overflowY: "auto",
      pt: 1,
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        width: 0,
        height: 0,
      },
    },
  };

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: SocialTabEnum) => {
      setCurrentTab(newValue);
    },
    []
  );

  const tabsContent = useMemo(() => {
    switch (currentTab) {
      case SocialTabEnum.REVIEWS:
        return <SocialReviewsTab />;
      case SocialTabEnum.FOLLOWERS:
        return <SocialFollowersTab />;
      case SocialTabEnum.FOLLOWINGS:
        return <SocialFollowingsTab />;
      default:
        return null;
    }
  }, [currentTab]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      actions={[]}
      dividers={false}
      title={`@${socialModal?.username}`}
      maxWidth="xl"
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
        <Box sx={styles.container}>
          <Tabs value={currentTab} onChange={handleChange} sx={styles.tabs}>
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

        <Box sx={styles.tabsContent}>{tabsContent}</Box>
      </Box>
    </Modal>
  );
};

export default SocialModal;
