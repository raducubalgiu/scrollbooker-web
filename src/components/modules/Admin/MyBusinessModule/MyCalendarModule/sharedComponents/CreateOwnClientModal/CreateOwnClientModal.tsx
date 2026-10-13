"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import AddProductHeader from "@/components/modules/Admin/MyBusinessModule/MyProductsModule/AddProductModal/AddProductHeader";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import CreateOwnClientClientSection from "./CreateOwnClientClientSection";
import CreateOwnClientServicesSection from "./CreateOwnClientServicesSection";
import CreateOwnClientDateTimeSection from "./CreateOwnClientDateTimeSection";
import SelectClientDrawer from "./SelectClientDrawer";
import SelectServicesDrawer from "./SelectServicesDrawer";
import SelectDateTimeDrawer from "./SelectDateTimeDrawer";
import SelectServicesModal from "./SelectServicesModal";
import CreateOwnClientMinimalHeader from "./CreateOwnClientMinimalHeader";
import CreateOwnClientBottomBar from "./CreateOwnClientBottomBar";
import ClientSelectionContent from "./ClientSelectionContent";
import { SelectedSlot, SelectedVariant } from "./createOwnClientTypes";

type CreateOwnClientModalProps = {
  open: boolean;
  businessId: number;
  initialSlot?: CalendarEventsSlot | null;
  onClose: () => void;
};

type ActiveDrawer = "client" | "services" | "dateTime" | null;

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

const CreateOwnClientModal = ({
  open,
  businessId,
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

  useEffect(() => {
    if (!open) return;
    setSelectedClient(null);
    setSelectedVariants([]);
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
  }, [open, initialSlot]);

  const handleReset = () => {
    setSelectedClient(null);
    setSelectedVariants([]);
    setSelectedSlot(slotFromCalendarEvent(initialSlot));
  };

  const totalDurationMinutes = selectedVariants.reduce(
    (sum, variant) => sum + variant.duration,
    0
  );
  const totalPrice = selectedVariants.reduce(
    (sum, variant) => sum + variant.priceWithDiscount,
    0
  );

  const isReadyToSave =
    !!selectedClient && selectedVariants.length > 0 && !!selectedSlot;

  const handleSave = () => {
    if (!isReadyToSave) {
      toast.error("Completează clientul, serviciile și intervalul.");
      return;
    }
    toast.info("Salvarea programării va fi disponibilă în curând.");
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
            <AddProductHeader
              title="Programare nouă"
              desktopSaveLabel="Salvează programarea"
              mobileSaveLabel="Creează programarea"
              isSavingProduct={false}
              onHandleClose={onClose}
              onReset={handleReset}
              onSaveProduct={handleSave}
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
              />

              <CreateOwnClientServicesSection
                selectedVariants={selectedVariants}
                onOpenSelect={() => setActiveDrawer("services")}
                onRemoveVariant={handleRemoveVariant}
              />

              <CreateOwnClientDateTimeSection
                selectedSlot={selectedSlot}
                disabled={selectedVariants.length === 0}
                onOpenSelect={() => setActiveDrawer("dateTime")}
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
                <Typography variant="subtitle1" fontWeight={700} mb={2}>
                  1. Client
                </Typography>
                <ClientSelectionContent
                  businessId={businessId}
                  isActive={open && !isMobile}
                  selectedClientId={selectedClient?.id ?? null}
                  onSelectClient={setSelectedClient}
                />
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

                <Stack sx={{ flexShrink: 0, p: 4 }}>
                  <CreateOwnClientDateTimeSection
                    selectedSlot={selectedSlot}
                    disabled={selectedVariants.length === 0}
                    onOpenSelect={() => setActiveDrawer("dateTime")}
                  />
                </Stack>
              </Grid>
            </Grid>

            <CreateOwnClientBottomBar
              totalPrice={totalPrice}
              totalDurationMinutes={totalDurationMinutes}
              isReadyToSave={isReadyToSave}
              onReset={handleReset}
              onConfirm={handleSave}
            />
          </>
        )}
      </Dialog>

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

          <SelectServicesDrawer
            open={activeDrawer === "services"}
            businessId={businessId}
            selectedVariants={selectedVariants}
            onClose={() => setActiveDrawer(null)}
            onConfirm={(variants) => {
              setSelectedVariants(variants);
              setActiveDrawer(null);
            }}
          />

          <SelectDateTimeDrawer
            open={activeDrawer === "dateTime"}
            selectedSlot={selectedSlot}
            totalDurationMinutes={totalDurationMinutes}
            onClose={() => setActiveDrawer(null)}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
              setActiveDrawer(null);
            }}
          />
        </>
      )}

      {!isMobile && (
        <SelectServicesModal
          open={activeDrawer === "services"}
          businessId={businessId}
          selectedVariants={selectedVariants}
          onClose={() => setActiveDrawer(null)}
          onConfirm={(variants) => {
            setSelectedVariants(variants);
            setActiveDrawer(null);
          }}
        />
      )}
    </>
  );
};

export default CreateOwnClientModal;
