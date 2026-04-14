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
import { UserCounter } from "@/ts/models/user/UserProfile";

type ProfileSocialModalProps = {
  open: boolean;
  counters: UserCounter;
  socialModal: SocialModalProps | null;
  handleClose: () => void;
};

type TabDef = {
  route: SocialTabEnum;
  key: keyof UserCounter;
  label: string;
};

const SocialModal = ({
  open,
  counters,
  socialModal,
  handleClose,
}: ProfileSocialModalProps) => {
  const tabs = useMemo<TabDef[]>(
    () => [
      {
        route: SocialTabEnum.REVIEWS,
        key: "ratings_count",
        label: "Recenzii",
      },
      {
        route: SocialTabEnum.FOLLOWERS,
        key: "followers_count",
        label: "Urmaritori",
      },
      {
        route: SocialTabEnum.FOLLOWINGS,
        key: "followings_count",
        label: "Urmaresti",
      },
    ],
    []
  );

  const [currentTab, setCurrentTab] = useState<SocialTabEnum>(
    socialModal?.selectedTab ?? SocialTabEnum.REVIEWS
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
      setCurrentTab(SocialTabEnum.REVIEWS);
    }
  }, [tabs]);

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

  const isReviewsStep = currentTab === SocialTabEnum.REVIEWS;

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      dividers={false}
      title={`@${socialModal?.username}`}
      align="center"
      {...(isReviewsStep && { maxWidth: "md" })}
      fullWidth={isReviewsStep}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          px: 2,
        }}
      >
        <Box sx={styles.container}>
          <Tabs value={currentTab} onChange={handleChange} sx={styles.tabs}>
            {tabs.map((tab) => {
              return (
                <Tab
                  key={tab.route}
                  value={tab.route}
                  label={
                    <Typography sx={styles.label}>
                      {tab.label} {counters[tab.key]}
                    </Typography>
                  }
                  sx={{ minWidth: 200 }}
                />
              );
            })}
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
    pt: 0,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
};
