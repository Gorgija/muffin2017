FROM node:boron
WORKDIR /usr/app/two/
COPY package.json .
COPY index.js .
RUN npm install
EXPOSE 4000
CMD [ "npm", "start" ]
