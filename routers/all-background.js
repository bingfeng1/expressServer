/**
 * 这是一个特殊的api，会包含其他页面中的models
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
// const { getIPAddressPort } = require('../utils/utils')
// 与blog_editor使用同一个model
const blog_editor = require('../models/blog/Editor')
const blog_articles = require('../models/blog/Article')
const blog_articleDetail = require('../models/blog/ArticleDetail')
const blog_article_group = require('../models/blog/ArticleGroup')
const { deleteImgFile } = require('../utils/ctrlfs')

// 文件上传内容设置
const upload = (dirname) => {
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.resolve(__dirname, '..', 'uploads', dirname))
            },
            filename: function (req, file, cb) {
                const { imgName } = req.body
                cb(null, imgName)
            }
        })
    })
}


// 设置所有增删改权限，只能在本地192.168.1的网段上进行修改（因为花生壳的映射，所以只要这样，就可以保证权限控制了，等以后深入后端研究，再考虑更加合适的办法）
router.all('/private/*', (req, res, next) => {
    if (req.hostname.startsWith('192.168.1') || req.hostname === 'localhost') {
        next()
    } else {
        res.send({
            status: 403,
            msg: "已在后台限制访问了，只能在我本地访问，不用点啦，看看公共页面就行啦"
        })
    }
})
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!博客相关后台
    // 获取作者信息
    .get('/getEditor', (req, res) => {
        blog_editor.findOne((err, result) => {
            // 后期需要修改为可以是本地图片，也可以是网络图片
            res.json(result)
        })
    })

    // 更新作者信息
    .put('/private/updateEditor', upload('avatar').any(), async (req, res) => {
        const { _id, name, imgName } = req.body
        const temp = {
            name
        }
        if (imgName) {
            temp.avatar = `/avatar/${imgName}`
        }
        const result = await blog_editor.findByIdAndUpdate(_id, temp)
        // 如果是本地图片的话，删除更新前的图片
        await deleteImgFile(result.avatar)
        res.send({ status: 200 })
    })

    // 获取文章分类
    .get('/getArticleGroup', async (req, res) => {
        const result = await blog_article_group.find().sort('sort')
        res.send(result)
    })

    // 添加文章分类
    .post('/private/addArticleGroup', async (req, res) => {
        const { name, sort } = req.body
        const result = await blog_article_group.insertMany({ name, sort })
        res.send(result[0])
    })

    // 修改文章分类
    .post('/private/updateArticleGroup', async (req, res) => {
        const { _id, name, sort } = req.body
        const result = await blog_article_group.findByIdAndUpdate(_id, { name, sort }, { new: true })
        res.send(result)
    })

    // 删除文章分类
    .delete('/private/deleteArticleGroup', async (req, res) => {
        const { _id } = req.body
        const result = await blog_article_group.deleteOne({ _id })
        res.send(result)
    })

    // 获取文章信息
    .get('/getArticles', async (req, res) => {
        const result = await blog_articles.find()
        res.send(result)
    })

    // 添加文章信息
    .post('/private/addArticle', upload('articlesImg').any(), async (req, res) => {
        const { title, group, date, desc, context, isTop, imgName } = req.body

        // 生成需要给数据库的格式
        const temp = {
            title,
            date,
            group,
            desc,
            isTop,
        }
        // 后期需要修改为可以是本地图片，也可以是网络图片
        if (imgName) {
            temp.img = `/articlesImg/${imgName}`
        }

        const article = await blog_articles.insertMany(temp)

        const articleId = article[0].id
        await blog_articleDetail.insertMany({
            articleId,
            context
        })

        res.send({})
    })

    // 删除文章（需要联动删除具体文章内容，以及上传的文章图片）
    .delete('/private/deleteArticle', async (req, res) => {
        const { _id } = req.body
        try {
            // 删除文章
            const result = await blog_articles.findOneAndDelete({ _id })
            // 删除文章详情页
            await blog_articleDetail.deleteOne({ articleId: _id })
            // 准备删除文章相关的图片
            const { img } = result
            // 如果是本地图片的话
            deleteImgFile(img)
            res.send({ status: '200' })
        } catch (e) {
            res.send({ status: '500', msg: '出现错误' + e })
        }
    })

    // 获取文章详细信息
    .get('/getArticleDetail', (req, res) => {
        const { _id } = req.query
        blog_articleDetail.findOne({ articleId: _id }, (err, result) => {
            res.json(result)
        })
    })

    // 更新文章详细信息
    .put('/private/updateArticle', upload('articlesImg').any(), async (req, res) => {
        const { _id, title, group, date, desc, context, isTop, imgName } = req.body

        // 生成需要给数据库的格式
        const temp = {
            title,
            date,
            group,
            desc,
            isTop,
        }
        // 后期需要修改为可以是本地图片，也可以是网络图片
        if (imgName) {
            temp.img = `/articlesImg/${imgName}`
        }

        const article = await blog_articles.findOneAndUpdate({ _id }, temp)
        if (imgName) {
            // 如果是本地图片的话，删除更新前的图片
            await deleteImgFile(article.img)
        }

        const articleId = article.id
        await blog_articleDetail.findOneAndUpdate({ articleId }, {
            context
        })

        res.send({})
    })

module.exports = router