import type { Metadata } from "next";
import DisplayModule from "@/components/modules/Marketplace/SettingsModule/DisplayModule";

export const metadata: Metadata = {
  title: "Aspect",
};

export default function DisplayPage() {
  return <DisplayModule />;
}
