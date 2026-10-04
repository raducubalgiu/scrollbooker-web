import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { AccessTime } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { UserProfileAboutOwner } from "@/ts/models/user/UserProfileAbout";
import ProfileInfoOwnerSection from "./ProfileInfoOwnerSection";

type ProfileInfoRightColumnProps = {
  schedules: Schedule[];
  owner: UserProfileAboutOwner;
};

const ProfileInfoRightColumn = ({
  schedules,
  owner,
}: ProfileInfoRightColumnProps) => {
  return (
    <Box sx={styles.container}>
      <ProfileInfoOwnerSection owner={owner} />

      <Card elevation={0} sx={styles.schedulesContainer}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="700" mb={2.5} sx={styles.title}>
            <AccessTime fontSize="medium" sx={{ color: "text.secondary" }} />
            Program de lucru
          </Typography>
          <SchedulesSection schedules={schedules} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileInfoRightColumn;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  schedulesContainer: {
    borderRadius: 4,
    border: "1px solid",
    borderColor: "divider",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  contactContainer: {
    borderRadius: 4,
    bgcolor: "grey.900",
    color: "common.white",
    display: "flex",
    alignItems: "center",
    gap: 3,
    mb: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    bgcolor: "primary.main",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contactName: {
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
};
