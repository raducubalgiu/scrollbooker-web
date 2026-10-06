import Modal from "@/components/core/Modal/Modal";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useState, useEffect, useRef } from "react";
import SocialFollowersTab from "./followers/SocialFollowersTab";
import SocialFollowingsTab from "./followings/SocialFollowingsTab";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { SocialTabEnum } from "./SocialTabEnum";
import { UserCounter } from "@/ts/models/user/UserProfile";
import { SocialModalProps } from "../ProfileModule/ProfileModule";
import SocialReviewsTab from "./reviews/SocialReviewsTab";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

type ProfileSocialModalProps = {
  open: boolean;
  counters: UserCounter;
  socialModal: SocialModalProps | null;
  handleClose: () => void;
};

type TabDef = {
  route: SocialTabEnum;
  counterKey: keyof UserCounter;
  label: string;
};

const TABS: TabDef[] = [
  {
    route: SocialTabEnum.REVIEWS,
    counterKey: "ratings_count",
    label: "Recenzii",
  },
  {
    route: SocialTabEnum.FOLLOWERS,
    counterKey: "followers_count",
    label: "Urmăritori",
  },
  {
    route: SocialTabEnum.FOLLOWINGS,
    counterKey: "followings_count",
    label: "Urmărești",
  },
];

const SocialModal = ({
  open,
  counters,
  socialModal,
  handleClose,
}: ProfileSocialModalProps) => {
  const [currentTab, setCurrentTab] = useState<SocialTabEnum>(
    socialModal?.selectedTab ?? SocialTabEnum.REVIEWS
  );

  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const positionsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (open) positionsRef.current = {};
  }, [open, socialModal?.businessId]);

  useEffect(() => {
    const selectedTab = socialModal?.selectedTab;
    if (selectedTab != null && TABS.some((t) => t.route === selectedTab)) {
      setCurrentTab(selectedTab);
    }
  }, [socialModal]);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const saved = positionsRef.current[String(currentTab)];
    requestAnimationFrame(() => {
      root.scrollTop = saved ?? 0;
    });
  }, [currentTab]);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: SocialTabEnum) => {
      const root = scrollRootRef.current;
      if (root) positionsRef.current[String(currentTab)] = root.scrollTop;
      setCurrentTab(newValue);
    },
    [currentTab]
  );

  const renderTabContent = () => {
    const saved = positionsRef.current[String(currentTab)];
    const disableInitialIgnore = typeof saved === "number" && saved > 0;

    switch (currentTab) {
      case SocialTabEnum.REVIEWS:
        return socialModal?.businessId ? (
          <SocialReviewsTab
            businessId={socialModal.businessId}
            employeeId={socialModal.employeeId ?? null}
            rootRef={scrollRootRef}
            disableInitialIgnore={disableInitialIgnore}
          />
        ) : (
          <NotFound
            title="Recenzii"
            description="Nu au fost găsite recenzii"
            icon={<ReviewsOutlinedIcon />}
          />
        );
      case SocialTabEnum.FOLLOWERS:
        return (
          <SocialFollowersTab
            userId={socialModal?.userId}
            rootRef={scrollRootRef}
            disableInitialIgnore={disableInitialIgnore}
          />
        );
      case SocialTabEnum.FOLLOWINGS:
        return (
          <SocialFollowingsTab
            userId={socialModal?.userId}
            rootRef={scrollRootRef}
            disableInitialIgnore={disableInitialIgnore}
          />
        );
    }
  };

  const isReviewsStep = currentTab === SocialTabEnum.REVIEWS;
  const username = socialModal?.username;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const surfaceColor =
    !isMobile && isDark ? "background.paper" : "background.default";

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      dividers={false}
      title={username ? `@${username}` : ""}
      align="center"
      fullScreen={isMobile}
      {...(isReviewsStep && !isMobile && { maxWidth: "md" })}
      fullWidth={isReviewsStep || isMobile}
      slotProps={{ paper: { sx: { bgcolor: surfaceColor } } }}
    >
      <Box sx={styles.root}>
        <Box sx={{ ...styles.container, backgroundColor: surfaceColor }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={styles.tabs}
            variant={isMobile ? "fullWidth" : "scrollable"}
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {TABS.map(({ route, label, counterKey }) => (
              <Tab
                key={route}
                value={route}
                sx={styles.tab}
                label={
                  <Typography sx={styles.label}>
                    {label} {counters[counterKey]}
                  </Typography>
                }
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={styles.tabsContent} ref={scrollRootRef}>
          {renderTabContent()}
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
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: { xs: "100dvh", lg: "80vh" },
  },
  tabs: {
    "& .MuiTabs-indicator": {
      height: 3,
      borderRadius: 2,
      backgroundColor: "text.primary",
    },
    "& .MuiTab-root": {
      textTransform: "none",
      minHeight: 56,
      color: "text.secondary",
      "&.Mui-selected": {
        color: "text.primary",
      },
    },
  },
  tab: {
    minWidth: { xs: 50, lg: 200 },
  },
  label: {
    fontSize: { xs: 15, lg: 20 },
    fontWeight: 600,
    color: "inherit",
  },
  tabsContent: {
    mx: { xs: 0, lg: 1 },
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
