# AI Mock Interview Dashboard

A production-ready, full-stack AI-powered mock interview platform built with Next.js, Clerk authentication, Neon/Postgres, Drizzle ORM, and Tailwind CSS.

## Features
- Secure, user-specific dashboard with Clerk JWT authentication
- Neon/Postgres backend with Drizzle ORM
- Create, store, and manage mock interviews per user
- Dynamic stats: interviews completed, practice time, average score, success rate, achievements
- All authentication and DB logic handled server-side
- Clean, modern UI with Tailwind CSS
- No test/dev code or duplicate UI

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Clerk API keys and JWT template (see Clerk docs)
   - Neon/Postgres database URL

3. **Run database migrations:**
   - Use Drizzle or your preferred migration tool to create tables (`user`, `mockInterview`, `userAnswer`)

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage
- Sign in with Clerk
- Create a new interview using the "New Interview" button
- View your stats, achievements, and recent interviews on the dashboard
- Start and complete mock interviews, track your progress

## Tech Stack
- Next.js (App Router)
- Clerk (Authentication)
- Neon/Postgres (Database)
- Drizzle ORM
- Tailwind CSS
- Gemini AI API

## Project Structure
- `app/` — Next.js app, API routes, dashboard, interview pages
- `utils/` — DB schema, Drizzle config, helpers
- `components/` — UI components

## Deployment
Deploy easily on Vercel, Railway, or your preferred platform. Ensure all environment variables are set in production.

---

Built with ❤️ for seamless, AI-powered interview practice.
