"use client";

import { useState } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { buildCallUrl, buildWhatsappUrl } from "@/utils/contact-utils";
import ContactChoiceDialog from "./ContactChoiceDialog";

type ContactActionButtonProps = {
  instantBooking: boolean;
  contact: ContactInfo;
  onBookNow: () => void;
  bookLabel?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

const ContactActionButton = ({
  instantBooking,
  contact,
  onBookNow,
  bookLabel = "Rezervă acum",
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  sx = {},
}: ContactActionButtonProps) => {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const { phone, accepts_whatsapp, accepts_calls } = contact;

  const sxArray = Array.isArray(sx) ? sx : [sx];

  if (instantBooking) {
    return (
      <Button
        variant={variant}
        color={color}
        disableElevation
        fullWidth={fullWidth}
        size={size}
        onClick={onBookNow}
        sx={sx}
      >
        {bookLabel}
      </Button>
    );
  }

  if (!phone || (!accepts_whatsapp && !accepts_calls)) {
    return null;
  }

  if (accepts_whatsapp && accepts_calls) {
    return (
      <>
        <Button
          variant={variant}
          color={color}
          disableElevation
          fullWidth={fullWidth}
          size={size}
          onClick={() => setIsChoiceOpen(true)}
          sx={sx}
        >
          Contactează
        </Button>

        <ContactChoiceDialog
          open={isChoiceOpen}
          phone={phone}
          onClose={() => setIsChoiceOpen(false)}
        />
      </>
    );
  }

  if (accepts_whatsapp) {
    return (
      <Button
        variant="contained"
        disableElevation
        fullWidth={fullWidth}
        size={size}
        startIcon={<WhatsAppIcon />}
        component="a"
        href={buildWhatsappUrl(phone)}
        target="_blank"
        rel="noopener noreferrer"
        sx={[styles.whatsappButton, ...sxArray]}
      >
        WhatsApp
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      color={color}
      disableElevation
      fullWidth={fullWidth}
      size={size}
      startIcon={<CallIcon />}
      component="a"
      href={buildCallUrl(phone)}
      sx={sx}
    >
      Sună
    </Button>
  );
};

export default ContactActionButton;

const styles = {
  whatsappButton: {
    bgcolor: "whatsapp.main",
    color: "common.white",
    "&:hover": {
      bgcolor: "whatsapp.main",
      filter: "brightness(0.92)",
    },
  },
};
