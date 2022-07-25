FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN chmod -R 777 /usr/src
RUN yarn
RUN chmod -R 777 /usr/src

COPY . .

ENV NODE_ENV production

EXPOSE 4002

CMD [ "yarn", "dd" ]

USER node
