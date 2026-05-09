import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { get } from "@/utils/requests";
import React from "react";

interface BookingPageProps {
  params: Promise<{
    businessId: string;
  }>;
  searchParams: Promise<{
    businessOwnerId: string;
    employeeId?: string;
  }>;
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const { businessId: rawBusinessId } = await params;
  const { businessOwnerId: rawOwnerId, employeeId: rawEmployeeId } =
    await searchParams;

  const businessId = Number(rawBusinessId);
  const businessOwnerId = Number(rawOwnerId);
  const employeeId = rawEmployeeId ? Number(rawEmployeeId) : null;

  if (Number.isNaN(businessId) || Number.isNaN(businessOwnerId)) {
    throw new Error(
      "Parametrii de identificare ai afacerii lipsesc sau sunt invalizi."
    );
  }

  let businessEmployees: BusinessEmployee[] = [];

  if (!employeeId) {
    try {
      const response = await get<BusinessEmployee[]>({
        url: `/businesses/owner/${businessOwnerId}/employees`,
      });
      businessEmployees = response.data;
    } catch (e) {
      throw new Error("Nu am putut încărca lista de specialiști.");
    }
  }

  return (
    <BookingModule
      businessId={businessId}
      businessOwnerId={businessOwnerId}
      employeeId={employeeId}
      businessEmployees={businessEmployees}
    />
  );
}
