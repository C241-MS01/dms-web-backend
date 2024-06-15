FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev
RUN chown -R node:node /app

USER node

ENTRYPOINT [ "sh", "-c", "npm run migrate && npm start" ]