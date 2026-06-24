import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";

import { get } from "@/utils/requests";
import React from "react";
import { BookingFlow } from "@/ts/models/booking/booking/BookingFlow";
import notFound from "@/app/not-found";

interface BookingPageProps {
  params: Promise<{
    businessId: string;
    businessOwnerId: string;
    userId: string;
  }>;
  searchParams: Promise<{
    source: string;
    product?: string;
  }>;
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const {
    businessId: rawBusinessId,
    businessOwnerId: rawBusinessOwnerId,
    userId: rawUserId,
  } = await params;
  const { product, source } = await searchParams;

  const businessId = Number(rawBusinessId);
  const businessOwnerId = Number(rawBusinessOwnerId);
  const userId = Number(rawUserId);

  if (
    Number.isNaN(businessId) ||
    Number.isNaN(businessOwnerId) ||
    Number.isNaN(userId) ||
    !source
  ) {
    notFound();
  }

  const selectedProductId = product ? Number(product) : null;
  const employeeId = businessOwnerId !== userId ? userId : null;

  const response = await get<BookingFlow>({
    url: `/businesses/${businessId}/booking${employeeId ? `?employeeId=${employeeId}` : ""}`,
  });

  return (
    <BookingModule
      bookingFlow={response.data}
      businessId={businessId}
      businessOwnerId={businessOwnerId}
      userId={userId}
      selectedProductId={selectedProductId}
    />
  );
}
