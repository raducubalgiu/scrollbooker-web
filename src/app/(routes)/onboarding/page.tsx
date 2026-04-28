import OnboardingModule from "@/components/modules/Onboarding/OnboardingModule";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  return <OnboardingModule session={session} />;
}
