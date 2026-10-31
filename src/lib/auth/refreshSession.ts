import axios from "axios";
import { JWT } from "next-auth/jwt";
import {
  fetchUserInfo,
  fetchUserPermissions,
  refreshAccessToken,
  verifyAccessToken,
} from "@/controllers/auth/auth.service";

const REFRESH_AHEAD_MS = 60 * 1000;
const SESSION_ENDED_STATUSES = [400, 401, 403];

async function fetchSessionUser(accessToken: string): Promise<Partial<JWT>> {
  const [permissions, userInfo] = await Promise.all([
    fetchUserPermissions(accessToken),
    fetchUserInfo(accessToken),
  ]);

  return {
    user_id: userInfo.id,
    username: userInfo.username,
    profession: userInfo.profession,
    is_validated: userInfo.is_validated,
    registration_step: userInfo.registration_step,
    permissions: permissions,
    avatar: userInfo.avatar,
    business_id: userInfo.business_id,
    business_owner_id: userInfo.business_owner_id,
    business_type_id: userInfo.business_type_id,
    has_employees: userInfo.has_employees,
    instant_booking: userInfo.instant_booking,
    is_employee: userInfo.is_employee,
  };
}

export async function buildRefreshedJwt(
  refreshToken: string,
  deviceHeaders?: Record<string, string>
): Promise<Partial<JWT>> {
  const refreshed = await refreshAccessToken(refreshToken, deviceHeaders);

  const decoded = await verifyAccessToken(refreshed.access_token);
  if (!decoded?.exp) throw new Error("Invalid refreshed token");

  const tokens = {
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token,
    accessTokenExpires: decoded.exp * 1000,
  };

  // Backend-ul a rotit deja refresh token-ul, deci un eșec la user-info nu are voie să-l piardă.
  const user = await fetchSessionUser(refreshed.access_token).catch(() => ({}));
  return { ...user, ...tokens };
}

export function needsRefresh(token: JWT) {
  return (
    Boolean(token.refreshToken) &&
    token.accessTokenExpires - REFRESH_AHEAD_MS <= Date.now()
  );
}

export type RefreshOutcome =
  | { kind: "refreshed"; token: JWT }
  | { kind: "ended" }
  | { kind: "unavailable" };

export async function refreshSessionToken(
  token: JWT,
  deviceHeaders: Record<string, string>
): Promise<RefreshOutcome> {
  try {
    const refreshed = await buildRefreshedJwt(token.refreshToken, deviceHeaders);
    return { kind: "refreshed", token: { ...token, ...refreshed, error: undefined } };
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    if (status && SESSION_ENDED_STATUSES.includes(status)) {
      return { kind: "ended" };
    }
    return { kind: "unavailable" };
  }
}
