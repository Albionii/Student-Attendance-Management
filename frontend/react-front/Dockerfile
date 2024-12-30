# Use the official Node.js image from Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /frontend

# Copy the React frontend code into the container (adjust path if needed)
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the React app will use (default is 3000)
EXPOSE 5173

# Run the React development server
CMD ["npm", "run", "dev","--", "--host"]
