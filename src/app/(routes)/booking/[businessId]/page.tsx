import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";

import { get } from "@/utils/requests";
import React from "react";
import { BookingFlow } from "@/ts/models/booking/booking/BookingFlow";

interface BookingPageProps {
  params: Promise<{
    businessId: string;
  }>;
  searchParams: Promise<{
    businessOwnerId: string;
    employeeId?: string;
    selectedServiceId?: string;
  }>;
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const { businessId: rawBusinessId } = await params;
  const {
    businessOwnerId: rawOwnerId,
    employeeId: rawEmployeeId,
    selectedServiceId: rawSelectedServiceId,
  } = await searchParams;

  const businessId = Number(rawBusinessId);
  const businessOwnerId = Number(rawOwnerId);
  const employeeId = rawEmployeeId ? Number(rawEmployeeId) : null;

  const selectedServiceId = rawSelectedServiceId
    ? Number(rawSelectedServiceId)
    : null;

  if (Number.isNaN(businessId) || Number.isNaN(businessOwnerId)) {
    throw new Error(
      "Parametrii de identificare ai afacerii lipsesc sau sunt invalizi."
    );
  }

  const response = await get<BookingFlow>({
    url: `/businesses/${businessId}/booking?${employeeId}`,
  });

  const bookingFlow = response.data;

  return (
    <BookingModule
      bookingFlow={bookingFlow}
      businessId={businessId}
      businessOwnerId={businessOwnerId}
      employeeId={employeeId}
      selectedServiceId={selectedServiceId}
    />
  );
}
