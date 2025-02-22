# Build stage
FROM --platform=$TARGETPLATFORM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM --platform=$TARGETPLATFORM node:20-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Install serve using pnpm
RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm add -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Use non-root user
USER appuser

# Expose port
EXPOSE 3031

# Start the server
CMD ["serve", "-s", "dist", "-l", "3031"]