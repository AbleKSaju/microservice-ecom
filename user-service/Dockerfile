FROM node:21.2.0

WORKDIR /index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]