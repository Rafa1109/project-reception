FROM --platform=linux/amd64 node:latest as build
WORKDIR /usr/local/app/
COPY ./ /usr/local/app/
RUN npm install 
RUN npm run build

FROM --platform=linux/amd64 nginx:1.13 as builder
COPY --from=build /usr/local/app/dist/project-reception /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000
