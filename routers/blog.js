const express = require('express')
const router = express.Router()

const blog_editor = require('../models/blog/Editor')
const articles = require('../models/blog/Article')
const articleDetail = require('../models/blog/ArticleDetail')
const blog_article_group = require('../models/blog/ArticleGroup')
const background_extend_link = require('../models/extend/ExtendLink')

// 获取作者信息
router.get('/getEditor', (req, res) => {
    blog_editor.findOne((err, result) => {
        // 后期需要修改为可以是本地图片，也可以是网络图片
        res.json(result)
    })
})

    // 获取文章信息
    .get('/getArticles', (req, res) => {
        articles.find((err, result) => {
            res.json(result)
        })
    })

    // 获取文章详细信息
    .get('/getArticleDetail', (req, res) => {
        const { _id } = req.query
        articleDetail.findOne({ articleId: _id }, (err, result) => {
            res.json(result)
        })
    })

    // 获取文章分类
    .get('/getArticleGroup', async (req, res) => {
        const result = await blog_article_group.find().sort('sort')
        res.send(result)
    })

    // 获取扩展链接
    .get('/getExtendLink', async (req, res) => {
        const result = await background_extend_link.find()
        res.send(result)
    })

module.exports = router