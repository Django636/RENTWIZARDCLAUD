FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/api/ ./services/api/
COPY infra/prisma/ ./infra/prisma/
RUN npm ci
RUN cd infra/prisma && npx prisma generate
RUN npx turbo build --filter=@rentwizard/api

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
COPY --from=builder /app/services/api/dist ./dist
COPY --from=builder /app/services/api/package.json ./
COPY --from=builder /app/node_modules ./node_modules
USER nestjs
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
