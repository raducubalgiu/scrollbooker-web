import { Client } from "pg";
import { E2E_DATABASE_URL } from "./env";

export type StoredSession = {
  id: string;
  platform: string;
  device_name: string | null;
  revoked_reason: string | null;
  rotated: boolean;
  active: boolean;
};

async function query<T>(sql: string, params: unknown[]): Promise<T[]> {
  const client = new Client({ connectionString: E2E_DATABASE_URL });
  await client.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    await client.end();
  }
}

export async function markUserValidated(email: string) {
  await query(
    "UPDATE users SET is_validated = true, registration_step = NULL WHERE email = $1",
    [email],
  );
}

export async function grantSuperAdmin(email: string, permissionCode: string) {
  await query(
    `UPDATE users SET role_id = (SELECT id FROM roles WHERE name::text = 'SUPER_ADMIN')
      WHERE email = $1`,
    [email],
  );
  await query(
    `INSERT INTO permissions (name, code) VALUES ($1, $1)
     ON CONFLICT (code) DO NOTHING`,
    [permissionCode],
  );
  await query(
    `INSERT INTO role_permissions (role_id, permission_id)
     SELECT r.id, p.id FROM roles r, permissions p
      WHERE r.name::text = 'SUPER_ADMIN' AND p.code = $1
     ON CONFLICT DO NOTHING`,
    [permissionCode],
  );
}

export async function sessionsOf(email: string): Promise<StoredSession[]> {
  return query<StoredSession>(
    `SELECT s.id, s.platform, s.device_name, s.revoked_reason,
            s.rotated_at IS NOT NULL AS rotated,
            (s.revoked_at IS NULL AND s.expires_at > now()) AS active
       FROM user_sessions s
       JOIN users u ON u.id = s.user_id
      WHERE u.email = $1
      ORDER BY s.created_at`,
    [email],
  );
}

export async function activeSessionsOf(email: string) {
  return (await sessionsOf(email)).filter((session) => session.active);
}
