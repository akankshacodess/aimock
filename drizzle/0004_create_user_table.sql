CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" varchar NOT NULL UNIQUE,
  "interviewIds" text DEFAULT '[]'
);
