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

const temp = new Editor({
    name: '冰风',
    avatar:'https://i2.hdslb.com/bfs/face/61ec92b855b89b2b9bcc2e60a51ce4e9edd4640a.jpg@150w_150h.jpg'
})

Editor.findOne({name:'冰风'}).then((t)=>{
    if(!t){
        Editor.insertMany(temp).then((c)=>{
            console.log(c)
        })
    }
})

module.exports = Editor