"use client";

import React from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "@/components/core/Modal/Modal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import CalendarAvatar from "../../CalendarAvatar";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";

type SelectEmployeeDialogProps = {
  open: boolean;
  employees: BusinessEmployee[];
  isLoading: boolean;
  selectedEmployeeId: number | null;
  onSelect: (employee: BusinessEmployee) => void;
  onClose: () => void;
};

const EmployeeAvatar = ({ employee }: { employee: BusinessEmployee }) => {
  const { data: settings } = useGetCalendarSettings(employee.id);

  return (
    <CalendarAvatar
      src={employee.avatar}
      name={employee.fullname}
      calendarColor={settings?.calendar_color ?? null}
    />
  );
};

const SelectEmployeeDialog = ({
  open,
  employees,
  isLoading,
  selectedEmployeeId,
  onSelect,
  onClose,
}: SelectEmployeeDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const list = (
    <Stack sx={{ p: 1 }}>
      {isLoading && (
        <Box sx={styles.centered}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!isLoading && employees.length === 0 && (
        <Typography color="text.secondary" sx={styles.centered}>
          Nu ai angajați încă.
        </Typography>
      )}

      {employees.map((employee) => {
        const isSelected = employee.id === selectedEmployeeId;

        return (
          <Stack
            key={employee.id}
            direction="row"
            alignItems="center"
            spacing={1.5}
            onClick={() => onSelect(employee)}
            sx={[styles.row, isSelected && styles.rowSelected]}
          >
            <EmployeeAvatar employee={employee} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={isSelected ? 700 : 600} noWrap>
                {employee.fullname}
              </Typography>
              {employee.job && (
                <Typography variant="body2" color="text.secondary" noWrap>
                  {employee.job}
                </Typography>
              )}
            </Box>
            {isSelected && <CheckCircleIcon color="primary" />}
          </Stack>
        );
      })}
    </Stack>
  );

  if (!isMobile) {
    return (
      <Modal
        open={open}
        handleClose={onClose}
        title="Alege angajatul"
        maxWidth="sm"
        fullWidth
        dividers={false}
      >
        {list}
      </Modal>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
        <Typography fontWeight={700}>Alege angajatul</Typography>
        <Box sx={{ width: 34 }} />
      </Stack>
      <Divider />
      <Box sx={{ overflowY: "auto" }}>{list}</Box>
    </Drawer>
  );
};

export default SelectEmployeeDialog;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
  },
  row: {
    p: 1.5,
    borderRadius: 3,
    border: 1,
    borderColor: "transparent",
    cursor: "pointer",
    "&:hover": { bgcolor: "action.hover" },
  },
  rowSelected: {
    borderColor: "primary.main",
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 4,
    textAlign: "center",
  },
};
