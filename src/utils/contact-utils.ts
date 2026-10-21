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
