/**
 * 这是一个特殊的api，会包含其他页面中的models
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({
    dest:'uploads/'
})

// 与blog_editor使用同一个model
const blog_editor = require('../models/blog/Editor')

// 获取作者信息
router.get('/getEditor',(req,res)=>{
    blog_editor.findOne((err,result)=>{
        res.json(result)
    })
})




module.exports = router