import axios, { AxiosHeaders } from "axios";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/authOptions";
import { LOG } from "@/utils/logger";

const BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

const randomHex = () => crypto.randomBytes(8).toString("hex");

function isMultipart(req: NextRequest): boolean {
  return (req.headers.get("content-type") ?? "").includes("multipart/form-data");
}

// Backend-ul întoarce mereu {"detail": ...} pe eroare — îl trecem mai
// departe exact cum e, în loc să-l înlocuim cu un mesaj generic (gap
// documentat deja pentru toate cele trei client-uri: niciunul nu arăta
// până acum mesajul real userului).
function errorToResponse(error: unknown) {
  const axiosError = error as {
    response?: { status?: number; data?: unknown };
    message?: string;
  };

  const status = axiosError?.response?.status ?? 500;
  const body = axiosError?.response?.data ?? {
    detail: axiosError?.message ?? "A apărut o eroare neașteptată.",
  };

  LOG.error(`[backendProxy] ${status}: ${JSON.stringify(body)}`);
  return NextResponse.json(body, { status });
}

async function forwardJson(
  method: HttpMethod,
  path: string,
  req: NextRequest,
  session: Session
) {
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${session.accessToken}`,
    Language: "RO",
    "X-B3-SpanId": randomHex(),
    "X-B3-TraceId": randomHex(),
  });

  const params = Object.fromEntries(req.nextUrl.searchParams);
  const data = method === "get" ? undefined : await req.json().catch(() => undefined);

  const response = await axios.request({
    baseURL: BASE_URL!,
    url: path,
    method,
    params,
    data,
    headers,
  });

  return NextResponse.json(response.data, { status: response.status });
}

// Multipart nu trece prin axios — same reasoning ca la
// collect-business-gallery deja existent: axios nu calculează corect
// boundary-ul de multipart în acest runtime, fetch-ul nativ o face singur.
async function forwardMultipart(
  method: HttpMethod,
  path: string,
  req: NextRequest,
  session: Session
) {
  const formData = await req.formData();

  const beResponse = await fetch(`${BASE_URL}${path}${req.nextUrl.search}`, {
    method: method.toUpperCase(),
    headers: { Authorization: `Bearer ${session.accessToken}` },
    body: formData,
  });

  const payload = await beResponse.json().catch(() => ({}));
  return NextResponse.json(payload, { status: beResponse.status });
}

export async function forwardToBackend(
  method: HttpMethod,
  path: string,
  req: NextRequest
): Promise<NextResponse> {
  if (!BASE_URL) {
    LOG.error("[backendProxy] NEXT_PUBLIC_BE_BASE_ENDPOINT nu este configurat");
    return NextResponse.json(
      { detail: "Eroare tehnică de configurare." },
      { status: 500 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ detail: "Neautorizat" }, { status: 401 });
  }

  try {
    if (method !== "get" && isMultipart(req)) {
      return await forwardMultipart(method, path, req, session);
    }
    return await forwardJson(method, path, req, session);
  } catch (error) {
    return errorToResponse(error);
  }
}
