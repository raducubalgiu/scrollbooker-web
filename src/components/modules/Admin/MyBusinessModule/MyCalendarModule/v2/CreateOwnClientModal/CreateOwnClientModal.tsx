"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import dayjs from "@/lib/dayjs";
import { useMutate } from "@/hooks/useHttp";
import { AppointmentBusinessClientCreate } from "@/ts/models/booking/appointment/Appointment";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import CreateOwnClientClientSection from "./client/CreateOwnClientClientSection";
import CreateOwnClientServicesSection from "./services/CreateOwnClientServicesSection";
import CreateOwnClientDateTimeSection from "./dateTime/CreateOwnClientDateTimeSection";
import CreateOwnClientNotesSection from "./notes/CreateOwnClientNotesSection";
import CreateOwnClientColorSection from "./color/CreateOwnClientColorSection";
import { CalendarColorEnum } from "@/ts/enums/CalendarColorEnum";
import CreateClientDialog from "./client/CreateClientDialog";
import SelectClientDialog from "./client/SelectClientDialog";
import CreateOwnClientMobileHeader from "./layout/CreateOwnClientMobileHeader";
import SelectDateTimeDrawer from "./dateTime/SelectDateTimeDrawer";
import SelectServicesPicker from "./services/SelectServicesPicker";
import SelectDateTimeModal from "./dateTime/SelectDateTimeModal";
import CreateOwnClientMinimalHeader from "./layout/CreateOwnClientMinimalHeader";
import CreateOwnClientBottomBar from "./layout/CreateOwnClientBottomBar";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { SelectedSlot, SelectedVariant } from "./createOwnClientTypes";
import { useSession } from "next-auth/react";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import CreateOwnClientEmployeeSection from "./employee/CreateOwnClientEmployeeSection";
import SelectEmployeeDialog from "./employee/SelectEmployeeDialog";

type CreateOwnClientModalProps = {
  open: boolean;
  businessId: number;
  providerUserId: number | null;
  employeeId: number | undefined;
  initialSlot?: CalendarEventsSlot | null;
  onClose: () => void;
  onCreated: () => void;
};

