# Use Node.js LTS as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["node", "dist/main.js"]
