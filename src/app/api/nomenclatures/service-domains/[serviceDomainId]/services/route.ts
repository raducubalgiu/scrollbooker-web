import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Service } from "@/ts/models/nomenclatures/service/Service";

type ParamsType = {
  serviceDomainId: string;
};

export const GET = async (_: NextRequest, context: { params: ParamsType }) => {
  const serviceDomainId = context?.params?.serviceDomainId;

  if (
    !serviceDomainId ||
    serviceDomainId === "null" ||
    serviceDomainId === "undefined"
  ) {
    return NextResponse.json(
      { message: "serviceDomainId is required" },
      { status: 400 }
    );
  }

  const response = (
    await get<Service[]>({
      url: `/service-domains/${serviceDomainId}/services`,
    })
  ).data;

  return NextResponse.json(response);
};
