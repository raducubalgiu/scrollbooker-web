import Modal from "@/components/core/Modal/Modal";
import { Box, Typography } from "@mui/material";
import React from "react";
import CreateOwnClient, { CreateOwnClientFormData } from "./CreateOwnClient";
import CreateLastMinute from "./CreateLastMinute";
import { CreateAppointmentModalType } from "../WeeklyCalendar/WeeklyCalendar";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  SegmentedButtons,
  SegmentedOption,
} from "@/components/core/SegmentedButtons/SegmentedButtons";
import dayjs from "@/lib/dayjs";

type CreateAppointmentModalProps = {
  createModal: CreateAppointmentModalType;
  isLoadingLastMinute: boolean;
  onCreateLastMinute: (discount: number, slot: CalendarEventsSlot) => void;
  isLoadingOwnClient: boolean;
  onCreateOwnClient: (
    data: CreateOwnClientFormData,
    slot: CalendarEventsSlot
  ) => void;
  onClose: () => void;
};

enum CreateAppointmentTab {
  OWN_CLIENT,
  LAST_MINUTE,
}

const CreateAppointmentModal = ({
  createModal,
  onCreateLastMinute,
  isLoadingLastMinute,
  onCreateOwnClient,
  isLoadingOwnClient,
  onClose,
}: CreateAppointmentModalProps) => {
  const [tab, setTab] = React.useState<CreateAppointmentTab>(
    CreateAppointmentTab.OWN_CLIENT
  );

  const appointmentTabs: SegmentedOption<CreateAppointmentTab>[] = [
    { value: CreateAppointmentTab.OWN_CLIENT, label: "Programare nouă" },
    { value: CreateAppointmentTab.LAST_MINUTE, label: "Ofertă Last Minute" },
  ];

  const handleTab = (value: CreateAppointmentTab) => {
    setTab(value);
  };

  const slot = createModal?.slot;

  const startTime = slot?.start_date_utc
    ? dayjs.utc(slot.start_date_utc).local().format("HH:mm")
    : "--:--";

  const endTime = slot?.end_date_utc
    ? dayjs.utc(slot.end_date_utc).local().format("HH:mm")
    : "--:--";

  return (
    <Modal
      open={createModal.open}
      handleClose={onClose}
      maxWidth="sm"
      fullWidth
      title="Administreaza intervalul"
    >
      <Box px={2}>
        <SegmentedButtons
          value={tab}
          onChange={handleTab}
          options={appointmentTabs}
        />

        <Box sx={{ textAlign: "center", my: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "block",
              mb: 1,
            }}
          >
            Interval
          </Typography>
          <Typography
            variant="h3"
            fontWeight="800"
            sx={{ color: "text.primary", letterSpacing: "-1px" }}
          >
            {startTime} — {endTime}
          </Typography>
        </Box>

        {tab === CreateAppointmentTab.OWN_CLIENT ? (
          <CreateOwnClient
            slot={createModal.slot}
            onCreateOwnClient={onCreateOwnClient}
            isLoadingOwnClient={isLoadingOwnClient}
          />
        ) : (
          <CreateLastMinute
            slot={createModal.slot}
            onCreateLastMinute={onCreateLastMinute}
            isLoadingLastMinute={isLoadingLastMinute}
          />
        )}
      </Box>
    </Modal>
  );
};

export default CreateAppointmentModal;
