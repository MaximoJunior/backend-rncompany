FROM node:18.17.1-alpine
WORKDIR /app
ADD . .
RUN npm install
CMD npm start