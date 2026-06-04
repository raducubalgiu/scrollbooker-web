import Modal from "@/components/core/Modal/Modal";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import CreateOwnClient, { CreateOwnClientFormData } from "./CreateOwnClient";
import CreateLastMinute from "./CreateLastMinute";
import { CreateAppointmentModalType } from "../WeeklyCalendar/WeeklyCalendar";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";

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

  const handleTab = (
    _event: React.MouseEvent<HTMLElement>,
    newTab: CreateAppointmentTab
  ) => {
    setTab(newTab);
  };

  return (
    <Modal
      open={createModal.open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      title="2 Iunie • 09:00 - 10:00 (30min)"
    >
      <Box px={2}>
        <Stack justifyContent="center">
          <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={handleTab}
            aria-label="text alignment"
            sx={{
              mb: 2.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ToggleButton
              value={CreateAppointmentTab.OWN_CLIENT}
              aria-label="left aligned"
            >
              Programare noua
            </ToggleButton>
            <ToggleButton
              value={CreateAppointmentTab.LAST_MINUTE}
              aria-label="centered"
            >
              Oferta Last Minute
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

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
