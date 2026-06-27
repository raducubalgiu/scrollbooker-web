import { SearchUser } from "@/ts/models/search/SearchUser";
import { formatRating } from "@/utils/formatters";
import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import StarIcon from "@mui/icons-material/Star";

type SearchUserItemProps = {
  user: SearchUser;
  onNavigateToUserProfile: (username: string, profession: string) => void;
};

export const SearchUserItem = ({
  user,
  onNavigateToUserProfile,
}: SearchUserItemProps) => {
  const userAvatar = useCallback(() => {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          user.is_business_or_employee && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={styles.badgeContent}
              gap={0.25}
            >
              <StarIcon sx={{ fontSize: 18, color: "rating.main" }} />
              <Typography
                sx={{ fontSize: 15, fontWeight: 600, color: "text.primary" }}
              >
                {formatRating(user.ratings_average)}
              </Typography>
            </Stack>
          )
        }
        sx={styles.badge}
      >
        <Avatar sx={styles.avatar} src={user.avatar ?? ""} />
      </Badge>
    );
  }, [user.ratings_average, user.avatar, user.is_business_or_employee]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onNavigateToUserProfile(user.username, user.profession)}
        sx={{ py: 2 }}
      >
        <Stack flexDirection="row" alignItems="center">
          {userAvatar()}

          <Box sx={{ ml: 2.5 }}>
            <Typography fontSize={{ xs: 16, lg: 18 }} fontWeight={600}>
              {user.fullname}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.is_business_or_employee
                ? user.profession
                : `@${user.username}`}
            </Typography>
          </Box>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

const styles = {
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "common.white",
    px: 0.75,
    py: 0.25,
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    border: 1,
    borderColor: "divider",
  },
};
