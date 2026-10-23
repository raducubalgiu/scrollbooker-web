import type { Metadata } from "next";
import AccountInfoModule from "@/components/modules/Marketplace/SettingsModule/AccountInfoModule";

export const metadata: Metadata = {
  title: "Informații Cont",
};

export default function AccountInfoPage() {
  return <AccountInfoModule />;
}
