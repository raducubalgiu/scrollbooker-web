import type { Metadata } from "next";
import AccountModule from "@/components/modules/Marketplace/SettingsModule/AccountModule";

export const metadata: Metadata = {
  title: "Cont",
};

export default function AccountPage() {
  return <AccountModule />;
}
