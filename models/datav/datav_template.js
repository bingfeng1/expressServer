const mongoose = require('mongoose')
const { Schema } = mongoose

// 示例组件
const datav_templateSchema = Schema({
    parent_area: {
        type: Schema.Types.ObjectId
    }, // 所属工作区
    name: String, // 名称
    width: Number,// 模板宽度
    height: Number,// 模板高度
    mini_img: String,//大屏缩略图（未来开发）
});

const Datav_template = mongoose.model('datav_template', datav_templateSchema, 'datav_template')

module.exports = Datav_template