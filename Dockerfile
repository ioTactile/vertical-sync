# Stage 1: Install dependencies and build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy the prisma folder to make the schema available
COPY src/prisma ./src/prisma/

# Install dependencies
RUN npm install 

# Copy all source code into the container
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV BASE_URL=https://vertical-sync.iotactile.com
ENV DB_NAME=vertical_sync_db
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/vertical_sync_db
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_Y2xlcmsudmVydGljYWwtc3luYy5pb3RhY3RpbGUuY29tJA
ENV CLERK_SECRET_KEY=sk_live_HQoqMBXPFxF2CuFW0KLBvSwRRZSzSp8ElLFnmnlqUs
ENV AWS_BUCKET_NAME=vertical-sync
ENV AWS_BUCKET_REGION=eu-west-3
ENV AWS_ACCESS_KEY_ID=AKIAQNWNNK2I5DCHLBVL
ENV AWS_SECRET_ACCESS_KEY=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

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/prisma ./src/prisma

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]