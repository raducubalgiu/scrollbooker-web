import { UserProfileAboutOwner } from "@/ts/models/user/UserProfileAbout";
import { Business, ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type ProfileInfoOwnerSectionProps = {
  owner: UserProfileAboutOwner;
};

const ProfileInfoOwnerSection = ({ owner }: ProfileInfoOwnerSectionProps) => {
  const router = useRouter();

  return (
    <Card elevation={0} sx={styles.schedulesContainer}>
      <CardContent sx={styles.contentContainer}>
        <Typography variant="overline" sx={styles.title}>
          Angajat la
        </Typography>

        <Box sx={styles.content}>
          <Avatar
            src={owner.avatar ?? ""}
            alt={owner.fullname}
            sx={styles.avatar}
            variant="rounded"
          >
            <Business />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
              {owner.fullname}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {owner.profession}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          endIcon={<ChevronRight />}
          disableElevation
          onClick={() => router.push(`/profile/${owner.username}`)}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Vezi profilul business-ului
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoOwnerSection;

const styles = {
  schedulesContainer: {
    borderRadius: 4,
    border: "1px solid",
    borderColor: "divider",
  },
  contentContainer: {
    p: 3,
    position: "relative",
    zIndex: 1,
  },
  title: {
    opacity: 0.8,
    fontWeight: 700,
    letterSpacing: 1.2,
  },
  content: { display: "flex", alignItems: "center", mt: 1, mb: 2, gap: 2 },
  avatar: {
    width: 56,
    height: 56,
    border: "3px solid rgba(255,255,255,0.2)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};
