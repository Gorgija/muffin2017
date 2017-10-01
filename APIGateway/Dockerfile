FROM node:boron
WORKDIR /usr/src/app
COPY package.json .
COPY index.js .
RUN npm install
EXPOSE 3000
CMD ["/bin/sh"]
