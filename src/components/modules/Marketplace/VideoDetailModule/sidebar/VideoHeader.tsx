import { Avatar, Badge, Box, Skeleton, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { formatRating } from "@/utils/formatters";
import React from "react";
import { PostUser } from "@/ts/models/social/Post";
import { useRouter } from "next/navigation";
import Link from "next/link";

type VideoHeaderProps = {
  isLoading: boolean;
  displayDescription: boolean;
  description: string | null;
  user: PostUser | undefined;
};

const VideoHeader = ({
  user,
  description,
  displayDescription = false,
  isLoading = false,
}: VideoHeaderProps) => {
  const router = useRouter();
  const { avatar, fullname, username, ratings_average } = user || {};

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
        onClick={() => router.push(`/profile/${username}`)}
        sx={{ cursor: "pointer" }}
      >
        {isLoading ? (
          <Skeleton variant="circular" width={70} height={70} />
        ) : (
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
                  {ratings_average ? formatRating(ratings_average) : "-"}
                </Typography>
              </Stack>
            }
            sx={styles.badge}
          >
            <Avatar sx={styles.avatar} src={avatar ?? ""} />
          </Badge>
        )}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            {isLoading ? (
              <Skeleton variant="rounded" width={150} height={15} />
            ) : (
              <>
                <Typography variant="h6" fontWeight={700} noWrap>
                  {fullname ?? "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{username}
                </Typography>
              </>
            )}
          </Stack>

          {isLoading ? (
            <Skeleton
              variant="rounded"
              width={300}
              height={15}
              sx={{ mt: 1 }}
            />
          ) : (
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography color="text.secondary">
                Frizerie • Strada Oarecare nr 3, Sector 6
              </Typography>
              <Link href="" style={{ textDecoration: "none" }}>
                <Typography
                  color="primary"
                  fontWeight={600}
                  sx={{ cursor: "pointer" }}
                >
                  Vezi indicatii
                </Typography>
              </Link>
            </Stack>
          )}
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

      {displayDescription && (
        <Box sx={{ mt: 4 }}>
          <Typography>{description ?? "..."}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoHeader;
