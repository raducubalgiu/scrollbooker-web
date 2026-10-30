export const maskedPhone = (phone: string) => {
  if (phone.length <= 6) return phone;
  const prefix = phone.slice(0, 3);
  const suffix = phone.slice(-3);
  const maskLength = Math.max(phone.length - 6, 3);
  return `${prefix}${"*".repeat(maskLength)}${suffix}`;
};

export const maskedEmail = (email: string) => {
  const parts = email.split("@");
  const local = parts[0];
  const domain = parts[1];
  if (!local || !domain || local.length <= 2) return email;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
};
