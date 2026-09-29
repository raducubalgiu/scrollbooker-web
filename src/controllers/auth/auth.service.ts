import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";
import { map } from "lodash";
import { LOG } from "@/utils/logger";
import { AuthTokens, UserInfo, UserRegister } from "@/ts/models/auth/auth";
import { Permission } from "@/ts/models/user/Permission";

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

export type DecodedAccessToken = {
  id: number;
  sub: string;
  fullname: string;
  email: string;
  role: string;
  exp: number;
};

export async function registerWithCredentials(
  registerPayload: UserRegister
): Promise<AuthTokens | null> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/register`,
      registerPayload
    );
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

    return null;
  }
}

export async function loginWithCredentials(
  username: string,
  password: string
): Promise<AuthTokens | null> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/login`,
      new URLSearchParams({ username, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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

    return null;
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
  refreshToken: string
): Promise<AuthTokens> {
  const response = await axios.post<AuthTokens>(`${BACKEND_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  });
  return response.data;
}

export async function signInWithGoogle(
  idToken: string,
  roleName?: string
): Promise<AuthTokens | null> {
  try {
    const response = await axios.post<AuthTokens>(
      `${BACKEND_URL}/auth/google`,
      {
        id_token: idToken,
        role_name: roleName,
      }
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
