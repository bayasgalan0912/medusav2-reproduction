# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml .npmrc ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy the app's source code
COPY . .

# Build the Next.js app
RUN pnpm build

# Stage 2: Runner
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy runtime files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Create non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

# Expose port
EXPOSE 4000

# Start the app
CMD ["pnpm", "run", "start:prod"]
