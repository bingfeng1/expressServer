const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const apicache = require('apicache')
const mongoose = require('mongoose')

// 配置放入配置文件中，不再上传github
const { DBURL, MY_PORT } = require('./config.json')

const PORT = process.env.PORT || MY_PORT

// api缓存
let cache = apicache.middleware
app.use(cache('60 minutes'))

// 通过读取文件的方式，获取不同的路由
fs.readdir(path.join(__dirname, 'routers'), (err, files) => {
    if (err) {
        throw err
    } else {
        files.forEach(file => {
            let route = path.join(__dirname, 'routers', file)
            let routeFile = require(route)

            let routePath = file.split('.')[0]
            app.use(`/api/${routePath}`, routeFile)
        })
    }
})

// 数据库连接
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', () => {
    console.error('连接失败')
})
db.once('open', () => {
    console.log('连接成功')
})


app.listen(PORT, () => {
    console.log(`服务启动：http://localhost:${PORT}`)
})