const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const apicache = require('apicache')
const mongoose = require('mongoose')
const cors = require('cors')

// 配置放入配置文件中，不再上传github
const { DBURL, MY_PORT, ORIGIN } = require('./config/config.json')

// 先检测是否拥有配置文件中的文件夹
const { uploadDirs } = require('./config/dirlist.json')
const { createDir } = require('./utils/createdir')
createDir(uploadDirs)

// 设置端口号
const PORT = process.env.PORT || MY_PORT

// 跨域问题
app.use(cors({ origin: ORIGIN }))
app.use(express.json())

// api缓存
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

// 通过读取文件的方式，获取不同的路由
fs.readdir(path.join(__dirname, 'routers'), (err, files) => {
    if (err) {
        throw err
    } else {
        files.forEach(file => {
            let route = path.join(__dirname, 'routers', file)
            let routeFile = require(route)

            let routePath = file.split('.')[0]
            // 配置api路由
            app.use(`/api/${routePath}`, routeFile)
            // 配置静态文件入口
            app.use(`/${routePath === "blog" ? "" : routePath}`, express.static(path.resolve(__dirname, 'static', routePath)))
        })
    }
})

// 获取静态资源
app.use('/', express.static(path.resolve(__dirname, 'uploads')))

// 数据库连接
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', () => {
    console.error('连接失败')
})
db.once('open', () => {
    console.log('连接成功')
})
// 取消mongoogse5的警告
mongoose.set('useFindAndModify', false);


app.listen(PORT, () => {
    console.log(`服务启动：http://localhost:${PORT}`)
})