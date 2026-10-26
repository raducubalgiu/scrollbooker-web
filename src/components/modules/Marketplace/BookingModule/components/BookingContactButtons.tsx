"use client";

import { Button, Stack, SxProps, Theme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";
import { useRecordContactClick } from "@/controllers/social/engagement.controller";
import { buildWhatsappUrl, buildCallUrl } from "@/utils/contact-utils";

type BookingContactButtonsProps = {
  contact: ContactInfo;
  userId: number | null;
  businessId: number | null;
  source?: EngagementSourceEnum;
  onTrackClick?: (clickType: ContactClickTypeEnum) => void;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
};

const BookingContactButtons = ({
  contact,
  userId,
  businessId,
  source = EngagementSourceEnum.OTHER,
  onTrackClick,
  size = "medium",
  sx = {},
}: BookingContactButtonsProps) => {
  const { mutate: recordContactClick } = useRecordContactClick();
  const { phone, accepts_whatsapp, accepts_calls } = contact;

  if (!phone || (!accepts_whatsapp && !accepts_calls)) return null;

  const trackClick = (clickType: ContactClickTypeEnum) => {
    if (onTrackClick) {
      onTrackClick(clickType);
      return;
    }
    if (userId === null || businessId === null) return;
    recordContactClick({ userId, businessId, clickType, source });
  };

  const handleWhatsapp = () => {
    trackClick(ContactClickTypeEnum.WHATSAPP);
    window.open(buildWhatsappUrl(phone), "_blank", "noopener,noreferrer");
  };

  const handleCall = () => {
    trackClick(ContactClickTypeEnum.CALL);
    window.location.href = buildCallUrl(phone);
  };

  return (
    <Stack direction="row" spacing={1.5} sx={sx}>
      {accepts_whatsapp && (
        <Button
          variant="contained"
          disableElevation
          startIcon={<WhatsAppIcon />}
          onClick={handleWhatsapp}
          size={size}
          sx={[styles.actionButton, styles.whatsappButton]}
        >
          WhatsApp
        </Button>
      )}

      {accepts_calls && (
        <Button
          variant="contained"
          color={accepts_whatsapp ? "secondary" : "primary"}
          disableElevation
          startIcon={<CallIcon />}
          onClick={handleCall}
          size={size}
          sx={styles.actionButton}
        >
          Sună
        </Button>
      )}
    </Stack>
  );
};

export default BookingContactButtons;

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
};
