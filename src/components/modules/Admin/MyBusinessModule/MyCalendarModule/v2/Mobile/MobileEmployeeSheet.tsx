"use client";

import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import CalendarAvatar from "../CalendarAvatar";

type MobileEmployeeSheetProps = {
  open: boolean;
  employees: BusinessEmployee[] | undefined;
  isLoading: boolean;
  selectedEmployeeId: number | null;
  employeesAvailabilityMap: Map<number, boolean>;
  employeeColorsMap: Map<number, string | null>;
  onSelect: (employeeId: number) => void;
  onClose: () => void;
};

const MobileEmployeeSheet = ({
  open,
  employees,
  isLoading,
  selectedEmployeeId,
  employeesAvailabilityMap,
  employeeColorsMap,
  onSelect,
  onClose,
}: MobileEmployeeSheetProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5 }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Angajat
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />

      <Box sx={{ overflowY: "auto", px: 2 }}>
        {isLoading && (
          <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
            Se încarcă...
          </Typography>
        )}

        {!isLoading &&
          employees?.map((employee, index) => {
            const hasAvailability = employeesAvailabilityMap.get(employee.id);
            const availabilityText =
              hasAvailability === undefined
                ? employee.job
                : hasAvailability
                  ? "Are locuri libere"
                  : "Nu mai are locuri libere";
            const isSelected = employee.id === selectedEmployeeId;

            return (
              <Box key={employee.id}>
                <Box sx={styles.row} onClick={() => onSelect(employee.id)}>
                  <CalendarAvatar
                    src={employee.avatar}
                    name={employee.fullname}
                    calendarColor={employeeColorsMap.get(employee.id)}
                    sx={styles.avatar}
                  />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {employee.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {availabilityText}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      ...styles.radio,
                      borderColor: isSelected ? "primary.main" : "divider",
                    }}
                  >
                    {isSelected && <Box sx={styles.radioDot} />}
                  </Box>
                </Box>
                {index < (employees?.length ?? 0) - 1 && <Divider />}
              </Box>
            );
          })}
      </Box>
    </Drawer>
  );
};

export default MobileEmployeeSheet;

const styles = {
  paper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    py: 1.5,
    cursor: "pointer",
  },
  avatar: {
    width: 44,
    height: 44,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    bgcolor: "primary.main",
  },
} as const;
