# Use an appropriate base image for your application
FROM node:14

# Set a working directory
WORKDIR /app

# Copy your LoopBack server code into the container
COPY . .

# Install dependencies for both the server and client
RUN npm install

# Expose the necessary ports (e.g., 3000 for LoopBack server and 4200 for a frontend client)
EXPOSE 3000
EXPOSE 3001

# Define the command to start both the server and client (you may need to adjust this based on your project structure)
CMD ["npm", "start"]

