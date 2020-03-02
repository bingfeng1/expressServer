const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章的model
const ArticleDetailSchema = Schema({
    articleId: String,    //文章id
    context: String,    //详细内容
});

const ArticleDetail = mongoose.model('blog_article_detail', ArticleDetailSchema)

// 模拟数据，以后需要删除
const article = new ArticleDetail({
    articleId:"5e5c7c1a20153637083db6e6",
    context:`# 我的博客
## 副标题`
})

ArticleDetail.findOne({ articleId: '5e5c7c1a20153637083db6e6' }).then(art => {
    if (!art) {
        article.save().then(result => {
            console.log(result)
        })
    }
})

module.exports = ArticleDetail