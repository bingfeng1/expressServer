const os = require('os')
const { PROTOCOL, MY_PORT } = require('../config/config.json')
/**获取本机ip**/
const getIPAddress = () => {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

// 获取本机IP和端口
const getIPAddressPort = () => {
    return `${PROTOCOL}://${getIPAddress()}:${MY_PORT}`
}

// 获取时间，功能待完善，时间可以继续写下去
const dateFormat = (itemDate = new Date()) => {
    let nowDate = new Date(itemDate)
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const date = nowDate.getDate()

    const getYearMonthDate = `${year}-${(month + '').padStart(2, '0')}-${(date + '').padStart(2, '0')}`
    return {
        getYearMonthDate
    }
}

module.exports = {
    getIPAddress,
    getIPAddressPort,
    dateFormat
}