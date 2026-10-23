import type { Metadata } from "next";
import DeleteAccountModule from "@/components/modules/Marketplace/SettingsModule/DeleteAccountModule";

export const metadata: Metadata = {
  title: "Șterge contul permanent",
};

export default function DeleteAccountPage() {
  return <DeleteAccountModule />;
}
