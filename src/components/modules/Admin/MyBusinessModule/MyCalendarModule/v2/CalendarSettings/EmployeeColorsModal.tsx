"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import {
  useGetCalendarSettings,
  useUpdateCalendarColor,
} from "@/controllers/booking/calendarSettings.controller";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import {
  CALENDAR_COLOR_LABELS,
  CalendarColorEnum,
} from "@/ts/enums/CalendarColorEnum";
import CalendarColorSwatch from "./CalendarColorSwatch";
import CalendarColorPickerModal from "./CalendarColorPickerModal";

type EmployeeColorsModalProps = {
  open: boolean;
  businessOwnerId: number;
  onClose: () => void;
};

type EmployeeColorRowProps = {
  employee: BusinessEmployee;
  onEdit: (employee: BusinessEmployee, color: CalendarColorEnum | null) => void;
};

const EmployeeColorRow = ({ employee, onEdit }: EmployeeColorRowProps) => {
  const { data: settings } = useGetCalendarSettings(employee.id);
  const color = settings?.calendar_color ?? null;

  return (
    <ButtonBase onClick={() => onEdit(employee, color)} sx={styles.row}>
      <Avatar src={employee.avatar ?? ""} sx={styles.avatar}>
        {employee.fullname.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
        <Typography fontWeight={600} noWrap>
          {employee.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {color ? CALENDAR_COLOR_LABELS[color] : "Fără culoare"}
        </Typography>
      </Box>
      <CalendarColorSwatch color={color} size={24} />
    </ButtonBase>
  );
};

const EmployeeColorsModal = ({
  open,
  businessOwnerId,
  onClose,
}: EmployeeColorsModalProps) => {
  const [editing, setEditing] = useState<{
    employee: BusinessEmployee;
    color: CalendarColorEnum | null;
  } | null>(null);

  const { data: employees, isLoading } = useGetAllEmployeesByOwner({
    businessOwnerId,
    isEnabled: open,
  });
  const { mutate: updateColor, isPending } = useUpdateCalendarColor();

  return (
    <>
      <Modal
        open={open}
        handleClose={onClose}
        title="Culorile angajaților"
        maxWidth="sm"
        fullWidth
        dividers={false}
      >
        <Stack sx={{ px: { xs: 1, lg: 0 }, pb: 2 }}>
          {isLoading && (
            <Box sx={styles.centered}>
              <CircularProgress size={28} />
            </Box>
          )}

          {!isLoading && (employees ?? []).length === 0 && (
            <Typography color="text.secondary" sx={styles.centered}>
              Nu ai angajați încă.
            </Typography>
          )}

          {(employees ?? []).map((employee) => (
            <EmployeeColorRow
              key={employee.id}
              employee={employee}
              onEdit={(selected, color) =>
                setEditing({ employee: selected, color })
              }
            />
          ))}
        </Stack>
      </Modal>

      <CalendarColorPickerModal
        open={!!editing}
        title={editing ? `Culoare pentru ${editing.employee.fullname}` : ""}
        value={editing?.color ?? null}
        isSaving={isPending}
        onClose={() => setEditing(null)}
        onSave={(color) => {
          if (!editing) return;
          updateColor(
            { userId: editing.employee.id, payload: { calendar_color: color } },
            { onSuccess: () => setEditing(null) }
          );
        }}
      />
    </>
  );
};

export default EmployeeColorsModal;

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 1.5,
    borderRadius: 3,
    width: "100%",
    "&:hover": { bgcolor: "action.hover" },
  },
  avatar: {
    width: 40,
    height: 40,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 4,
    textAlign: "center",
  },
};
