import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";
import React from "react";

interface BookingPageProps {
  params: {
    businessId: string;
  };
  searchParams: {
    employeeId?: string;
  };
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const businessId = await Number(params?.businessId);
  const employeeId = (await searchParams?.employeeId)
    ? Number(searchParams?.employeeId)
    : null;

  if (Number.isNaN(businessId)) {
    return <div>Invalid params</div>;
  }

  return <BookingModule businessId={businessId} userId={employeeId} />;
}
