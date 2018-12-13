FROM node:8
# Userspace app directory
WORKDIR /usr/src/app
# Install dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 1337
CMD ["npm", "start"]