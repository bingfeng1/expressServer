const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章的model
const ArticleSchema = Schema({
    title: String,    //文章标题
    date: Date,    //发布日期
    group: String,    //所在小组
    customerNum: Number,    //看过文章数量
    img: String,    //文章图片
    desc: String,    //描述
    isTop: Boolean,    //是否置顶
});

const Article = mongoose.model('blog_article', ArticleSchema)

// 模拟数据，以后需要删除
const article = new Article({
    title: '我的博客',    //文章标题
    date: '2020-02-20',    //发布日期
    group: '生活',    //所在小组
    customerNum: 0,    //看过文章数量
    img: '',    //文章图片
    desc: 'abc',    //描述
    isTop: true,    //是否置顶
})

Article.findOne({ title: '我的博客' }).then(art => {
    if (!art) {
        article.save().then(result => {
            console.log(result)
        })
    }
})

module.exports = Article