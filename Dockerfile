# build environment
FROM node:16.14-buster as build
ARG SEGMENT_API_KEY
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
RUN REACT_APP_SEGMENT_API_KEY=${SEGMENT_API_KEY} npm run build

# production environment
FROM nginx:1.22.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]