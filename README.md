[TOC]

# 所有系统的总后台服务
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
