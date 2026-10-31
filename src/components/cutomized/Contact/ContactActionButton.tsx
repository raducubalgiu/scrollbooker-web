"use client";

import { useState } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { getContactActionInfo } from "@/utils/contact-utils";
import { useRecordContactClick } from "@/controllers/social/engagement.controller";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";
import ContactChoiceDialog from "./ContactChoiceDialog";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type ContactActionButtonProps = {
  instantBooking: boolean;
  contact: ContactInfo;
  onBookNow: () => void;
  userId: number | null;
  businessId: number | null;
  source: EngagementSourceEnum;
  bookLabel?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "neutral";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

const ContactActionButton = ({
  instantBooking,
  contact,
  onBookNow,
  userId,
  businessId,
  source,
  bookLabel = "Rezervă acum",
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  sx = {},
}: ContactActionButtonProps) => {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const { mutate: recordContactClick } = useRecordContactClick();

  if (instantBooking) {
    return (
      <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
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
      </Protected>
    );
  }

  const handleTrackClick = (clickType: ContactClickTypeEnum) => {
    if (userId === null || businessId === null) return;
    recordContactClick({ userId, businessId, clickType, source });
  };

  const contactAction = getContactActionInfo(
    contact,
    () => setIsChoiceOpen(true),
    handleTrackClick
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
          onTrackClick={handleTrackClick}
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
