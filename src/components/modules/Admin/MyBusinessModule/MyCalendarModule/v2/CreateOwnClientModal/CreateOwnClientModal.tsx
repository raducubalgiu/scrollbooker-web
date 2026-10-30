"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import dayjs from "@/lib/dayjs";
import { useMutate } from "@/hooks/useHttp";
import { AppointmentBusinessClientCreate } from "@/ts/models/booking/appointment/Appointment";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import CreateOwnClientClientSection from "./CreateOwnClientClientSection";
import CreateOwnClientServicesSection from "./CreateOwnClientServicesSection";
import CreateOwnClientDateTimeSection from "./CreateOwnClientDateTimeSection";
import CreateOwnClientNotesSection from "./CreateOwnClientNotesSection";
import CreateClientDialog from "./CreateClientDialog";
import SelectClientDrawer from "./SelectClientDrawer";
import CreateOwnClientMobileHeader from "./CreateOwnClientMobileHeader";
import SelectDateTimeDrawer from "./SelectDateTimeDrawer";
import SelectServicesPicker from "./SelectServicesPicker";
import SelectDateTimeModal from "./SelectDateTimeModal";
import CreateOwnClientMinimalHeader from "./CreateOwnClientMinimalHeader";
import CreateOwnClientBottomBar from "./CreateOwnClientBottomBar";
import ClientSelectionContent from "./ClientSelectionContent";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { SelectedSlot, SelectedVariant } from "./createOwnClientTypes";

type CreateOwnClientModalProps = {
  open: boolean;
  businessId: number;
  providerUserId: number | null;
  employeeId: number | undefined;
  initialSlot?: CalendarEventsSlot | null;
  onClose: () => void;
};

type ActiveDrawer = "client" | "newClient" | "services" | "dateTime" | null;

const slotFromCalendarEvent = (
  slot: CalendarEventsSlot | null | undefined
): SelectedSlot | null => {
  if (!slot?.start_date_utc || !slot?.end_date_utc) return null;

  return {
    startUtc: slot.start_date_utc,
    endUtc: slot.end_date_utc,
    startLocale: slot.start_date_locale,
    endLocale: slot.end_date_locale,
  };
};

const getSlotDurationMinutes = (slot: SelectedSlot) =>
  dayjs(slot.endUtc).diff(dayjs(slot.startUtc), "minute");

