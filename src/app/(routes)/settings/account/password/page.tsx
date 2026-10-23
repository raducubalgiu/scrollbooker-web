import type { Metadata } from "next";
import AccountPasswordModule from "@/components/modules/Marketplace/SettingsModule/AccountPasswordModule";

export const metadata: Metadata = {
  title: "Parolă",
};

export default function AccountPasswordPage() {
  return <AccountPasswordModule />;
}
