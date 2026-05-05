import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { AccessTime, Person } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
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

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          bgcolor: "grey.900",
          color: "common.white",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={styles.contactContainer}>
            <Box sx={styles.contactIcon}>
              <Person />
            </Box>
            <Box>
              <Typography variant="caption" sx={styles.contactName}>
                Owner / Manager
              </Typography>
              <Typography variant="h6" fontWeight="700">
                {owner.fullname}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Pentru întrebări suplimentare legate de acest business, contactați
            echipa administrativă.
          </Typography>
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
