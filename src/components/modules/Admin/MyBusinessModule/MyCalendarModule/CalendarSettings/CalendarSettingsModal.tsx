"use client";

import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
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
  useUpdateSlotDuration,
} from "@/controllers/booking/calendarSettings.controller";

type CalendarSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number | undefined;
  canSetAppointmentGap: boolean;
};

type ActivePicker = "duration" | "gap" | null;

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

  const slotDurationMinutes = settings?.slot_duration_minutes ?? 60;
  const appointmentGapMinutes = settings?.appointment_gap_minutes ?? 0;

  return (
    <>
      <Modal
        open={open}
        handleClose={onClose}
        title="Setări calendar"
        maxWidth="xs"
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

          <CalendarSettingsRow
            title="Conectare calendar"
            description="Sincronizează programările cu Google Calendar."
            value="În curând"
            disabled
          />
        </Box>
      </Modal>

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
