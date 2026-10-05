# GymFlow 🏋️‍♂️

> Public exercise discovery and a static exercise library built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

The active app is public and static. Login, registration, personal tracking, persistence APIs, and offline data sync have been removed. The legacy Prisma/service source is not used by the public routes.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture & Layer Separation](#architecture--layer-separation)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Database Setup & Prisma](#database-setup--prisma)
- [Testing Guide](#testing-guide)
- [Coding Conventions for Agents](#coding-conventions-for-agents)

---

## Overview

GymFlow currently provides two public views: Discover and a bundled exercise library. Exercise data is served from local static datasets; the active app does not create accounts or save personal workout/profile data.

---

## Tech Stack

| Category                 | Technology                                                   |
| ------------------------ | ------------------------------------------------------------ |
| **Framework**            | Next.js 14+ (App Router, Server Components & Route Handlers) |
| **Language**             | TypeScript (Strict Mode with `noUncheckedIndexedAccess`)     |
| **Styling**              | Tailwind CSS + `tailwindcss-animate`                         |
| **UI Components**        | shadcn/ui + Radix UI primitives                              |
| **Validation**           | Zod (Runtime validation for env, API input, schemas)         |
| **Unit Testing**         | Vitest + React Testing Library + jsdom                       |
| **E2E Testing**          | Playwright (Mobile & Desktop browser profiles)               |
| **Formatting & Linting** | ESLint + Prettier + Prettier Tailwind Plugin                 |
| **PWA**                  | Web App Manifest + Service Worker foundation                 |

---

## Architecture & Layer Separation

The active application is a small public frontend:

1. **Presentation Layer (`src/components/`, `src/app/`)**:
   - Clean React components using shadcn/ui.
   - Client components handle UI state; Server Components handle data fetching.
   - **No direct business logic or Prisma calls in components.**

2. **Static Data (`src/data/`)**:
   - Bundled exercise entries power catalog browsing and filtering.

3. **Public Health Route (`src/app/api/health/`)**:
   - Reports application liveness without checking a user account or database.

---

## Folder Structure

```
GymFlow/
├── docs/                   # Architecture, Database, API, and Testing Specs
├── prisma/
│   └── schema.prisma       # Prisma models, enums, and relations
├── public/
│   ├── manifest.json       # PWA Web App Manifest
│   ├── sw.js               # Service Worker for offline support
│   └── icons/              # PWA app icons
├── src/
│   ├── app/                # App Router routes and layouts
│   │   ├── (app)/          # Public Discover and exercise-library pages
│   │   ├── api/health/     # Public application liveness endpoint
│   │   ├── globals.css     # Tailwind and theme styles
│   │   └── layout.tsx      # Root HTML layout with PWA metadata
│   ├── components/
│   │   ├── ui/             # shadcn/ui primitives (button, card, progress, etc.)
│   │   └── layout/         # Shell, header, mobile-nav, desktop sidebar
│   ├── constants/          # Named constants (activity factors, muscle groups, etc.)
│   ├── hooks/              # Reusable React hooks
│   ├── lib/
│   │   ├── db/             # Singleton Prisma client (prisma.ts)
│   │   ├── env.ts          # Zod environment variable validator
│   │   ├── errors/         # AppError class and handleApiError utility
│   │   ├── services/       # Legacy backend modules; not used by active routes
│   │   ├── utils/          # Pure functions and calculations
│   │   └── validations/    # Zod schemas (common, profile, routines, etc.)
│   └── types/              # Global TypeScript types (API, database, etc.)
├── tests/
│   ├── unit/               # Vitest unit tests for utils and components
│   ├── integration/        # Route handler and service integration tests
│   ├── e2e/                # Playwright end-to-end browser tests
│   └── setup.ts            # Vitest setup with jest-dom matchers
├── .env.example            # Environment variables template
├── .env.local              # Local environment variables
├── next.config.mjs         # Next.js configuration with security headers
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # Strict TypeScript configuration
├── vitest.config.ts        # Vitest configuration
├── playwright.config.ts    # Playwright configuration
├── AGENTS.md               # Mandatory agent rules and guidelines
└── package.json            # Dependencies and scripts
```

---

## Getting Started

### 1. Prerequisites

- **Node.js**: v18.18+ or v20+

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd GymFlow

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Starts Next.js development server                |
| `npm run build`         | Builds the production application                |
| `npm run start`         | Starts Next.js in production mode                |
| `npm run lint`          | Runs Next.js ESLint checks                       |
| `npm run typecheck`     | Runs TypeScript compiler checks (`tsc --noEmit`) |
| `npm run test`          | Runs all unit and integration tests with Vitest  |
| `npm run test:unit`     | Runs unit tests                                  |
| `npm run test:e2e`      | Runs Playwright end-to-end browser tests         |
| `npm run test:coverage` | Runs Vitest with v8 code coverage reporting      |
| `npm run format`        | Formats codebase with Prettier                   |
| `npm run format:check`  | Checks formatting with Prettier                  |

---

## Testing Guide

### Unit Tests

Unit tests use **Vitest** with `@testing-library/react` and `jsdom`. All pure utility calculation functions must maintain 100% branch coverage.

```bash
npm run test
```

### E2E Tests

E2E tests use **Playwright** with preconfigured mobile browser emulation (iPhone 14, Pixel 5) and desktop Chrome.

```bash
npm run test:e2e
```

---

## Coding Conventions for Agents

1. **Strict Types**: Never use `any` without documented justification.
2. **Deterministic Calculations**: Keep calculations in `src/lib/utils/`. AI must never be the source of truth for metrics.
3. **Public Data**: Active pages use bundled static data and do not collect or persist personal fitness records.
4. **Mobile-First CSS**: Use Tailwind classes that build up from mobile (`text-sm sm:text-base lg:text-lg`).
