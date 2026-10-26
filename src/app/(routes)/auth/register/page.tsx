import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RegisterModule from "@/components/modules/AuthModule/RegisterModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("registerMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RegisterPage() {
  return <RegisterModule />;
}
