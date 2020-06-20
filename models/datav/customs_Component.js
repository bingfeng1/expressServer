const mongoose = require('mongoose')
const { Schema } = mongoose

// 个人使用的组件
const customs_Component = Schema({
    // 父组件id
    parent_id:{
        type:Schema.Types.ObjectId
    },
    name: String,    //组件中文名
    codeName: String,    //组件代码名
    type: String,//| 组件类型 |
    attr:{  // 自身属性
        x: Number,//| 组件x轴位置 |
        y: Number,//| 组件y轴位置 |
        width: Number, //| 组件宽度 |
        height: Number,//| 组件高度 |
    }
});

const Customs_Component = mongoose.model('customs_Component', customs_Component,'customs_component')

module.exports = Customs_Component