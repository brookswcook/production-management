FROM node:16-alpine AS build

WORKDIR /app
COPY package.json package-lock.json lerna.json tsconfig.base.json .eslintrc ./
ADD packages/dashboard-front-end ./packages/dashboard-front-end
ADD packages/dashboard-core ./packages/dashboard-core
RUN npm install
RUN npx lerna bootstrap
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/packages/dashboard-front-end/build .
COPY --from=build /app/packages/dashboard-front-end/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]