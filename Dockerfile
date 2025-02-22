# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Enable Corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

COPY . .
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve package
RUN yarn global add serve

# Copy built assets from builder stage
COPY --from=builder /app/build ./build

EXPOSE 5173

CMD ["serve", "-s", "build", "-l", "5173"] 