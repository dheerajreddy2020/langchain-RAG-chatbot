# Use an official Node.js runtime as the base image
FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have it)
COPY package*.json ./

# Install dependencies 
# The --no-audit and --silent flags can speed up the build in some cases
RUN npm ci --no-audit --silent

# Copy the rest of your application code
COPY . .

# Build your application (adjust the command if needed)
RUN npm run build

# Expose the port your app runs on (e.g., 3000 for React development server)
EXPOSE 3000

# Start your application (adjust the command if needed)
CMD ["npm", "start"]