const CreateOwnClientModal = ({
  open,
  businessId,
  providerUserId,
  employeeId,
  initialSlot,
  onClose,
}: CreateOwnClientModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);
  const [selectedClient, setSelectedClient] = useState<BusinessClient | null>(
    null
  );
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>(
    []
  );
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setSelectedClient(null);
    setSelectedVariants([]);
    setNotes("");
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
  }, [open, initialSlot]);

  const handleReset = () => {
    setSelectedClient(null);
    setSelectedVariants([]);
    setNotes("");
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
  };

  const initialDay = initialSlot?.start_date_locale ?? null;

  const handleChangeVariants = (variants: SelectedVariant[]) => {
    setSelectedVariants(variants);
    setActiveDrawer(null);
  };

  const handleSelectSlot = (slot: SelectedSlot) => {
    setSelectedSlot(slot);
    setActiveDrawer(null);
  };

  const totalDurationMinutes = selectedVariants.reduce(
    (sum, variant) => sum + variant.duration,
    0
  );
  const totalPrice = selectedVariants.reduce(
    (sum, variant) => sum + variant.priceWithDiscount,
    0
  );

  const canPickDateTime =
    selectedVariants.length > 0 && providerUserId !== null;

  const dateTimeDisabledLabel =
    selectedVariants.length === 0
      ? "Selectează mai întâi serviciile"
      : "Deschide programarea din calendarul unui angajat";

  const slotDurationMinutes = selectedSlot
    ? getSlotDurationMinutes(selectedSlot)
    : null;
  const hasDurationMismatch =
    slotDurationMinutes !== null &&
    totalDurationMinutes > 0 &&
    slotDurationMinutes !== totalDurationMinutes;
  const durationMismatchMessage = hasDurationMismatch
    ? `Intervalul selectat are ${ProductUtils.getDurationText(slotDurationMinutes)}, dar serviciile durează ${ProductUtils.getDurationText(totalDurationMinutes)}. Alege un interval potrivit.`
    : null;

  const isReadyToSave =
    !!selectedClient &&
    selectedVariants.length > 0 &&
    !!selectedSlot &&
    !hasDurationMismatch;

  const { mutate: createAppointment, isPending: isSaving } =
    useMutate<AppointmentBusinessClientCreate>({
      key: ["create-own-client-appointment"],
      url: "/api/protected/appointments/create-own-client-appointment",
      options: {
        onSuccess: () => {
          toast.success("Programarea a fost creată.");
          onClose();
        },
        onError: (error) => {
          const detail = (error as AxiosError<{ detail?: unknown }>).response
            ?.data?.detail;
          toast.error(
            typeof detail === "string"
              ? detail
              : "Programarea nu a putut fi creată."
          );
        },
      },
    });

  const handleSave = () => {
    if (!isReadyToSave || !selectedClient || !selectedSlot) {
    if (durationMismatchMessage) {
      toast.error(durationMismatchMessage);
      return;
    }

      toast.error("Completează clientul, serviciile și intervalul.");
      return;
    }

    if (!providerUserId) {
      toast.error("Alege un interval din calendarul unui angajat.");
      return;
    }

    const start = dayjs(selectedSlot.startUtc);
    if (!start.isAfter(dayjs())) {
      toast.error("Nu poți crea o programare în trecut.");
      return;
    }

    createAppointment({
      start_date: start.toISOString(),
      end_date: dayjs(selectedSlot.endUtc).toISOString(),
      user_id: providerUserId,
      business_client_id: selectedClient.id,
      product_variants: selectedVariants.map((variant) => ({
        id: variant.variantId,
        offering: { user_id: providerUserId },
      })),
    });
  };

  const handleRemoveVariant = (variantId: number) => {
    setSelectedVariants((prev) => prev.filter((v) => v.variantId !== variantId));
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDialog-paper": { display: "flex", flexDirection: "column" },
        }}
      >
        {isMobile ? (
          <>
            <CreateOwnClientMobileHeader
              title="Programare nouă"
              saveLabel="Creează programarea"
              isSaving={isSaving}
              onClose={onClose}
              onSave={handleSave}
            />

            <Stack
              spacing={2.5}
              sx={{
                maxWidth: 560,
                mx: "auto",
                width: "100%",
                p: 2.5,
                pb: 10,
              }}
            >
              <CreateOwnClientClientSection
                selectedClient={selectedClient}
                onOpenSelect={() => setActiveDrawer("client")}
                onClearClient={() => setSelectedClient(null)}
                onAddClient={() => setActiveDrawer("newClient")}
              />

              <CreateOwnClientServicesSection
                selectedVariants={selectedVariants}
                onOpenSelect={() => setActiveDrawer("services")}
                onRemoveVariant={handleRemoveVariant}
              />

              <CreateOwnClientDateTimeSection
                selectedSlot={selectedSlot}
                disabled={!canPickDateTime}
                disabledLabel={dateTimeDisabledLabel}
                hasError={selectedVariants.length === 0}
                onOpenSelect={() => setActiveDrawer("dateTime")}
                onClearSlot={() => setSelectedSlot(null)}
                errorMessage={durationMismatchMessage}
              />

              <CreateOwnClientNotesSection value={notes} onChange={setNotes} />
            </Stack>
          </>
        ) : (
          <>
            <CreateOwnClientMinimalHeader
              title="Programare nouă"
              onClose={onClose}
            />

            <Grid container sx={{ flex: 1, overflow: "hidden" }}>
              <Grid
                size={5}
                sx={{
                  borderRight: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  overflowY: "auto",
                  p: 4,
                }}
              >
                <CreateOwnClientClientSection
                  selectedClient={selectedClient}
                  onClearClient={() => setSelectedClient(null)}
                  onAddClient={() => setActiveDrawer("newClient")}
                >
                  <ClientSelectionContent
                    businessId={businessId}
                    isActive={open && !isMobile}
                    selectedClientId={selectedClient?.id ?? null}
                    onSelectClient={setSelectedClient}
                  />
                </CreateOwnClientClientSection>
              </Grid>

              <Grid
                size={7}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 4 }}>
                  <CreateOwnClientServicesSection
                    selectedVariants={selectedVariants}
                    onOpenSelect={() => setActiveDrawer("services")}
                    onRemoveVariant={handleRemoveVariant}
                  />
                </Stack>

                <Divider />

                <Stack spacing={3} sx={{ flexShrink: 0, p: 4 }}>
                  <CreateOwnClientDateTimeSection
                    selectedSlot={selectedSlot}
                    disabled={!canPickDateTime}
                    disabledLabel={dateTimeDisabledLabel}
                    hasError={selectedVariants.length === 0}
                    onOpenSelect={() => setActiveDrawer("dateTime")}
                    onClearSlot={() => setSelectedSlot(null)}
                    errorMessage={durationMismatchMessage}
                  />

                  <CreateOwnClientNotesSection value={notes} onChange={setNotes} />
                </Stack>
              </Grid>
            </Grid>

            <CreateOwnClientBottomBar
              totalPrice={totalPrice}
              totalDurationMinutes={totalDurationMinutes}
              isReadyToSave={isReadyToSave && !isSaving}
              onReset={handleReset}
              onConfirm={handleSave}
            />
          </>
        )}
      </Dialog>

      <SelectServicesPicker
        open={activeDrawer === "services"}
        businessId={businessId}
        employeeId={employeeId}
        providerUserId={providerUserId}
        selectedVariants={selectedVariants}
        onClose={() => setActiveDrawer(null)}
        onConfirm={handleChangeVariants}
      />

      <CreateClientDialog
        open={activeDrawer === "newClient"}
        businessId={businessId}
        onClose={() => setActiveDrawer(null)}
        onCreated={(client) => {
          setSelectedClient(client);
          setActiveDrawer(null);
        }}
      />

      {isMobile && (
        <>
          <SelectClientDrawer
            open={activeDrawer === "client"}
            businessId={businessId}
            selectedClientId={selectedClient?.id ?? null}
            onClose={() => setActiveDrawer(null)}
            onSelectClient={(client) => {
              setSelectedClient(client);
              setActiveDrawer(null);
            }}
          />

          {canPickDateTime && (
            <SelectDateTimeDrawer
              open={activeDrawer === "dateTime"}
              businessId={businessId}
              employeeId={employeeId}
              totalDurationMinutes={totalDurationMinutes}
              selectedSlot={selectedSlot}
              initialDay={initialDay}
              onClose={() => setActiveDrawer(null)}
              onSelectSlot={handleSelectSlot}
            />
          )}
        </>
      )}

      {!isMobile && (
        <>
          {canPickDateTime && (
            <SelectDateTimeModal
              open={activeDrawer === "dateTime"}
              businessId={businessId}
              employeeId={employeeId}
              totalDurationMinutes={totalDurationMinutes}
              selectedSlot={selectedSlot}
              initialDay={initialDay}
              onClose={() => setActiveDrawer(null)}
              onSelectSlot={handleSelectSlot}
            />
          )}
        </>
      )}
    </>
  );
};

export default CreateOwnClientModal;
