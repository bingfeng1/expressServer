const axios = require('axios')
// 天行数据接口
// 关键key
const { key = "" } = require('./config.json')
if (!key) {
    console.error('请新建config.json并添加天行数据体统的apikey')
}

/**
 * 疫情数据接口
 * 每小时更新一次
 */
const ncovUrl = "http://api.tianapi.com/txapi/ncov/index"
const getNcovData = () => {
    return axios.get(ncovUrl,{
        params:{
            key
        }
    })
}

module.exports = {
    getNcovData
}