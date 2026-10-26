import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RegisterBusinessModule from "@/components/modules/AuthModule/RegisterBusinessModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("registerBusinessMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RegisterBusinessPage() {
  return <RegisterBusinessModule />;
}
