FROM node
WORKDIR /data
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install pm2 -g
EXPOSE 9000
CMD pm2 start index.js --watch