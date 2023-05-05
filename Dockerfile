FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:20-alpine AS production

ENV API_GATEWAY_SERVICE_PORT 3000
ENV AUTH_SERVICE_HOST 0.0.0.0
ENV AUTH_SERVICE_PORT 50051
ENV ACCOUNT_SERVICE_HOST 0.0.0.0
ENV ACCOUNT_SERVICE_PORT 50052
ENV GRPC_TRACE all
ENV GRPC_VERBOSITY debug

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]