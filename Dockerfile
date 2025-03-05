# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first to take advantage of Docker's caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Set environment variable
ENV PORT=8080
ENV NODE_ENV=production

# Configure for WebSockets
ENV SOCKET_PROTOCOL=ws
ENV SOCKET_TRANSPORTS=websocket,polling

# Command to run the application
CMD ["node", "dist/server/index.js"] 