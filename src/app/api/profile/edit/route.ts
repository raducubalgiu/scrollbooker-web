import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";

interface FastAPIValidationError {
  detail: string | Array<{ loc: string[]; msg: string; type: string }>;
}

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return NextResponse.json(
        { error: "Sesiune expirată sau utilizator neautorizat." },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const response = await axios.patch<unknown>(
      `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/users/user-info/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError<FastAPIValidationError>(error)) {
      console.error(
        "Eroare Axios în Route Handler:",
        error.response?.data || error.message
      );

      const backendError = error.response?.data?.detail;

      const errorMessage =
        typeof backendError === "string"
          ? backendError
          : "Eroare la actualizarea profilului pe server.";

      return NextResponse.json(
        { error: errorMessage },
        { status: error.response?.status || 500 }
      );
    }

    if (error instanceof Error) {
      console.error("Eroare generică în Route Handler:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "A apărut o eroare neașteptată." },
      { status: 500 }
    );
  }
};
