import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ForgotPasswordModule from "@/components/modules/AuthModule/ForgotPasswordModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("forgotPasswordMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordModule />;
}