type ActiveDrawer =
  | "client"
  | "newClient"
  | "employee"
  | "services"
  | "dateTime"
  | null;

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
  onCreated,
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
  const [color, setColor] = useState<CalendarColorEnum | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const { data: session } = useSession();
  const canChooseEmployee = !!session?.has_employees && !session?.is_employee;

  const { data: employees, isLoading: isLoadingEmployees } =
    useGetAllEmployeesByOwner({
      businessOwnerId: session?.business_owner_id ?? 0,
      isEnabled: open && canChooseEmployee && !!session?.business_owner_id,
    });

  const selectedEmployee =
    employees?.find((employee) => employee.id === selectedEmployeeId) ?? null;
  const effectiveProviderId = canChooseEmployee
    ? selectedEmployee?.id ?? null
    : providerUserId;
  const availabilityEmployeeId = canChooseEmployee
    ? selectedEmployee?.id
    : employeeId;
  const step = (base: number) => (canChooseEmployee ? base + 1 : base);

  useEffect(() => {
    if (!open) return;
    setSelectedClient(null);
    setSelectedVariants([]);
    setNotes("");
    setColor(null);
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
    setSelectedEmployeeId(providerUserId);
  }, [open, initialSlot, providerUserId]);

  const handleReset = () => {
    setSelectedClient(null);
    setSelectedVariants([]);
    setNotes("");
    setColor(null);
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
    setSelectedEmployeeId(providerUserId);
  };

  const handleSelectEmployee = (employee: BusinessEmployee) => {
    if (employee.id !== selectedEmployeeId) {
      setSelectedEmployeeId(employee.id);
      setSelectedVariants([]);
      setSelectedSlot(null);
    }
    setActiveDrawer(null);
  };

  const servicesDisabledMessage =
    canChooseEmployee && !selectedEmployee
      ? "Alege mai întâi angajatul, ca să vezi serviciile lui."
      : null;

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
    selectedVariants.length > 0 && effectiveProviderId !== null;

  const dateTimeDisabledLabel =
    selectedVariants.length === 0
      ? "Selectează mai întâi serviciile"
      : "Alege mai întâi angajatul";

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
          onCreated();
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

    if (!effectiveProviderId) {
      toast.error("Alege mai întâi angajatul.");
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
      user_id: effectiveProviderId,
      business_client_id: selectedClient.id,
      color,
      product_variants: selectedVariants.map((variant) => ({
        id: variant.variantId,
        offering: { user_id: effectiveProviderId },
      })),
    });
  };

  const handleRemoveVariant = (variantId: number) => {
    setSelectedVariants((prev) =>
      prev.filter((v) => v.variantId !== variantId)
    );
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

              {canChooseEmployee && (
                <CreateOwnClientEmployeeSection
                  step={2}
                  selectedEmployee={selectedEmployee}
                  onOpenSelect={() => setActiveDrawer("employee")}
                />
              )}

              <CreateOwnClientServicesSection
                step={step(2)}
                selectedVariants={selectedVariants}
                disabledMessage={servicesDisabledMessage}
                onOpenSelect={() => setActiveDrawer("services")}
                onRemoveVariant={handleRemoveVariant}
              />

              <CreateOwnClientDateTimeSection
                step={step(3)}
                selectedSlot={selectedSlot}
                disabled={!canPickDateTime}
                disabledLabel={dateTimeDisabledLabel}
                hasError={selectedVariants.length === 0}
                onOpenSelect={() => setActiveDrawer("dateTime")}
                onClearSlot={() => setSelectedSlot(null)}
                errorMessage={durationMismatchMessage}
              />

              <CreateOwnClientNotesSection
                step={step(4)}
                value={notes}
                onChange={setNotes}
              />

              <CreateOwnClientColorSection
                step={step(5)}
                value={color}
                onChange={setColor}
              />
            </Stack>
          </>
        ) : (
          <>
            <CreateOwnClientMinimalHeader
              title="Programare nouă"
              onClose={onClose}
            />

            <Grid container sx={{ flex: 1, overflow: "hidden" }}>
              <Grid size={6} sx={[styles.column, styles.leftColumn]}>
                <Stack spacing={3.5}>
                  <CreateOwnClientClientSection
                    selectedClient={selectedClient}
                    onOpenSelect={() => setActiveDrawer("client")}
                    onClearClient={() => setSelectedClient(null)}
                    onAddClient={() => setActiveDrawer("newClient")}
                  />

                  {canChooseEmployee && (
                    <CreateOwnClientEmployeeSection
                      step={2}
                      selectedEmployee={selectedEmployee}
                      onOpenSelect={() => setActiveDrawer("employee")}
                    />
                  )}

                  <CreateOwnClientServicesSection
                    step={step(2)}
                    selectedVariants={selectedVariants}
                    disabledMessage={servicesDisabledMessage}
                    onOpenSelect={() => setActiveDrawer("services")}
                    onRemoveVariant={handleRemoveVariant}
                  />
                </Stack>
              </Grid>

              <Grid size={6} sx={styles.column}>
                <Stack spacing={3.5}>
                  <CreateOwnClientDateTimeSection
                    step={step(3)}
                    selectedSlot={selectedSlot}
                    disabled={!canPickDateTime}
                    disabledLabel={dateTimeDisabledLabel}
                    hasError={selectedVariants.length === 0}
                    onOpenSelect={() => setActiveDrawer("dateTime")}
                    onClearSlot={() => setSelectedSlot(null)}
                    errorMessage={durationMismatchMessage}
                  />

                  <CreateOwnClientNotesSection
                    step={step(4)}
                    value={notes}
                    onChange={setNotes}
                  />

                  <CreateOwnClientColorSection
                    step={step(5)}
                    value={color}
                    onChange={setColor}
                  />
                </Stack>
              </Grid>
            </Grid>

            <CreateOwnClientBottomBar
              totalPrice={totalPrice}
              totalDurationMinutes={totalDurationMinutes}
              isReadyToSave={isReadyToSave && !isSaving}
              isLoading={isSaving}
              onReset={handleReset}
              onConfirm={handleSave}
            />
          </>
        )}
      </Dialog>

      <SelectServicesPicker
        open={activeDrawer === "services"}
        businessId={businessId}
        employeeId={availabilityEmployeeId}
        providerUserId={effectiveProviderId}
        selectedVariants={selectedVariants}
        onClose={() => setActiveDrawer(null)}
        onConfirm={handleChangeVariants}
      />

      {canChooseEmployee && (
        <SelectEmployeeDialog
          open={activeDrawer === "employee"}
          employees={employees ?? []}
          isLoading={isLoadingEmployees}
          selectedEmployeeId={selectedEmployeeId}
          onSelect={handleSelectEmployee}
          onClose={() => setActiveDrawer(null)}
        />
      )}

      <SelectClientDialog
        open={activeDrawer === "client"}
        businessId={businessId}
        selectedClientId={selectedClient?.id ?? null}
        onClose={() => setActiveDrawer(null)}
        onSelectClient={(client) => {
          setSelectedClient(client);
          setActiveDrawer(null);
        }}
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
          {canPickDateTime && (
            <SelectDateTimeDrawer
              open={activeDrawer === "dateTime"}
              businessId={businessId}
              employeeId={availabilityEmployeeId}
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
              employeeId={availabilityEmployeeId}
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

const styles = {
  column: {
    height: "100%",
    overflowY: "auto",
    p: 4,
  },
  leftColumn: {
    borderRight: "1px solid",
    borderColor: "divider",
  },
};
