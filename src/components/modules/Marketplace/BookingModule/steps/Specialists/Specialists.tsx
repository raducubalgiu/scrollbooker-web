import {
  Avatar,
  Badge,
  Box,
  MenuItem,
  Stack,
  Select,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { formatRating } from "@/utils/formatters";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { SelectedBookingItem } from "../../BookingModule";

type SpecialistsProps = {
  selectedItems: SelectedBookingItem[];
  employees: BusinessEmployee[];
  selectedEmployeeId: number | null;
  onChangeSelectedEmployeeId: (event: SelectChangeEvent<number>) => void;
};

const Specialists = ({
  selectedItems,
  employees,
  selectedEmployeeId,
  onChangeSelectedEmployeeId,
}: SpecialistsProps) => {
  const renderSpecialistItem = (
    specialist: BusinessEmployee,
    isSelected = false
  ) => (
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

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3} mb={2}>
        Selectează specialistul
      </Typography>

      <FormControl fullWidth>
        <Select
          value={selectedEmployeeId || ""}
          onChange={onChangeSelectedEmployeeId}
          displayEmpty
          variant="outlined"
          sx={{
            borderRadius: "100px",
            backgroundColor: "transparent",
            transition: "all 0.2s ease-in-out",
            p: 0,

            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "100px",
              border: 1,
              borderColor: "divider",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              borderWidth: "1px",
            },

            "& .MuiSelect-select": {
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent !important",
            },
          }}
          renderValue={(value) => {
            if (!value) {
              return (
                <Typography color="text.secondary">
                  Selectează un specialist
                </Typography>
              );
            }
            const selected = employees.find((s) => s.id === value);
            return selected ? renderSpecialistItem(selected, true) : null;
          }}
        >
          {employees.map((specialist) => (
            <MenuItem
              key={specialist.id}
              value={specialist.id}
              sx={{ borderRadius: "12px", mx: 1, my: 1 }}
            >
              {renderSpecialistItem(specialist)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(Specialists);

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
