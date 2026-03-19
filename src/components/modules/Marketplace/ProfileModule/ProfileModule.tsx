"use client";

import {
  Box,
  Button,
  Divider,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import UserAvatar from "@/components/core/Layout/Admin/UserInfo/UserAvatar";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import PostGrid from "@/components/modules/Marketplace/PostGrid/PostGrid";
import { useSession, signIn } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

type ProfileModuleProps = {
  userId: number | undefined;
  profile: UserProfileType;
};

const ProfileModule = ({ userId, profile }: ProfileModuleProps) => {
  const [value, setValue] = React.useState(0);
  const { data: session, status } = useSession();
  const theme = useTheme();

  const overlaySx = useMemo(() => {
    const isDark = theme.palette.mode === "dark";

    if (isDark) {
      return {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.96) 90%)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        color: "common.white",
        pt: 6,
        px: 2,
        pb: 2,
        zIndex: 2000,
        pointerEvents: "auto",
        borderRadius: 2,
      };
    }

    // light mode: use white-ish gradient with subtle opacity so content beneath is obscured nicely
    return {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.85) 100%)",
      WebkitBackdropFilter: "blur(6px)",
      backdropFilter: "blur(6px)",
      color: "text.primary",
      pt: 6,
      px: 2,
      pb: 2,
      zIndex: 2000,
      pointerEvents: "auto",
      borderRadius: 2,
    };
  }, [theme.palette.mode]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <ListItemButton
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 1,
            py: 2,
            minHeight: "auto",
            textAlign: "center",
            maxWidth: 200,
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Recenzii
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {profile.counters.ratings_count}
            </Typography>
          </Stack>
        </ListItemButton>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: 40, alignSelf: "center" }}
        />

        <ListItemButton
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 1,
            py: 2,
            minHeight: "auto",
            textAlign: "center",
            maxWidth: 200,
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Urmaritori
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {profile.counters.followers_count}
            </Typography>
          </Stack>
        </ListItemButton>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: 40, alignSelf: "center" }}
        />

        <ListItemButton
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 1,
            py: 2,
            minHeight: "auto",
            textAlign: "center",
            maxWidth: 200,
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Urmaresti
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {profile.counters.followings_count}
            </Typography>
          </Stack>
        </ListItemButton>
      </Stack>

      <Stack flexDirection="row" alignItems="center">
        <UserAvatar
          isBusinessOrEmployee={profile.is_business_or_employee}
          openNow={profile.opening_hours.open_now}
          url={profile.avatar}
          small={false}
          defaultSize={250}
          badgeSize={25}
        />

        <Box sx={{ ml: 3 }}>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 28 }}>
              {profile.fullname}
            </Typography>
            <Typography
              variant="body1"
              sx={{ ml: 1.5, color: "text.secondary" }}
            >
              @{profile.username}
            </Typography>
          </Stack>

          <Stack flexDirection="row" alignItems="center">
            <Typography
              variant="subtitle1"
              sx={{ mr: 1.5, color: "text.secondary" }}
            >
              {profile.profession}
            </Typography>
            {profile.is_business_or_employee && (
              <>
                <Stack flexDirection="row" alignItems="center">
                  <GradeIcon color="primary" sx={{ fontSize: 30, mr: 0.5 }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: 25 }}
                  >
                    {profile.counters.ratings_average}
                  </Typography>
                </Stack>

                <Typography
                  sx={{ mx: 1.5, fontSize: 25, color: "text.secondary" }}
                >
                  &#x2022;
                </Typography>

                <Stack flexDirection="row" alignItems="center">
                  <QueryBuilderOutlinedIcon
                    color="action"
                    sx={{ fontSize: 25, mr: 0.5 }}
                  />
                  <Typography sx={{ ml: 0.5, mr: 1 }} fontWeight={600}>
                    Inchide la {profile.opening_hours.closing_time}
                  </Typography>
                  <ExpandMoreOutlinedIcon
                    color="action"
                    sx={{ fontSize: 30, mr: 0.5 }}
                  />
                </Stack>
              </>
            )}
          </Stack>

          <Stack flexDirection="row" alignItems="center" sx={{ mt: 1.5 }}>
            <Button
              variant="contained"
              onClick={() => {}}
              size="large"
              disableElevation
              sx={{ mr: 1.5, textTransform: "capitalize" }}
            >
              Urmareste
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {}}
              size="large"
              disableElevation
              startIcon={<DateRangeOutlinedIcon />}
              sx={{ textTransform: "capitalize" }}
            >
              Calendar
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Box
        sx={{
          width: "100%",
          bgcolor: "transparent",
          mt: 5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 2,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 56,
            },
          }}
        >
          <Tab
            icon={<VideoLibraryOutlinedIcon sx={{ fontSize: 30 }} />}
            iconPosition="start"
            label={
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                Postări
              </Typography>
            }
            sx={{ minWidth: 200 }}
          />
          <Tab
            icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />}
            iconPosition="start"
            label={
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                Produse
              </Typography>
            }
            sx={{ minWidth: 200 }}
          />
          <Tab
            icon={<PeopleOutlinedIcon sx={{ fontSize: 30 }} />}
            iconPosition="start"
            label={
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                Angajati
              </Typography>
            }
            sx={{ minWidth: 200 }}
          />
          <Tab
            icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: 30 }} />}
            iconPosition="start"
            label={
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                Salvat
              </Typography>
            }
            sx={{ minWidth: 200 }}
          />
        </Tabs>
      </Box>

      {/* Postări tab content */}
      {value === 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ position: "relative" }}>
            <PostGrid count={6} />
            <Box sx={overlaySx}>
              <Box sx={{ textAlign: "center", maxWidth: 520 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Conectează-te pentru a vedea postările
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  Trebuie să fii autentificat pentru a vedea și interacționa cu
                  postările (urmări, comenta sau aprecia).
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => signIn()}
                    sx={{ mr: 1 }}
                    disableElevation
                  >
                    Conectează-te
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileModule;
