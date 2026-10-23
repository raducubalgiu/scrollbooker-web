import type { Metadata } from "next";
import DeactivateDeleteAccountModule from "@/components/modules/Marketplace/SettingsModule/DeactivateDeleteAccountModule";

export const metadata: Metadata = {
  title: "Dezactivează sau șterge contul",
};

export default function DeactivateDeleteAccountPage() {
  return <DeactivateDeleteAccountModule />;
}
