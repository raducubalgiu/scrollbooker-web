import BookingModule from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business"; // Importă DTO-ul
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

  try {
    const [employeesRes, summaryRes] = await Promise.all([
      !employeeId
        ? get<BusinessEmployee[]>({
            url: `/businesses/owner/${businessOwnerId}/employees`,
          })
        : Promise.resolve({ data: [] as BusinessEmployee[] }),

      get<BusinessBookingSummary>({
        url: `/booking/businesses/${businessId}/summary`,
      }),
    ]);

    return (
      <BookingModule
        businessId={businessId}
        businessOwnerId={businessOwnerId}
        employeeId={employeeId}
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
