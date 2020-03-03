FROM node
COPY . ./data
WORKDIR /data
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
EXPOSE 9000
CMD node index.js
