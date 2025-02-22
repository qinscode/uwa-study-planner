# Build stage
FROM node:20-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

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