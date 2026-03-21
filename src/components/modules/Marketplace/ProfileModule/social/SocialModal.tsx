import Modal from "@/components/core/Modal/Modal";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import SocialReviewsTab from "./SocialReviewsTab";
import SocialFollowersTab from "./SocialFollowersTab";
import SocialFollowingsTab from "./SocialFollowingsTab";
import { SocialTabEnum } from "./SocialTabEnum";
import { SocialModalProps } from "../ProfileModule";

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

  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const positionsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!open) return;
    positionsRef.current = {};
  }, [open, socialModal?.userId]);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: SocialTabEnum) => {
      const root = scrollRootRef.current;
      try {
        if (root) {
          positionsRef.current[String(currentTab)] = root.scrollTop;
        }
      } catch (e) {}

      setCurrentTab(newValue);
    },
    [currentTab]
  );

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const saved = positionsRef.current[String(currentTab)];
    requestAnimationFrame(() => {
      try {
        root.scrollTop = saved ?? 0;
      } catch (e) {}
    });
  }, [currentTab]);

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

  const handleChange = handleTabChange;

  const tabsContent = useMemo(() => {
    const saved = positionsRef.current[String(currentTab)];
    const allowImmediateIntersection = typeof saved === "number" && saved > 0;

    switch (currentTab) {
      case SocialTabEnum.REVIEWS:
        return (
          <SocialReviewsTab
            userId={socialModal?.userId}
            rootRef={scrollRootRef}
            disableInitialIgnore={allowImmediateIntersection}
          />
        );
      case SocialTabEnum.FOLLOWERS:
        return (
          <SocialFollowersTab
            userId={socialModal?.userId}
            rootRef={scrollRootRef}
            disableInitialIgnore={allowImmediateIntersection}
          />
        );
      case SocialTabEnum.FOLLOWINGS:
        return (
          <SocialFollowingsTab
            userId={socialModal?.userId}
            rootRef={scrollRootRef}
            disableInitialIgnore={allowImmediateIntersection}
          />
        );
      default:
        return null;
    }
  }, [currentTab, socialModal?.userId]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      actions={[]}
      dividers={false}
      showFooter={false}
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

        <Box sx={styles.tabsContent} ref={scrollRootRef}>
          {tabsContent}
        </Box>
      </Box>
    </Modal>
  );
};

export default SocialModal;
