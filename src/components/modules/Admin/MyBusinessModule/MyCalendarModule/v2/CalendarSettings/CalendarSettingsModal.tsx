"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Modal from "@/components/core/Modal/Modal";
import CalendarSettingsRow from "./CalendarSettingsRow";
import CalendarDurationPickerModal from "./CalendarDurationPickerModal";
import {
  APPOINTMENT_GAP_OPTIONS,
  labelForAppointmentGap,
  labelForSlotDuration,
  SLOT_DURATION_OPTIONS,
} from "./calendarDurationOptions";
import {
  useGetCalendarSettings,
  useUpdateAppointmentGap,
  useUpdateCalendarColor,
  useUpdateColorMode,
  useUpdateSlotDuration,
} from "@/controllers/booking/calendarSettings.controller";
import {
  CALENDAR_COLOR_LABELS,
  CalendarColorModeEnum,
} from "@/ts/enums/CalendarColorEnum";
import CalendarColorPickerModal from "./CalendarColorPickerModal";
import EmployeeColorsModal from "./EmployeeColorsModal";
import CalendarConnectionModal, { isCalendarConnected } from "./CalendarConnectionModal";
import { useGetMyCalendarConnection } from "@/controllers/integration/calendarConnection.controller";

type CalendarSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number | undefined;
  canSetAppointmentGap: boolean;
};

type ActivePicker =
  | "duration"
  | "gap"
  | "myColor"
  | "employeeColors"
  | "calendarConnection"
  | null;

const CalendarSettingsModal = ({
  open,
  onClose,
  userId,
  canSetAppointmentGap,
}: CalendarSettingsModalProps) => {
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const { data: settings } = useGetCalendarSettings(userId, {
    enabled: open,
  });

  const { mutate: updateSlotDuration, isPending: isSavingSlotDuration } =
    useUpdateSlotDuration();
  const { mutate: updateAppointmentGap, isPending: isSavingGap } =
    useUpdateAppointmentGap();
  const { mutate: updateColorMode, isPending: isSavingColorMode } =
    useUpdateColorMode();
  const { mutate: updateCalendarColor, isPending: isSavingColor } =
    useUpdateCalendarColor();

  const { data: session } = useSession();
  const canManageEmployeeColors =
    !!session?.has_employees && !session?.is_employee;
  const businessOwnerId = session?.business_owner_id ?? null;

  const slotDurationMinutes = settings?.slot_duration_minutes ?? 60;
  const appointmentGapMinutes = settings?.appointment_gap_minutes ?? 0;
  const colorMode = settings?.color_mode ?? CalendarColorModeEnum.SERVICE;
  const myColor = settings?.calendar_color ?? null;

  const { data: calendarConnection } = useGetMyCalendarConnection({ enabled: open });

  return (
    <>
      <Modal
        open={open}
        handleClose={onClose}
        title="Setări calendar"
        maxWidth="sm"
        fullWidth
      >
        <Box>
          <CalendarSettingsRow
            title="Durata implicită a intervalului"
            description="Durata folosită implicit când deschizi calendarul."
            value={labelForSlotDuration(slotDurationMinutes)}
            onClick={() => setActivePicker("duration")}
          />

          {canSetAppointmentGap && (
            <>
              <Divider />
              <CalendarSettingsRow
                title="Pauză între programări"
                description="Timpul liber adăugat automat după fiecare programare."
                value={labelForAppointmentGap(appointmentGapMinutes)}
                onClick={() => setActivePicker("gap")}
              />
            </>
          )}

          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ py: 2 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={600}>
                Colorează programările după
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                Culoarea aleasă la programare are mereu prioritate.
              </Typography>
            </Box>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={colorMode}
              disabled={isSavingColorMode}
              onChange={(_, value: CalendarColorModeEnum | null) => {
                if (value && value !== colorMode) {
                  updateColorMode({ color_mode: value });
                }
              }}
              sx={{ flexShrink: 0 }}
            >
              <ToggleButton value={CalendarColorModeEnum.SERVICE}>
                Serviciu
              </ToggleButton>
              <ToggleButton value={CalendarColorModeEnum.EMPLOYEE}>
                Angajat
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {canSetAppointmentGap && (
            <>
              <Divider />
              <CalendarSettingsRow
                title="Culoarea mea"
                description="Folosită când programările sunt colorate după angajat."
                value={
                  myColor ? CALENDAR_COLOR_LABELS[myColor] : "Fără culoare"
                }
                onClick={() => setActivePicker("myColor")}
              />
            </>
          )}

          {canManageEmployeeColors && businessOwnerId !== null && (
            <>
              <Divider />
              <CalendarSettingsRow
                title="Culorile angajaților"
                description="Alege câte o culoare pentru fiecare angajat."
                value=""
                onClick={() => setActivePicker("employeeColors")}
              />
            </>
          )}

          {(canSetAppointmentGap || isCalendarConnected(calendarConnection)) && (
            <>
              <Divider />

              <CalendarSettingsRow
                title="Conectare calendar"
                description="Sincronizează programările cu Google Calendar."
                value={isCalendarConnected(calendarConnection) ? "Conectat" : "Neconectat"}
                onClick={() => setActivePicker("calendarConnection")}
              />
            </>
          )}
        </Box>
      </Modal>

      <CalendarConnectionModal
        open={activePicker === "calendarConnection"}
        canConnect={canSetAppointmentGap}
        onClose={() => setActivePicker(null)}
      />

      <CalendarColorPickerModal
        open={activePicker === "myColor"}
        title="Culoarea mea"
        value={myColor}
        isSaving={isSavingColor}
        onClose={() => setActivePicker(null)}
        onSave={(color) => {
          if (!userId) return;
          updateCalendarColor(
            { userId, payload: { calendar_color: color } },
            { onSuccess: () => setActivePicker(null) }
          );
        }}
      />

      {businessOwnerId !== null && (
        <EmployeeColorsModal
          open={activePicker === "employeeColors"}
          businessOwnerId={businessOwnerId}
          onClose={() => setActivePicker(null)}
        />
      )}

      <CalendarDurationPickerModal
        open={activePicker === "duration"}
        title="Durata implicită a intervalului"
        options={SLOT_DURATION_OPTIONS}
        selectedMinutes={slotDurationMinutes}
        isSaving={isSavingSlotDuration}
        onSave={(minutes) =>
          updateSlotDuration(
            { slot_duration_minutes: minutes },
            { onSuccess: () => setActivePicker(null) }
          )
        }
        onClose={() => setActivePicker(null)}
      />

      <CalendarDurationPickerModal
        open={activePicker === "gap"}
        title="Pauză între programări"
        options={APPOINTMENT_GAP_OPTIONS}
        selectedMinutes={appointmentGapMinutes}
        isSaving={isSavingGap}
        onSave={(minutes) =>
          updateAppointmentGap(
            { appointment_gap_minutes: minutes },
            { onSuccess: () => setActivePicker(null) }
          )
        }
        onClose={() => setActivePicker(null)}
      />
    </>
  );
};

export default CalendarSettingsModal;
