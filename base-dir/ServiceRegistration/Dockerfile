FROM node:boron
WORKDIR /usr/app/two/
COPY index.js .
COPY package.json .
RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]

