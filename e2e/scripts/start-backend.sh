#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
BACKEND_DIR="${E2E_BACKEND_DIR:-$WEB_DIR/../scrollbooker-backend}"
PG_CONTAINER="${E2E_PG_CONTAINER:-postgres}"
PG_USER="${E2E_PG_USER:-radu}"
PG_PASSWORD="${E2E_PG_PASSWORD:-password}"
DB_NAME="${E2E_DB_NAME:-scroll_booker_e2e}"
OUTBOX="$WEB_DIR/e2e/.outbox/emails.jsonl"

docker exec "$PG_CONTAINER" psql -q -U "$PG_USER" -d postgres \
  -c "DROP DATABASE IF EXISTS $DB_NAME WITH (FORCE)" \
  -c "CREATE DATABASE $DB_NAME"
docker exec "$PG_CONTAINER" psql -q -U "$PG_USER" -d "$DB_NAME" -c "CREATE EXTENSION IF NOT EXISTS postgis"

mkdir -p "$(dirname "$OUTBOX")"
: > "$OUTBOX"

export ENVIRONMENT=e2e
export E2E_EMAIL_OUTBOX="$OUTBOX"
export DATABASE_URL="postgresql+asyncpg://$PG_USER:$PG_PASSWORD@127.0.0.1:5432/$DB_NAME"
export ALEMBIC_DATABASE_URL="$DATABASE_URL"
export ACCESS_TOKEN_EXPIRE_MINUTES=15
export CLIENT_ACTIVITY_JOB_ENABLED=false
export APP_BASE_URL="http://localhost:3001"
export ALLOWED_ORIGINS="http://localhost:3001"

cd "$BACKEND_DIR"
.venv/bin/python -m alembic upgrade head >/dev/null
exec .venv/bin/python -m uvicorn main:app --host 127.0.0.1 --port 8001
