import EmploymentRequestModule from "@/components/modules/Marketplace/EmploymentRequestModule/EmploymentRequestModule";
import { authOptions } from "@/lib/auth/authOptions";
import { EmploymentRequest } from "@/ts/models/booking/employmentRequest/EmploymentRequest";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";

interface EmploymentRequestPageProps {
  params: Promise<{
    employmentRequestId: string;
  }>;
}

export default async function EmploymentRequestPage({
  params,
}: EmploymentRequestPageProps) {
  const session = await getServerSession(authOptions);
  const { employmentRequestId } = await params;

  if (!employmentRequestId) {
    throw new Error("Employment Request Id is invalid");
  }

  const employmentRequestResponse = await get<EmploymentRequest>({
    url: `/employment-requests/${employmentRequestId}`,
  });

  const employmentRequest = employmentRequestResponse.data;

  if (!employmentRequest) {
    throw new Error("An error occured when fetching employment request");
  }

  if (employmentRequest.employee.id !== session?.user_id) {
    throw new Error("Session user id is different than employee id");
  }

  return <EmploymentRequestModule employmentRequest={employmentRequest} />;
}
