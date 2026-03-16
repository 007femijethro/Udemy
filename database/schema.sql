CREATE SCHEMA IF NOT EXISTS ud;

CREATE TABLE IF NOT EXISTS ud."user" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ud.instructor_profile (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL REFERENCES ud."user" (id),
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ud.course (
  id SERIAL PRIMARY KEY,
  instructor_id TEXT NOT NULL REFERENCES ud.instructor_profile (id),
  title VARCHAR(140) NOT NULL,
  subtitle VARCHAR(220) NOT NULL,
  description TEXT,
  category VARCHAR(80) NOT NULL,
  price_usd NUMERIC(6,2) NOT NULL,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO ud."user" (id, email, full_name)
VALUES ('user_seed_1', 'instructor@udplatform.dev', 'Sarah Lane')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ud.instructor_profile (id, user_id, bio)
VALUES ('inst_seed_1', 'user_seed_1', 'Senior software instructor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ud.course (instructor_id, title, subtitle, description, category, price_usd, rating, is_published)
VALUES
('inst_seed_1', 'Next.js for Beginners', 'Build production-grade full-stack apps', 'Hands-on Next.js + PostgreSQL project', 'Development', 49.99, 4.80, TRUE),
('inst_seed_1', 'Mastering PostgreSQL', 'Schema design, indexing and performance', 'Advanced SQL for marketplace products', 'Databases', 59.99, 4.90, TRUE),
('inst_seed_1', 'Stripe for SaaS & Marketplaces', 'Payments, subscriptions, and webhooks', 'End-to-end billing integrations', 'Payments', 44.99, 4.70, TRUE)
ON CONFLICT DO NOTHING;
