/**
 * 这是一个特殊的api，会包含其他页面中的models
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { getIPAddressPort } = require('../utils/utils')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'uploads', 'avatar'))
    },
    filename: function (req, file, cb) {
        const { imgName } = req.body
        cb(null, imgName)
    }
})

const upload = multer({ storage })

// 与blog_editor使用同一个model
const blog_editor = require('../models/blog/Editor')

// 设置所有增删改权限，只能在本地192.168.1的网段上进行修改（因为花生壳的映射，所以只要这样，就可以保证权限控制了，等以后深入后端研究，再考虑更加合适的办法）
router.all('/private/*', (req, res, next) => {
    if (req.hostname.startsWith('192.168.1') || req.hostname === 'localhost') {
        next()
    } else {
        res.status(401).json({
            status: '401',
            msg: "已在后台限制访问了，只能在我本地访问，不用点啦，看看公共页面就行啦"
        })
    }
})

// 获取作者信息
router.get('/private/getEditor', (req, res) => {
    blog_editor.findOne((err, result) => {
        result.avatar = `${getIPAddressPort()}/avatar/${result.avatar}`
        res.json(result)
    })
})


// 更新作者信息
router.post('/private/updateEditor', upload.any('avatar'), async (req, res) => {
    const { _id, name, imgName } = req.body
    const result = await blog_editor.findByIdAndUpdate(_id, { name, avatar: imgName }, { new: true })
    res.send(result)
})


module.exports = router