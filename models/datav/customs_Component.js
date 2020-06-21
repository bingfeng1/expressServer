const mongoose = require('mongoose')
const { Schema } = mongoose

// 个人使用的组件
const customs_Component = Schema({
    // 父组件id
    parent_id: {
        type: Schema.Types.ObjectId
    },
    name: String,    //组件中文名
    codeName: String,    //组件代码名
    type: String,//| 组件类型 |
    attr: {  // 自身属性
        x: Number,//| 组件x轴位置 |
        y: Number,//| 组件y轴位置 |
        width: Number, //| 组件宽度 |
        height: Number,//| 组件高度 |
    },
    options: {
        option: String, // echarts使用的配置项
        series: String, // 系列数据
    }
});

/**
 * 根据datav官方文档，他们做法应该是在某个文件（package.json）写死需要的配置，然后在配置项中，替换这些配置项
 * 所以某些可能需要使用function的地方，需要自定义配置
 * 这里尝试直接使用string转obj的方式（function暂时不确定是否可以转换） 
 * 如果这次配置失败，那么尝试使用类似阿里的方式，每个图标都带有各自的配置文件（json），而不是数据库提取。
 * 这样每次使用新的组件，则复制一份json
 * 
 * 或者，直接在后端生成json文件，每次配置直接调用json文件内容（这个比较可行）
 */


const Customs_Component = mongoose.model('customs_Component', customs_Component, 'customs_component')

module.exports = Customs_Component