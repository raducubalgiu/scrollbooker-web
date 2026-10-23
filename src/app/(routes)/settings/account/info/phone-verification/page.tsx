import type { Metadata } from "next";
import PhoneVerificationModule from "@/components/modules/Marketplace/SettingsModule/PhoneVerificationModule";

export const metadata: Metadata = {
  title: "Verifică numărul de telefon",
};

export default function PhoneVerificationPage() {
  return <PhoneVerificationModule />;
}
