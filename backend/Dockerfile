FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json ./backend/

RUN pnpm --filter backend install --frozen-lockfile

COPY backend/ ./backend/

RUN pnpm --filter backend build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json ./backend/
RUN pnpm --filter backend install --prod --frozen-lockfile

COPY --from=build /app/backend/dist ./backend/dist
COPY backend/src/database/drizzle/migrations ./backend/src/database/drizzle/migrations

WORKDIR /app/backend
EXPOSE 4002

CMD ["sh", "-c", "node dist/database/drizzle/migrate.js && node dist/main"]
