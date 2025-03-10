FROM node:23-alpine
WORKDIR /
COPY . .
RUN npm install
CMD ["node", "src/index.js"]
