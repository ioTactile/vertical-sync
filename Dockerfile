# Stage 1: Install dependencies and build the application
FROM node:20 AS builder

# Set working directory
WORKDIR /app

ARG BASE_URL
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG AWS_BUCKET_NAME
ARG AWS_BUCKET_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV BASE_URL=${BASE_URL}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DATABASE_URL=${DATABASE_URL}  
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
ENV AWS_BUCKET_REGION=${AWS_BUCKET_REGION}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy the prisma folder to make the schema available
COPY src/prisma ./src/prisma/

# Install dependencies
RUN npm install 

# Copy all source code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:20 AS production

# Set working directory
WORKDIR /app

ARG BASE_URL
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG AWS_BUCKET_NAME
ARG AWS_BUCKET_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV BASE_URL=${BASE_URL}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DATABASE_URL=${DATABASE_URL}  
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}  
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
ENV AWS_BUCKET_REGION=${AWS_BUCKET_REGION}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Copy only the necessary files from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/prisma ./src/prisma

# Create a script to display the variables
RUN echo '#!/bin/bash \n\
echo "=== Variables de base de données ===" \n\
echo "DB_NAME: $DB_NAME" \n\
echo "DB_USER: $DB_USER" \n\
echo "DB_PASSWORD: $DB_PASSWORD" \n\
echo "DATABASE_URL: $DATABASE_URL" \n\
echo "=================================" \n\
npm start' > /app/start.sh && chmod +x /app/start.sh


# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]