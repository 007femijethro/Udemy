# Udemy-like Website Starter (PHP + PostgreSQL)

This repository contains a minimal Udemy-style starter site built with PHP.

## What is included
- Home page with hero section and featured courses grid.
- `CourseRepository` to load courses from PostgreSQL.
- PDO connection helper that accepts either:
  - `DATABASE_URL` (URI style), or
  - separate `DB_*` environment variables.
- SQL schema + seed file using the `ud` schema and `ud.course` table.

## Quick start
1. Create or use a PostgreSQL database.
2. Run schema and seed script from `database/schema.sql`.
3. Copy `.env.example` to `.env` and set values.
4. Start PHP server:

```bash
php -S 0.0.0.0:8000 -t public
```

Open `http://localhost:8000`.

## DB connection type to use
Use **URI** (recommended) with a PostgreSQL connection string in `DATABASE_URL`:

```env
DATABASE_URL=postgresql://postgres:Omodara4wife%24@db.qxchnkfmauykcywyhwwt.supabase.co:5432/postgres
```

> Note: `%24` is the URL-encoded form of `$` in the password.

If your provider gives separate fields, you can use:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
