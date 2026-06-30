import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export const GET = async (req: NextRequest, context: RouteContext) => {
  const { businessId } = await context.params;

  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const employeeId = req.nextUrl.searchParams.get("employeeId");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Parametrii 'startDate' și 'endDate' sunt obligatorii." },
      { status: 400 }
    );
  }

  const queryParams = new URLSearchParams();
  queryParams.append("start_date", startDate);
  queryParams.append("end_date", endDate);

  if (
    employeeId &&
    employeeId !== "null" &&
    employeeId !== "undefined" &&
    employeeId.trim() !== ""
  ) {
    queryParams.append("employee_id", employeeId);
  }

  const apiUrl = `/businesses/${businessId}/availability?${queryParams.toString()}`;

  try {
    const response = (
      await get<string[]>({
        url: apiUrl,
      })
    ).data;

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare la preluarea datelor." },
      { status: 500 }
    );
  }
};
