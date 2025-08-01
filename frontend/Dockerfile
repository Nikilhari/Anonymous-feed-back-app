# Dockerfile for building and serving the frontend application
FROM node:18 AS build
# Set working directory
WORKDIR /app
# Copy dependency files first
COPY package*.json ./
COPY .env
# Install dependencies
RUN npm install
# Copy the rest of the frontend code
COPY . .
# Build the frontend
RUN npm run build
# Use a lightweight web server to serve the frontend
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# Expose the frontend port
EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
