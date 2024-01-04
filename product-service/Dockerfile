FROM node:21.2.0

WORKDIR /index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]