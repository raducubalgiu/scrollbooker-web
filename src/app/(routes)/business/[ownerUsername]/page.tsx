import BusinessProfileModule from "@/components/modules/Marketplace/BusinessProfileModule/BusinessProfileModule";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { get } from "@/utils/requests";
import React from "react";

interface BusinessProfilePageProps {
  params: { ownerUsername: string };
}

export default async function BusinessProfilePage({
  params,
}: BusinessProfilePageProps) {
  const { ownerUsername } = await Promise.resolve(params);

  const profile = (
    await get<BusinessProfile | null>({
      url: `/businesses/${ownerUsername}/profile`,
    })
  ).data;

  return <BusinessProfileModule profile={profile} />;
}
