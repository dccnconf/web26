# syntax=docker/dockerfile:experimental
FROM node:alpine

# Install yarn
RUN apk add yarn

# Install PM2 globally
RUN npm install --global pm2

# Set the working directory
WORKDIR /app

# Copy yarn files
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN yarn install --production

# No volume is shared here - copy required files:
COPY ./src ./src
COPY ./public ./public
COPY ./data ./data
COPY *.config.js ./

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build app
RUN npm run build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Start development server (source is expected to be bind-mounted), see compose
CMD ["yarn", "start"]
