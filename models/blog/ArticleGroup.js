const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章分类名称
const ArticleGroupSchema = Schema({
    name: String, // 分类名称
    sort: Number // 分类排序
});

const ArticleGroup = mongoose.model('blog_article_group', ArticleGroupSchema)

const temp = new ArticleGroup({
    name: '生活',
    sort: 1
})

ArticleGroup.findOne({name:'生活'}).then((t)=>{
    if(!t){
        ArticleGroup.insertMany(temp).then((c)=>{
            console.log(c)
        })
    }
})

module.exports = ArticleGroup