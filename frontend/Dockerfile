FROM node:22-bookworm-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY frontend/package.json ./frontend/

RUN pnpm --filter frontend install --frozen-lockfile

COPY frontend/ ./frontend/

ARG VITE_BACKEND_URL=http://localhost:4002
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN pnpm --filter frontend build

FROM nginx:alpine AS runner
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
