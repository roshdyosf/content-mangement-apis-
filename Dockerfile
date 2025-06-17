# Use the official Node.js image based on Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy .env to ensure DATABASE_URL is available during build
COPY .env ./

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5008

# Expose the app's port
EXPOSE 5008
# Generate Swagger JSON before starting the app
CMD ["npm", "run", "start"]
