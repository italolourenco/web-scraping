FROM node:12-alpine

WORKDIR /server

COPY . /server
RUN npm install

EXPOSE 5000
CMD [ "npm", "start" ]