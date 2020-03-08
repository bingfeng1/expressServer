const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章的model
const ArticleSchema = Schema({
    title: String,    //文章标题
    date: Date,    //发布日期
    group: String,    //所在小组
    customerNum: {
        type: Number,
        default: 0
    },    //看过文章数量
    img: String,    //文章图片
    desc: String,    //描述
    isTop: Boolean,    //是否置顶
});

const Article = mongoose.model('blog_article', ArticleSchema)

module.exports = Article