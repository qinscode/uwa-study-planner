# Build stage
FROM --platform=$TARGETPLATFORM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Enable Yarn Berry and set version
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM --platform=$TARGETPLATFORM node:20-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Install serve using npm
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Use non-root user
USER appuser

# Expose port
EXPOSE 3031

# Start the server
CMD ["serve", "-s", "build", "-l", "3031"]