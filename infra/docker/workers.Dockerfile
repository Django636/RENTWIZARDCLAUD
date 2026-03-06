FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/workers/ ./services/workers/
COPY infra/prisma/ ./infra/prisma/
RUN npm ci
RUN cd infra/prisma && npx prisma generate
RUN npx turbo build --filter=@rentwizard/workers

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/services/workers/dist ./dist
COPY --from=builder /app/services/workers/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3002
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
