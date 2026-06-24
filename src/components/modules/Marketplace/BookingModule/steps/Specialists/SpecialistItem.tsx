import { formatRating } from "@/utils/formatters";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";

type SpecialistItemProps = {
  isSelected: boolean;
  specialist: BookingFlowUser;
};

const SpecialistItem = ({ specialist, isSelected }: SpecialistItemProps) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={2} sx={{ py: 0.5 }}>
      <Badge
        invisible={isSelected}
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
              {formatRating(specialist.ratings_average)}
            </Typography>
          </Stack>
        }
        sx={styles.badge}
      >
        <Avatar
          sx={{
            ...styles.avatar,
            width: isSelected ? 50 : styles.avatar.width,
            height: isSelected ? 50 : styles.avatar.height,
          }}
          src={specialist.avatar ?? ""}
        />
      </Badge>
      <Box>
        <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
          {specialist.fullname}
        </Typography>
        {!isSelected && (
          <Typography variant="caption" color="text.secondary">
            Specialist
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default SpecialistItem;

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
    px: { xs: 1, lg: 1.5 },
    py: { xs: 0.2, lg: 0.5 },
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: { xs: 50, lg: 65 },
    height: { xs: 50, lg: 65 },
    border: 1,
    borderColor: "divider",
  },
};
