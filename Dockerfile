FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_BASE=/
ARG SITE_CONTACT_JSON
RUN npm test && npm run build && npm run lint
FROM node:22-bookworm-slim AS runner
WORKDIR /app
COPY --from=builder --chown=node:node /app /app
RUN mkdir /data && chown node:node /data
USER node
ENV NODE_ENV=production HOST=0.0.0.0 DEMO_MODE=off INQUIRY_DATA_FILE=/data/inquiries.sqlite
EXPOSE 3000
CMD ["node", "server/inquiries.mjs"]
