FROM node:16

WORKDIR /usr/src/app

COPY package.json package-lock.json lerna.json tsconfig.base.json ./
ADD packages/dashboard-api ./packages/dashboard-api
ADD packages/dashboard-core ./packages/dashboard-core
RUN npm install
RUN npx lerna bootstrap
RUN npm run build

EXPOSE 4000

WORKDIR /usr/src/app/dashboard-api

CMD [ "npm", "run", "start" ]
