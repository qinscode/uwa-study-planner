# Build stage
FROM --platform=$TARGETPLATFORM node:20-alpine as builder

WORKDIR /app

# Enable Corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

# First copy only package files to leverage Docker cache
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM --platform=$TARGETPLATFORM node:20-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Install serve package globally
RUN yarn global add serve

# Copy built assets from builder stage
COPY --from=builder /app/build ./build

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port that matches Vite preview configuration
EXPOSE 3031

# Use node directly to run serve for better compatibility
CMD ["node", "/usr/local/bin/serve", "-s", "build", "-l", "3031"] 