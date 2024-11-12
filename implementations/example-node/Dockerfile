# Use Node 22 LTS Alpine image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and main.js to the working directory
COPY package.json package-lock.json main.js ./

# Install dependencies
RUN npm install

# Allow self-signed certificates
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Link the package
RUN npm link