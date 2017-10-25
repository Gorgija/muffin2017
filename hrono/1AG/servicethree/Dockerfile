FROM node:boron
WORKDIR /usr/app/three/
ENV TZ=Europa/Sofija
COPY package.json .
COPY index.js .
RUN npm install
EXPOSE 7000
CMD [ "npm", "start" ]

