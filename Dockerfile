FROM node:18-buster-slim
WORKDIR /usr/app

ARG API_URL
ENV API_URL=$API_URL

COPY ./ ./

RUN yarn install
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]
