
# Use a lightweight, official Node image
FROM node:20-alpine AS base

#You should probably replace this
LABEL authors="Mess & Lucas"

# Set the working directory
WORKDIR /usr/src/app

# Copy package management files
COPY package*.json ./

# Install dependencies (use npm ci for reliable builds)
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose your application port
EXPOSE 7777

# Command to run your Backend
CMD ["npm","run","dev"]
