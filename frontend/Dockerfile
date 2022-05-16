FROM node:16.15-alpine

WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build

CMD ["npm", "start"]