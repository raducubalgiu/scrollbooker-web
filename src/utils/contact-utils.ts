import { ContactInfo } from "@/ts/models/user/ContactInfo";

const normalizeToE164Digits = (phone: string): string => {
  const trimmed = phone.replace(/[^\d+]/g, "");

  if (trimmed.startsWith("+")) return trimmed.slice(1);
  if (trimmed.startsWith("0")) return `40${trimmed.slice(1)}`;
  return trimmed;
};

export const buildWhatsappUrl = (phone: string): string =>
  `https://wa.me/${normalizeToE164Digits(phone)}`;

export const buildCallUrl = (phone: string): string =>
  `tel:+${normalizeToE164Digits(phone)}`;

export type ContactActionInfo = {
  title: string;
  isWhatsAppStyled: boolean;
  isVisible: boolean;
  onClick: () => void;
};

export const getContactActionInfo = (
  contact: ContactInfo,
  onOpenContactSheet: () => void
): ContactActionInfo => {
  const { phone, accepts_whatsapp, accepts_calls } = contact;

  if (!phone || (!accepts_whatsapp && !accepts_calls)) {
    return { title: "", isWhatsAppStyled: false, isVisible: false, onClick: () => {} };
  }

  if (accepts_whatsapp && accepts_calls) {
    return {
      title: "Contactează",
      isWhatsAppStyled: false,
      isVisible: true,
      onClick: onOpenContactSheet,
    };
  }

  if (accepts_whatsapp) {
    return {
      title: "Contactează",
      isWhatsAppStyled: true,
      isVisible: true,
      onClick: () => {
        window.open(buildWhatsappUrl(phone), "_blank", "noopener,noreferrer");
      },
    };
  }

  return {
    title: "Sună",
    isWhatsAppStyled: false,
    isVisible: true,
    onClick: () => {
      window.location.href = buildCallUrl(phone);
    },
  };
};
