[TOC]

# 所有系统的总后台服务
注意：由于对于docker的功能不熟悉，所以这里只进行了简单的部署
```
// 通过docker pull 拉取node和mongo，目前只需要这两个东西，而且我这边是armv7架构，所以mongo不能使用最新的了
docker pull node
docker pull andresvidal/rpi3-mongodb3

// 连接使用mongodb
docker run -p 27017:27017 -v /home/pi/docker/mongo/db:/data/db --name docker_mongodb -d fc

// 启动后，使用 docker exec -it 进入mongo
// 通过mongo 进入数据库，创建响应的数据库，用户名密码即可
```
在本项目中，使用dockerfile，进行docker部署
```
FROM node
WORKDIR /data
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install pm2 -g
EXPOSE 9000
CMD pm2 start index.js --watch
```
```
docker build -t express:v2 .
docker run -itd -p 9000:9000 -v /home/pi/Desktop/expressServer/:/data --name="express-app2" express:v2 /bin/bash

// 进入bash后，通过pm2 start index.js --watch启动
pm2 start index.js --max-memory-restart 500M --watch
```



规则：
- 所有ajax请求的路由，必须带有 /api ，为了与以后正式发布的静态页面防冲突
- config.json放置所有配置信息
- uploads 作为上传文件系统
- static作为静态文件访问 

## 博客系统后台服务提供
> 根路由：/api/blog

- getEditor：获取作者信息
- getArticles：获取文章列表
- getArticleDetail：获取文章详细信息

# 数据库字典
## blog

blog_article

| 字段名称    | 类型    | 意义           |
| ----------- | ------- | -------------- |
| title       | String  | //文章标题     |
| date        | Date    | //发布日期     |
| group       | String  | //所在小组     |
| customerNum | Number  | //看过文章数量 |
| img         | String  | //文章图片     |
| desc        | String  | //描述         |
| isTop       | Boolean | //是否置顶     |

blog_editor
| 字段名称        | 类型    | 意义                           |
| --------------- | ------- | ------------------------------ |
| name            | String  | // 名字                        |
| avatar          | String  | // 头像地址（或者base64）      |
| socialContact   | Array   | 图标信息（存放对象数组sc_obj） |
| sc_obj.icon     | String  | // 图标地址                    |
| sc_obj.iconfont | Boolean | //是否来自阿里图标库           |
| sc_obj.url      | String  | //具体地址                     |
| customerNum     | Number  | // 总访问次数                  |

blog_article_detail
| 字段名称  | 类型   | 意义                 |
| --------- | ------ | -------------------- |
| articleId | String | 关联blog_article的id |
| context   | String | markdown语法的文章   |
