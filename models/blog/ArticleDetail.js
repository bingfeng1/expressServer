const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章的model
const ArticleDetailSchema = Schema({
    articleId: String,    //文章id
    context: String,    //详细内容
});

const ArticleDetail = mongoose.model('blog_article_detail', ArticleDetailSchema)

module.exports = ArticleDetail