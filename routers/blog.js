const express = require('express')
const router = express.Router()

const blog_editor = require('../models/blog/Editor')
const articles = require('../models/blog/Article')
const articleDetail = require('../models/blog/ArticleDetail')

// 获取作者信息
router.get('/getEditor', (req, res) => {
    blog_editor.findOne((err, result) => {
        // 后期需要修改为可以是本地图片，也可以是网络图片
        if (!result.avatar.startsWith('http')) {
            result.avatar = `/avatar/${result.avatar}`
        }
        res.json(result)
    })
})

// 获取文章信息
router.get('/getArticles', (req, res) => {
    articles.find((err, result) => {
        res.json(result)
    })
})

// 获取文章详细信息
router.get('/getArticleDetail', (req, res) => {
    const { _id } = req.query
    articleDetail.findOne({ articleId: _id }, (err, result) => {
        res.json(result)
    })
})

module.exports = router