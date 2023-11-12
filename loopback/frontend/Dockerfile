FROM node:15.5.0

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","start"]