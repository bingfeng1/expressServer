const mongoose = require('mongoose')
const { Schema } = mongoose

const EditorSchema = Schema({
    name: String,    // 名字
    avatar: String,    // 头像地址（或者base64）
    socialContact: [
        {
            icon: String,    // 图标地址
            iconfont: Boolean,    //是否来自阿里图标库
            url: String,    //具体地址
        }
    ],
    customerNum: Number  // 总访问次数
});

const Editor = mongoose.model('blog_editor', EditorSchema)

module.exports = Editor