[TOC]

# 所有系统的总后台服务
**config/config.json必须自己手动创建，具体内容在下面有详细解释**
后端为mongodb
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
- routers的文件名，就是api的路由名称
- config.json放置所有配置信息（需要自己手动新建，在config文件夹下）
- uploads 作为上传文件系统
  - avatar  存放头像
  - articlesImg 存放文章图片
- static作为静态文件访问 

uploads相关文件夹，必须在config/dirlist.json注册。作用是第一次启动，自动创建文件夹

config.json
位置：**config/config.json**
分别为：数据库地址，本地服务端口，跨域的地址，协议地址
```
{
    "DBURL": "",
    "MY_PORT": "",
    "ORIGIN: "",
    "PROTOCOL": ""
}
```

用了缓存，不过目前先停用了，主要都是在本地测试，造成一些影响了

# utils创建了一些通用功能服务
- controlFileSystem.js
  - isNoFoundCreate：如果文件不存在，那就创建，因为在根目录中index引用，所以是相对于根目录
  - createDir：递归生成目录，应该可以多层创建
- utils.js
  - getIPAddress：获取本地ip地址，不过应该用不到了

## 博客系统后台服务提供
> 根路由：/api/blog

- getEditor：获取作者信息
- getArticles：获取文章列表
- getArticleDetail：获取文章详细信息
- getArticleGroup：获取文章分组
- getExtendLink：获取扩展链接

# 数据库字典
## blog

blog_articles

| 字段名称    | 类型    | 意义         |
| ----------- | ------- | ------------ |
| title       | String  | 文章标题     |
| date        | Date    | 发布日期     |
| group       | String  | 所在小组     |
| customerNum | Number  | 看过文章数量 |
| img         | String  | 文章图片     |
| desc        | String  | 描述         |
| isTop       | Boolean | 是否置顶     |

blog_editors

| 字段名称        | 类型    | 意义                           |
| --------------- | ------- | ------------------------------ |
| name            | String  | 名字                           |
| avatar          | String  | 头像地址（或者base64）         |
| socialContact   | Array   | 图标信息（存放对象数组sc_obj） |
| sc_obj.icon     | String  | 图标地址                       |
| sc_obj.iconfont | Boolean | 是否来自阿里图标库             |
| sc_obj.url      | String  | 具体地址                       |
| customerNum     | Number  | 总访问次数                     |

blog_article_details

| 字段名称  | 类型   | 意义                 |
| --------- | ------ | -------------------- |
| articleId | String | 关联blog_article的id |
| context   | String | markdown语法的文章   |

blog_article_groups

| 字段名称 | 类型   | 意义     |
| -------- | ------ | -------- |
| name     | String | 分类名称 |
| sort     | Number | 分类顺序 |


background_extend_links

| 字段名称 | 类型   | 意义     |
| -------- | ------ | -------- |
| name     | String | 链接名称 |
| url      | String | 链接地址 |

# 总后端系统
> 根路由：/api/all-background

- 这里有一个设置，如果路由为/private/开头的，将设置为私有api访问（不一定安全，这个以后再考虑，可能会把这个后台服务抽离出来新开一个服务）
- /private/getEditor：获取作者信息
- /private/updateEditor：更新作者信息，包含了文件上传功能
- /private/getArticles：获取文章信息功能
- /private/addArticle：添加文章信息，包含了文件上传功能
- /private/getArticleGroup：获取文章分类
- /private/addArticleGroup：添加文章分类
- /private/deleteArticleGroup：删除文章分类
- /getTimedTask：获取定时任务列表
- /private/changeTimedTask：改变定时任务是否启动
- /getNcov：获取病毒信息
- /getComputerInfo：获取计算机信息
  
**这里文件上传功能的文件夹，必须与config/dirlist.json中的配置一致**


# 使用第三方接口查询数据
**目录otherData为第三方接口汇聚**
## tianxing 天行接口数据
- index.js  获取第三方数据入库
  - getNcov：获取疫情数据
  - startGetNcov：开始获取疫情的定时任务
  - stopGetNcov：取消疫情的定时任务
- dealData.js 从第三方接口获取数据
  - getNcovData：获取疫情数据，入库或者更新操作

## 系统数据接口
- system/index.js 获取服务器相关信息
  - computerInfo打包后的信息

# 触发循环事件
- config/timedTask.js 公共事件名称
每次启动服务，默认不触发事件循环
- timedTask/index.js：定时任务的集成，有点类似react-redux的做法
通过闭包，触发循环事件，以便以可以随时停止任务


## 字典
  
timed_tasks

| 字段名称 | 类型    | 意义           |
| -------- | ------- | -------------- |
| name     | String  | 定时任务名称   |
| desc     | String  | 定时任务描述   |
| flag     | Boolean | 定时器是否开启 |