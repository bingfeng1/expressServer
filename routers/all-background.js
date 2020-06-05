/**
 * 这是一个特殊的api，会包含其他页面中的models
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
// const { getIPAddressPort } = require('../utils/utils')
// 与mongodb_editor使用同一个model
const mongodb_editor = require('../models/blog/Editor')
const mongodb_articles = require('../models/blog/Article')
const mongodb_articleDetail = require('../models/blog/ArticleDetail')
const mongodb_article_group = require('../models/blog/ArticleGroup')
const mongodb_extend_link = require('../models/extend/ExtendLink')
const mongodb_task = require('../models/background/Task')
const mongodb_ncov = require('../models/background/Ncov')
// 封装的文件系统
const { deleteImgFile } = require('../utils/controlFileSystem')
// 后端定时任务
const timedTask_Map = require('../timedTask')
// 服务器系统数据
const { computerInfo } = require('../otherData/system')

const axios = require('axios')

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
router
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!博客相关后台
    // 获取作者信息
    .get('/editor', (req, res) => {
        mongodb_editor.findOne((err, result) => {
            // 后期需要修改为可以是本地图片，也可以是网络图片
            res.json(result)
        })
    })

    // 更新作者信息
    .put('/editor', upload('avatar').any(), async (req, res) => {
        const { _id, name, imgName } = req.body
        const temp = {
            name
        }
        if (imgName) {
            temp.avatar = `/avatar/${imgName}`
        }
        const result = await mongodb_editor.findByIdAndUpdate(_id, temp)
        // 如果是本地图片的话，删除更新前的图片
        await deleteImgFile(result.avatar)
        res.send({ status: 200 })
    })

    // 获取文章分类
    .get('/articleGroup', async (req, res) => {
        const result = await mongodb_article_group.find().sort('sort')
        res.send(result)
    })

    // 添加文章分类
    .post('/articleGroup', async (req, res) => {
        const { name, sort } = req.body
        const result = await mongodb_article_group.insertMany({ name, sort })
        res.send(result[0])
    })

    // 修改文章分类
    .put('/articleGroup', async (req, res) => {
        const { _id, name, sort } = req.body
        const result = await mongodb_article_group.findByIdAndUpdate(_id, { name, sort }, { new: true })
        res.send(result)
    })

    // 删除文章分类
    .delete('/articleGroup', async (req, res) => {
        const { _id } = req.body
        const result = await mongodb_article_group.deleteOne({ _id })
        res.send(result)
    })

    // 获取文章信息
    .get('/articles', async (req, res) => {
        const result = await mongodb_articles.find()
        res.send(result)
    })

    // 添加文章信息
    .post('/articles', upload('articlesImg').any(), async (req, res) => {
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

        const article = await mongodb_articles.insertMany(temp)

        const articleId = article[0].id
        await mongodb_articleDetail.insertMany({
            articleId,
            context
        })

        res.send({})
    })

    // 删除文章（需要联动删除具体文章内容，以及上传的文章图片）
    .delete('/articles', async (req, res) => {
        const { _id } = req.body
        try {
            // 删除文章
            const result = await mongodb_articles.findOneAndDelete({ _id })
            // 删除文章详情页
            await mongodb_articleDetail.deleteOne({ articleId: _id })
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
    .get('/articleDetail', (req, res) => {
        const { _id } = req.query
        mongodb_articleDetail.findOne({ articleId: _id }, (err, result) => {
            res.json(result)
        })
    })

    // 更新文章详细信息
    .put('/articleDetail', upload('articlesImg').any(), async (req, res) => {
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

        const article = await mongodb_articles.findOneAndUpdate({ _id }, temp)
        if (imgName) {
            // 如果是本地图片的话，删除更新前的图片
            await deleteImgFile(article.img)
        }

        const articleId = article.id
        await mongodb_articleDetail.findOneAndUpdate({ articleId }, {
            context
        })

        res.send({})
    })

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!扩展功能
    // 获取扩展链接
    .get('/extendLink', async (req, res) => {
        const result = await mongodb_extend_link.find()
        res.send(result)
    })
    // 添加扩展链接
    .post('/extendLink', async (req, res) => {
        const { name, url } = req.body
        const result = await mongodb_extend_link.insertMany({ name, url })
        res.send(result[0])
    })

    // 修改扩展链接
    .put('/extendLink', async (req, res) => {
        const { _id, name, url } = req.body
        const result = await mongodb_extend_link.findByIdAndUpdate(_id, { name, url }, { new: true })
        res.send(result)
    })

    // 删除扩展链接
    .delete('/extendLink', async (req, res) => {
        const { _id } = req.body
        const result = await mongodb_extend_link.deleteOne({ _id })
        res.send(result)
    })

    // 获取定时任务
    .get('/timedTask', async (req, res) => {
        const result = await mongodb_task.find()
        res.send(result)
    })

    // 改变定时任务是否启动
    .put('/timedTask', async (req, res) => {
        const { flag, _id, name } = req.body
        if (!flag) {
            let tempTask = timedTask_Map.get(name)
            tempTask.start()
            const result = await mongodb_task.findByIdAndUpdate(_id, { flag: true }, { new: true })
            res.send(result)
        } else {
            let tempTask = timedTask_Map.get(name)
            tempTask.stop()
            const result = await mongodb_task.findByIdAndUpdate(_id, { flag: false }, { new: true })
            res.send(result)
        }

    })

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!第三方服务
    // 新冠状病毒信息获取
    .get('/ncov', async (req, res) => {
        const result = await mongodb_ncov.find(null, null, { sort: '-date', limit: 1 })
        res.send(result)
    })

    // 获取服务器信息
    .get('/computerInfo', async (req, res) => {
        const {
            freemem,
            totalmem,
            uptime,
            cpuUsage,
            compouterDrive
        } = computerInfo
        const _cpuUsage = await cpuUsage()
        const _freemem = freemem()
        const _totalmem = totalmem()
        const _uptime = uptime()
        const _compouterDrive = await compouterDrive()
        res.send({
            _cpuUsage,
            _freemem,
            _totalmem,
            _uptime,
            _compouterDrive
        })
    })

    // 获取腾讯疫情接口
    .get('/TXNcovInfo', async (req, res) => {
        const { data = "" } = await axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5')
        if (data) {
            const result = JSON.parse(data.data)
            res.send(result)
        }else{
            res.status(500).send()
        }
    })
module.exports = router