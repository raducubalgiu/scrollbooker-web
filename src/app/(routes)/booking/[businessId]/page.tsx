import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import { get } from "@/utils/requests";
import React from "react";

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

  try {
    const [employeesRes, summaryRes] = await Promise.all([
      get<BusinessEmployee[]>({
        url: `/businesses/owner/${businessOwnerId}/employees`,
      }),

      get<BusinessBookingSummary>({
        url: `/booking/businesses/${businessId}/summary`,
      }),
    ]);

    return (
      <BookingModule
        businessId={businessId}
        businessOwnerId={businessOwnerId}
        employeeId={employeeId}
        selectedServiceId={selectedServiceId}
        businessEmployees={employeesRes.data}
        businessSummary={summaryRes.data}
      />
    );
  } catch (e) {
    console.error("Booking Page Error:", e);
    throw new Error(
      "Nu am putut încărca datele necesare pentru finalizarea rezervării."
    );
  }
}
