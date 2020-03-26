// 对天行数据接口的操作
const { getNcovData } = require('./dealData')
const mongodb_ncov = require('../../models/background/Ncov')
const { dateFormat } = require('../../utils/utils')

const getNcov = async () => {
    const { data } = await getNcovData()
    if (data.code === 200) {
        // 填入当前日期
        data.date = dateFormat(new Date()).getYearMonthDate
        const mongoResult = await mongodb_ncov.updateOne({ date: data.date }, data, {
            upsert: true
        })
        return mongoResult
    } else {
        return result
    }
}

// 开始获取疫情的定时任务
const startGetNcov = () => {
    // 启动的时候，先获取一次数据
    getNcov()
    const timer = setInterval(() => {
        getNcov()
    }, 1000 * 60 * 60)
    return timer;
}

// 取消疫情的定时任务
const stopGetNcov = timer => {
    clearInterval(timer)
}

module.exports = {
    getNcov,
    startGetNcov,
    stopGetNcov
}