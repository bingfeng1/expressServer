// 定时任务，数据库与程序对应汇总
const { NCOV } = require('../config/timedTask')
const { startGetNcov, stopGetNcov } = require('../otherData/tianxing')

// 定时任务的集成，有点类似react-redux的做法
const timedTask = task => {
    let start, stop, timeout;
    switch (task) {
        case NCOV:
            start = () => {
                timeout = startGetNcov()
            }
            stop = () => {
                stopGetNcov(timeout)
                timeout = undefined
            }
            break;
        default:
            break;
    }
    // 通过闭包，直接提供启动与停止操作
    return () => ({
        start,
        stop
    })
}


// 定时任务
const timedTask_Map = new Map()
// 新冠病毒定时任务
timedTask_Map.set(NCOV, timedTask(NCOV)())

module.exports = timedTask_Map