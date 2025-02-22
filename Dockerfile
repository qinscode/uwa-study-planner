# Build stage
FROM --platform=$TARGETPLATFORM node:20-alpine as builder

WORKDIR /app

# Enable Corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

# First copy only package files to leverage Docker cache
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies and serve package
RUN yarn install --immutable && \
    yarn global add serve

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM --platform=$TARGETPLATFORM node:20-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only the built assets and serve binary from builder
COPY --from=builder /app/build ./build
COPY --from=builder /usr/local/share/.config/yarn/global/node_modules/serve /usr/local/lib/node_modules/serve
RUN ln -s /usr/local/lib/node_modules/serve/bin/serve.js /usr/local/bin/serve

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port that matches Vite preview configuration
EXPOSE 3031

# Use serve directly since we copied it from builder stage
CMD ["serve", "-s", "build", "-l", "3031"] 