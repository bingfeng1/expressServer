const express = require('express')
const router = express.Router()

const blog_editor = require('../models/blog/Editor')
const articles = require('../models/blog/Article')

// 获取作者信息
router.get('/getEditor',(req,res)=>{
    blog_editor.findOne((err,result)=>{
        res.json(result)
    })
})

// 获取文章信息
router.get('/getArticles',(req,res)=>{
    articles.find((err,result)=>{
        res.json(result)
    })
})

module.exports = router