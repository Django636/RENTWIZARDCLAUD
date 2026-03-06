# RentWizard – Mini-Hausverwaltung

> Property management monorepo – NestJS / Next.js / React Native / PostgreSQL / Prisma.

---

## Erster Start – Frische Maschine Runbook

### Voraussetzungen

- Node.js >= 20, npm >= 10
- Docker + Docker Compose
- Git

### Checkliste (in dieser Reihenfolge)

```bash
# 1. Repo klonen
git clone <repo-url> rentwizard && cd rentwizard

# 2. Infrastruktur starten (Postgres, Redis, MinIO, MailHog)
docker compose up -d

# 3. Dependencies installieren (+ automatisches prisma generate via postinstall)
npm install

# 4. .env anlegen
cp .env.example .env

# 5. Datenbank-Schema anwenden
npm run db:migrate

# 6. Testdaten laden
npm run db:seed

# 7. Alles starten
npm run dev
```

### Erreichbare Services

| Service       | URL                              |
|---------------|----------------------------------|
| API           | http://localhost:3001/api        |
| Health        | http://localhost:3001/api/health |
| Swagger       | http://localhost:3001/api/docs   |
| Web App       | http://localhost:3000            |
| Mobile        | Expo auf :19006                  |
| MinIO UI      | http://localhost:9001            |
| MailHog       | http://localhost:8025            |
| Prisma Studio | `npm run db:studio`              |

### Test-Accounts (Passwort: `Test1234!`)

| Rolle      | E-Mail                        |
|-----------|-------------------------------|
| Owner     | owner@rentwizard.local        |
| Manager   | manager@rentwizard.local      |
| Tenant    | mieter1@rentwizard.local      |
| Tenant 2  | mieter2@rentwizard.local      |
| Contractor| handwerker@rentwizard.local   |

### Smoke Test

```bash
curl http://localhost:3001/api/health
# {"status":"ok","timestamp":"...","services":{"database":"up"}}

npm test
# runs health.controller.spec.ts + any future tests
```

---

## Projektstruktur

```
rentwizard/
├── apps/web/             # Next.js 14 – Vermieter-Dashboard
├── apps/mobile/          # React Native + Expo – Mieter/Handwerker
├── packages/core/        # Shared types, Zod schemas, SLA config
├── packages/ui/          # Cross-platform UI components
├── packages/api-client/  # Typed HTTP client
├── services/api/         # NestJS – REST + WebSocket API
├── services/workers/     # BullMQ – SLA Timer, Background Jobs
├── infra/prisma/         # Prisma schema, migrations, seed
├── infra/docker/         # Production Dockerfiles
└── .github/workflows/    # CI Pipeline
```

## Scripts

```bash
npm run dev              # Alle Services starten
npm run build            # Alles bauen
npm run typecheck        # TypeScript pruefen (repo-weit)
npm run lint             # Linting (repo-weit)
npm test                 # Tests (repo-weit)
npm run db:migrate       # Prisma migrate dev
npm run db:seed          # Testdaten laden
npm run db:generate      # Prisma Client generieren
npm run db:validate      # Schema validieren
npm run db:studio        # Prisma Studio oeffnen
```

Einzelne Workspaces: `npx turbo dev --filter=@rentwizard/api`

---

## Deployment

### Staging / Production

| Komponente | Plattform              | Env-Variablen                                                      |
|-----------|------------------------|---------------------------------------------------------------------|
| Database  | Supabase (Postgres)    | `DATABASE_URL` (connection pooler URL)                              |
| Storage   | Supabase Storage / S3  | `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET`        |
| API       | Railway                | `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `S3_*`, `API_PORT=3001`  |
| Workers   | Railway                | `DATABASE_URL`, `REDIS_URL`                                         |
| Redis     | Railway (Redis)        | `REDIS_URL`                                                         |
| Web       | Vercel                 | `NEXT_PUBLIC_API_URL=https://api.rentwizard.io`                     |

### Railway (API)

Build: `npm ci && cd infra/prisma && npx prisma generate && npx turbo build --filter=@rentwizard/api`
Start: `cd services/api && node dist/main.js`

### Vercel (Web)

Root: `apps/web`
Build: `cd ../.. && npm ci && npx turbo build --filter=@rentwizard/web`

---

## ENV Validation

Der API-Server validiert beim Start alle Pflicht-Variablen via Zod.
Fehlt eine Variable, beendet sich der Prozess mit klarer Fehlermeldung.

## Tech Stack

NestJS 10, Prisma 6, PostgreSQL 16, Redis 7, BullMQ, Next.js 14, React 18, TailwindCSS, TanStack Query, React Native, Expo 52, Jotai, TypeScript 5.6, Zod, Turborepo, Docker, S3/MinIO, Socket.io, GitHub Actions CI.
