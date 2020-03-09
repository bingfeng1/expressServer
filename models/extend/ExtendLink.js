const mongoose = require('mongoose')
const { Schema } = mongoose

// 扩展链接
const ExtendLinkSchema = Schema({
    name: String, // 链接名称
    url: String // 链接地址
});

const ExtendLink = mongoose.model('background_extend_link', ExtendLinkSchema)

module.exports = ExtendLink