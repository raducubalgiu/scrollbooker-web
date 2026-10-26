"use client";

import { useState } from "react";
import { Button, Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { getContactActionInfo } from "@/utils/contact-utils";
import ContactChoiceDialog from "@/components/cutomized/Contact/ContactChoiceDialog";

type PostContactActionsProps = {
  contact: ContactInfo;
  onOpenServices: () => void;
  onContactClick: (clickType: ContactClickTypeEnum) => void;
};

const PostContactActions = ({
  contact,
  onOpenServices,
  onContactClick,
}: PostContactActionsProps) => {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const contactAction = getContactActionInfo(
    contact,
    () => setIsChoiceOpen(true),
    onContactClick
  );

  return (
    <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
      {contactAction.isVisible && (
        <Button
          variant="contained"
          disableElevation
          size="small"
          startIcon={contactAction.isWhatsAppStyled ? <WhatsAppIcon /> : undefined}
          onClick={contactAction.onClick}
          sx={[
            styles.actionButton,
            contactAction.isWhatsAppStyled && styles.whatsappButton,
          ]}
        >
          {contactAction.title}
        </Button>
      )}

      <Button
        variant="contained"
        disableElevation
        size="small"
        onClick={onOpenServices}
        sx={[styles.actionButton, styles.pricesButton]}
      >
        Prețuri
      </Button>

      {contact.phone && (
        <ContactChoiceDialog
          open={isChoiceOpen}
          phone={contact.phone}
          onClose={() => setIsChoiceOpen(false)}
          onTrackClick={onContactClick}
        />
      )}
    </Stack>
  );
};

export default PostContactActions;

const styles = {
  actionButton: {
    flex: 1,
    minWidth: 0,
  },
  whatsappButton: {
    bgcolor: "whatsapp.main",
    color: "common.white",
    "&:hover": {
      bgcolor: "whatsapp.main",
      filter: "brightness(0.92)",
    },
  },
  pricesButton: {
    bgcolor: "common.white",
    color: "common.black",
    "&:hover": {
      bgcolor: "common.white",
      filter: "brightness(0.95)",
    },
  },
};
