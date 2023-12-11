# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy frontend package.json and package-lock.json to the working directory
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code to the container
COPY . .

# Build the frontend application (adjust this command based on your frontend build setup)
RUN npm run build

# Expose the port your frontend app runs on (if applicable)
EXPOSE 3000

# Define the command to start your frontend server (adjust based on your setup)
CMD ["npm", "start"]
