FROM node:8
# Userspace app directory
WORKDIR /usr/src/app
ENV DATABASE_URL="postgres://localhost:5432/nikhilkulkarni"
# Install dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 1337
CMD ["npm", "start"]