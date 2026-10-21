"use client";

import { useState } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { getContactActionInfo } from "@/utils/contact-utils";
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

  const contactAction = getContactActionInfo(contact, () =>
    setIsChoiceOpen(true)
  );

  if (!contactAction.isVisible) {
    return null;
  }

  const sxArray = Array.isArray(sx) ? sx : [sx];

  return (
    <>
      <Button
        variant={variant}
        color={color}
        disableElevation
        fullWidth={fullWidth}
        size={size}
        startIcon={
          contactAction.isWhatsAppStyled ? <WhatsAppIcon /> : undefined
        }
        onClick={contactAction.onClick}
        sx={
          contactAction.isWhatsAppStyled
            ? [styles.whatsappButton, ...sxArray]
            : sx
        }
      >
        {contactAction.title}
      </Button>

      {contact.phone && (
        <ContactChoiceDialog
          open={isChoiceOpen}
          phone={contact.phone}
          onClose={() => setIsChoiceOpen(false)}
        />
      )}
    </>
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
