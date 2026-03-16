# Udemy-like Platform Starter (Next.js + TypeScript)

This project now follows your requested architecture and **does not use PHP**.

## Stack
- **Frontend/Backend:** Next.js (App Router) + TypeScript
- **Database:** PostgreSQL + Prisma
- **Caching/queues:** Redis (ready via `lib/redis.ts`)
- **Payments:** Stripe (ready via `lib/stripe.ts`)
- **Media/storage:** Mux + S3/CDN env placeholders included

## Connection type for DB
Use **URI** connection format in `DATABASE_URL`:

```env
DATABASE_URL=postgresql://postgres:Omodara4wife%24@db.qxchnkfmauykcywyhwwt.supabase.co:5432/postgres
```

> `%24` is URL-encoded `$` in password.

## Table naming rule
All database tables are mapped to the **`ud` schema** and names like `ud.course`, `ud.user`, etc.
- Prisma models use `@@schema("ud")` + `@@map("...")`.
- SQL bootstrap script creates tables as `ud.<name>`.

## Core modules scaffolded
- public landing page (`app/(marketing)/page.tsx`)
- API health endpoint (`app/api/health/route.ts`)
- courses endpoint (`app/api/courses/route.ts`)
- data layer (`lib/prisma.ts`, `lib/course-service.ts`)
- infra connectors (`lib/redis.ts`, `lib/stripe.ts`)
- database schema (`prisma/schema.prisma`, `database/schema.sql`)

## Quick start
```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Database setup options
### Option A: SQL bootstrap
Run `database/schema.sql` in your PostgreSQL instance.

### Option B: Prisma workflow
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Deployment note
This is a **single Next.js service** (frontend + backend together), so you do not need a separate `NEXT_PUBLIC_APP_URL` env var for split services.
Use one Render web service with Node runtime and run it with:

```bash
npm install && npm run build
npm run start
```
