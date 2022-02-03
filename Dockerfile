FROM node:17.4.0-alpine3.15

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

EXPOSE 3030

CMD ["yarn", "start"]