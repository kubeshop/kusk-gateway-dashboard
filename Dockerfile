# build environment
FROM node:16.14-buster as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
ARG REACT_APP_API_ENDPOINT=http://localhost:8080/api
RUN echo "REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT" >> .env
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]