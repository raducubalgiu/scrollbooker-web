import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";
import { map } from "lodash";
import { LOG } from "@/utils/logger";
import { AuthTokens, UserInfo, UserRegister } from "@/ts/models/auth/auth";
import { Permission } from "@/ts/models/user/Permission";
import { browserDeviceHeaders } from "@/lib/auth/deviceHeaders";

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

type DeviceHeaders = Record<string, string>;

export type DecodedAccessToken = {
  id: number;
  sub: string;
  fullname: string;
  email: string;
  role: string;
  exp: number;
};

function extractBackendDetail(error: unknown): string | undefined {
  const axiosError = error as { response?: { data?: { detail?: unknown } } };
  const detail = axiosError?.response?.data?.detail;
  return typeof detail === "string" ? detail : undefined;
}

// Register deschide o sesiune pe backend, dar web-ul se loghează imediat din nou prin NextAuth, deci aceasta ar rămâne orfană.
async function endRegistrationSession(accessToken: string) {
  await axios
    .post(`${BACKEND_URL}/auth/logout`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .catch(() => undefined);
}

export async function registerWithCredentials(
  registerPayload: UserRegister
): Promise<AuthTokens> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/register`,
      registerPayload,
      { headers: browserDeviceHeaders() }
    );
    await endRegistrationSession(response.data.access_token);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: unknown };
    };

    if (axiosError?.response) {
      LOG.error(
        `Register request failed: status=${axiosError.response.status}, data=${JSON.stringify(
          axiosError.response.data
        )}`
      );
    } else {
      LOG.error(
        `Register Error: ${error instanceof Error ? error.message : "unknown error"}`
      );
    }

    throw new Error(extractBackendDetail(error) ?? "generic");
  }
}

export async function loginWithCredentials(
  username: string,
  password: string,
  deviceHeaders?: DeviceHeaders
): Promise<AuthTokens> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/login`,
      new URLSearchParams({ username, password }),
      {
        headers: {
          ...deviceHeaders,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: unknown };
    };

    if (axiosError?.response) {
      LOG.error(
        `Login request failed: status=${axiosError.response.status}, data=${JSON.stringify(
          axiosError.response.data
        )}`
      );
    } else {
      LOG.error(
        `Login Error: ${error instanceof Error ? error.message : "unknown error"}`
      );
    }

    throw new Error(extractBackendDetail(error) ?? "generic");
  }
}

export async function verifyAccessToken(
  token: string
): Promise<DecodedAccessToken | null> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & DecodedAccessToken;

    if (!decoded.id || !decoded.role) {
      LOG.error("Invalid token or missing User id or Role");
      return null;
    }

    return decoded;
  } catch (err) {
    LOG.error(`JWT verification failed, ${err}`);
    return null;
  }
}

export async function fetchUserPermissions(token: string): Promise<string[]> {
  const response: AxiosResponse<Permission[]> = await axios.get(
    `${BACKEND_URL}/auth/user-permissions`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return map(response.data, "code");
}

export async function fetchUserInfo(token: string): Promise<UserInfo> {
  const response = await axios.get<UserInfo>(`${BACKEND_URL}/auth/user-info`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function refreshAccessToken(
  refreshToken: string,
  deviceHeaders?: DeviceHeaders
): Promise<AuthTokens> {
  const response = await axios.post<AuthTokens>(
    `${BACKEND_URL}/auth/refresh`,
    { refresh_token: refreshToken },
    { headers: deviceHeaders ?? {} }
  );
  return response.data;
}

export async function signInWithGoogle(
  idToken: string,
  roleName?: string,
  deviceHeaders?: DeviceHeaders
): Promise<AuthTokens | null> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/google`,
      {
        id_token: idToken,
        role_name: roleName,
      },
      { headers: deviceHeaders ?? {} }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: unknown };
    };
    LOG.error(
      `Google auth request failed: status=${axiosError?.response?.status}, data=${JSON.stringify(
        axiosError?.response?.data
      )}`
    );
    return null;
  }
}
