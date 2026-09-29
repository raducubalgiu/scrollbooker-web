import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GetStartedModule from "@/components/modules/GetStartedModule/GetStartedModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("getStarted");

  return {
    title: t("metaTitle"),
  };
}

export default async function GetStartedPage() {
  return <GetStartedModule />;
}
