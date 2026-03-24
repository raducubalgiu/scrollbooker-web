import { NextRequest, NextResponse } from "next/server";
import { get, put } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";

export const GET = async () => {
  const user = await getUserServerSession();

  const response = (
    await get<SelectedServiceDomainWithServices[]>({
      url: `/businesses/${user?.businessId}/service-domains`,
    })
  ).data;

  return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
  const data: number[] = await req.json();

  const response = (
    await put({
      url: `/businesses/update-services`,
      data: { service_ids: data },
    })
  ).data;

  return NextResponse.json(response);
};
