import { Avatar, Badge, Box, Button, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { formatRating } from "@/utils/formatters";
import React from "react";
import { PostUser } from "@/ts/models/social/Post";
import { useRouter } from "next/navigation";

type VideoHeaderProps = {
  description: string | null;
  user: PostUser;
};

const VideoHeader = ({ user, description }: VideoHeaderProps) => {
  const router = useRouter();

  const styles = {
    badge: {
      "& .MuiBadge-badge": {
        right: "auto",
        left: "50%",
        transform: `translate(-50%, 100%)`,
      },
    },
    badgeContent: {
      backgroundColor: "background.paper",
      px: 1.5,
      py: 0.5,
      borderRadius: 50,
      boxShadow: 1,
    },
    avatar: { width: 70, height: 70, border: 1, borderColor: "divider" },
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={() => router.push(`/profile/${user.username}`)}
        sx={{ cursor: "pointer" }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={styles.badgeContent}
            >
              <StarRateRoundedIcon
                sx={{ fontSize: 18, mr: 0.5 }}
                color="primary"
              />
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {formatRating(user.ratings_average)}
              </Typography>
            </Stack>
          }
          sx={styles.badge}
        >
          <Avatar sx={styles.avatar} src={user.avatar ?? ""} />
        </Badge>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography variant="h6" fontWeight={700} noWrap>
              {user.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <Typography color="text.secondary">Frizerie •</Typography>
            <Typography color="text.secondary">
              Strada Oarecare nr 3, Sector 6
            </Typography>
            <Typography
              color="primary"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
            >
              Vezi indicatii
            </Typography>
          </Stack>
        </Box>

        {/* {!user.is_follow && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            size="medium"
            sx={{ textTransform: "none" }}
          >
            Urmareste
          </Button>
        )} */}
      </Stack>

      {/* <Box sx={{ mt: 4 }}>
        <Typography>{description ?? "..."}</Typography>
      </Box> */}
    </Box>
  );
};

export default VideoHeader;
