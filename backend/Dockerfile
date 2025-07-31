# Use Node.js official base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
