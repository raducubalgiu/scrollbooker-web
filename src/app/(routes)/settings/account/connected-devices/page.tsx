import type { Metadata } from "next";
import ConnectedDevicesModule from "@/components/modules/Marketplace/SettingsModule/ConnectedDevicesModule/ConnectedDevicesModule";

export const metadata: Metadata = {
  title: "Dispozitive conectate",
};

export default function ConnectedDevicesPage() {
  return <ConnectedDevicesModule />;
}
