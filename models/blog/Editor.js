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

// 模拟数据，以后需要删除
// const admin = new Editor({
//     name: '冰风',    // 名字
//     avatar: 'https://apic.douyucdn.cn/upload/avatar/008/63/23/75_avatar_big.jpg?rltime',    // 头像地址（或者base64）
//     socialContact: [
//         {
//             icon: 'github',    // 图标地址
//             iconfont: false,    //是否来自阿里图标库
//             url: 'https://github.com/bingfeng1',    //具体地址
//         }
//     ],
//     customerNum: 0  // 总访问次数
// })

// Editor.findOne({ name: '冰风' }).then(user => {
//     if (!user) {
//         admin.save().then(result => {
//             console.log(result)
//         })
//     }
// })

module.exports = Editor