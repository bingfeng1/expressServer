const os = require('os')
const { PROTOCOL, MY_PORT } = require('../config.json')
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

module.exports = {
    getIPAddress,
    getIPAddressPort
}