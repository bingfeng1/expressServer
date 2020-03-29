const os = require('os')
const osu = require('node-os-utils')
const { cpu, drive } = osu

// 计算机操作平台
const platform = os.platform()
// 这里可以区分linux和win32等，我这里只需要这两个，因为开发环境和正式环境的不一致

// 获取计算机内存空间
const freemem = () => os.freemem()

// 获取计算机总内存数
const totalmem = () => os.totalmem()

// 获取计算机运行时间
const uptime = () => os.uptime()

// 获取计算机cpu使用：promise
const cpuUsage = () => cpu.usage()

// 获取计算机硬盘空间：promise
const compouterDrive = () => {
    if (platform === 'linux') {
        return drive.info()
    } else {
        return {
            totalGb: '0',
            usedGb: '0',
            freeGb: '0',
            usedPercentage: '0',
            freePercentage: '0'
        }
    }
}

// 汇总以上计算机本身信息
const computerInfo = {
    freemem,
    totalmem,
    uptime,
    cpuUsage,
    compouterDrive
}

module.exports = {
    computerInfo
}