import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import SpecialistItem from "./SpecialistItem";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";
import { find } from "lodash";

type SpecialistSelectProps = {
  eligibleEmployees: BookingFlowUser[];
  selectedEmployeeId: number | null;
  onChangeSelectedEmployeeId: (event: SelectChangeEvent<number>) => void;
};

const SpecialistSelect = ({
  eligibleEmployees,
  selectedEmployeeId,
  onChangeSelectedEmployeeId,
}: SpecialistSelectProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 2.5 }}>
      <Select
        value={selectedEmployeeId || ""}
        onChange={onChangeSelectedEmployeeId}
        displayEmpty
        variant="outlined"
        sx={styles.select}
        renderValue={(value) => {
          if (!value) {
            return (
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "primary.main",
                  }}
                >
                  <GroupIcon />
                </Avatar>
                <Typography color="text.secondary">
                  Selectează un specialist
                </Typography>
              </Stack>
            );
          }
          const selectedSpecialist = find(eligibleEmployees, { id: value });

          return selectedSpecialist ? (
            <SpecialistItem specialist={selectedSpecialist} isSelected={true} />
          ) : null;
        }}
      >
        {eligibleEmployees.map((specialist) => (
          <MenuItem
            key={specialist.id}
            value={specialist.id}
            sx={{ borderRadius: "12px", mx: 1, my: 1 }}
          >
            <SpecialistItem specialist={specialist} isSelected={false} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SpecialistSelect;

const styles = {
  select: {
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
  },
};
