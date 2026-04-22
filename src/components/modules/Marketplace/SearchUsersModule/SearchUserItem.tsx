import { SearchUser } from "@/ts/models/search/SearchUser";
import { formatRating } from "@/utils/formatters";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

type SearchUserItemProps = {
  user: SearchUser;
  onNavigateToUserProfile: (username: string) => void;
};

export const SearchUserItem = ({
  user,
  onNavigateToUserProfile,
}: SearchUserItemProps) => {
  return (
    <ListItem disablePadding sx={{ px: 1.5 }}>
      <ListItemButton
        onClick={() => onNavigateToUserProfile(user.username)}
        sx={{ py: 2.5 }}
      >
        <Stack flexDirection="row" alignItems="center">
          {user.is_business_or_employee ? (
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
                  <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                  <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                    {formatRating(user.ratings_average)}
                  </Typography>
                </Stack>
              }
              sx={styles.badge}
            >
              <Avatar
                sx={styles.avatar}
                src={user.avatar ?? ""}
                alt={user.fullname}
              />
            </Badge>
          ) : (
            <Avatar
              sx={styles.avatar}
              src={user.avatar ?? ""}
              alt={user.fullname}
            />
          )}

          <Box sx={{ ml: 2.5 }}>
            <Typography fontSize={18} fontWeight={600}>
              {user.fullname}
            </Typography>
            <Typography color="text.secondary">
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
    backgroundColor: "background.paper",
    px: 1.5,
    py: 0.5,
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: { width: 50, height: 50, border: 1, borderColor: "divider" },
};
