const mongoose = require('mongoose')
const { Schema } = mongoose

// 博客文章的model
const Datav_ComponentSchema = Schema({
    name: String,    //文章标题
    codeName: String,    //发布日期
    type: String,    //所在小组
    type: String,//| 组件类型 |
    x: Number,//| 组件x轴位置 |
    y: Number,//| 组件y轴位置 |
    width: Number, //| 组件宽度 |
    height: Number,//| 组件高度 |
});

const Datav_Component = mongoose.model('datav_component', Datav_ComponentSchema)

module.exports = Datav_Component