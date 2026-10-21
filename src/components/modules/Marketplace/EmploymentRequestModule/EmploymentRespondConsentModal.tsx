"use client";

import Modal from "@/components/core/Modal/Modal";
import ConsentLayout from "@/components/cutomized/MainLayout/ConsentLayout";
import { useGetConsentByName } from "@/controllers/nomenclature/consent.controller";
import { ConsentEnum } from "@/ts/models/nomenclatures/consent/ConsentEnum";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

type EmploymentRespondConsentModalProps = {
  open: boolean;
  isLoadingAccept: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function EmploymentRespondConsentModal({
  open,
  isLoadingAccept,
  onClose,
  onAccept,
}: EmploymentRespondConsentModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: consent, isLoading } = useGetConsentByName({
    consentName: ConsentEnum.EMPLOYMENT_REQUESTS_ACCEPTANCE,
    isEnabled: open,
  });

  const sections = consent?.text?.split(/\n(?=\d+\. )/);

  return (
    <Modal
      title="Termeni și condiții"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      customFooter={
        <Stack spacing={1.5} width="100%">
          <FormControlLabel
            label="Am citit și sunt de acord cu condițiile de mai sus."
            control={
              <Checkbox
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
              />
            }
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              disabled={isLoadingAccept}
              loading={isLoadingAccept}
              sx={{ fontWeight: 600, width: { xs: "100%", sm: "auto" } }}
            >
              Renunță
            </Button>

            <Button
              variant="contained"
              disableElevation
              onClick={onAccept}
              disabled={isLoading}
              loading={isLoadingAccept}
              sx={{ fontWeight: 600, width: { xs: "100%", sm: "auto" } }}
            >
              Acceptă
            </Button>
          </Stack>
        </Stack>
      }
    >
      <ConsentLayout
        mainTitle="Acceptare cerere angajare"
        sections={sections ?? []}
        isLoading={isLoading}
        hideAcknowledgement
      />
    </Modal>
  );
}
