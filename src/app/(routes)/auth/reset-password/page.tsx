import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResetPasswordModule from "@/components/modules/AuthModule/ResetPasswordModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resetPasswordMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ResetPasswordPage() {
  return <ResetPasswordModule />;
}
