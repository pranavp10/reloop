FROM node:23-alpine AS base

ENV NODE_ENV=production

WORKDIR /app

# =========================================================================== #

FROM base AS builder-base

ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=1

RUN corepack enable pnpm

# =========================================================================== #

FROM builder-base AS builder

COPY . .

# https://turbo.build/reloop/docs/guides/tools/docker#the-solution
RUN pnpm dlx turbo prune shield --docker

# =========================================================================== #

FROM builder-base AS installer

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm build

# =========================================================================== #

FROM base AS production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 shield

COPY --from=installer --chown=shield:nodejs /app/services/shield/dist /app/dist

USER shield

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --quiet --spider http://${HOST}:${PORT}/api/v1/shield/health || exit 1

CMD ["node", "/app/dist/index.js"]
