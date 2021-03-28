FROM node:14.15.5-alpine3.10

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

EXPOSE 3030

CMD ["yarn", "start"]