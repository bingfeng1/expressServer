const mongoose = require('mongoose')
const { Schema } = mongoose

// 示例组件
const Datav_ComponentSchema = Schema({
    name: String,    //组件中文名
    codeName: String,    //组件代码
    type: String,//| 组件类型 |
    attr:{
        x: Number,//| 组件x轴位置 |
        y: Number,//| 组件y轴位置 |
        width: Number, //| 组件宽度 |
        height: Number,//| 组件高度 |
    }
});

const Datav_Component = mongoose.model('datav_component', Datav_ComponentSchema)

module.exports = Datav_Component