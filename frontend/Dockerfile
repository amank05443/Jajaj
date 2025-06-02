# Use official Node.js image as base image
FROM node:22.14.0

# Set working directory in the container
WORKDIR /app

# Copy React app files
COPY . /app/

RUN npm install

# Expose port for React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]