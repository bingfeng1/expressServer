const mongoose = require('mongoose')
const { Schema } = mongoose
const { NCOV } = require('../../config/timedTask')

// 定时任务表
const TaskSchema = Schema({
    name: String,    //定时任务名称
    desc: String,     //定时任务描述
    flag: {
        type: Boolean,
        default: false
    }   //定时器是否开启
});

const Task = mongoose.model('timed_task', TaskSchema)


// 所有定时任务的添加（程序启动，检测数据库是否拥有）
const ncov = new Task({
    name: NCOV,
    desc: "从天行数据中获取信息（每小时）",
    flag: false
})

// 每次启动，定时器不自动开启
Task.updateOne({ name: NCOV }, ncov, {
    upsert: true
})

module.exports = Task