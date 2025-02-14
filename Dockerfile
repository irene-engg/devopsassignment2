# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (if needed, e.g., for TypeScript or React)
# RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
