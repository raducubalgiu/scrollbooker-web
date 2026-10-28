import type { Metadata } from "next";
import ReportProblemModule from "@/components/modules/Marketplace/SettingsModule/ReportProblemModule";

export const metadata: Metadata = {
  title: "Raportează o problemă",
};

export default function ReportAProblemPage() {
  return <ReportProblemModule />;
}
