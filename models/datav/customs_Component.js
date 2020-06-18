const mongoose = require('mongoose')
const { Schema } = mongoose

// 个人使用的组件
const customs_Component = Schema({
    parent_id:{
        type:Schema.Types.ObjectId
    },
    customs_id:{    // 组件自身id
        type:String,
    },
    name: String,    //组件中文名
    codeName: String,    //组件代码名
    type: String,//| 组件类型 |
    x: Number,//| 组件x轴位置 |
    y: Number,//| 组件y轴位置 |
    width: Number, //| 组件宽度 |
    height: Number,//| 组件高度 |
    children:Array  // 可能会使用的子组件
});

const Datav_Component = mongoose.model('customs_Component', customs_Component,'customs_component')

module.exports = Datav_Component