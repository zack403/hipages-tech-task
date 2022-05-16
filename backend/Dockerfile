FROM node:16.15-alpine
RUN mkdir -p /svr/app
WORKDIR /svr/app
RUN npm i -g @nestjs/cli --silent
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
COPY . .

CMD ["npm", "start"]