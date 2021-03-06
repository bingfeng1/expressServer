const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const apicache = require('apicache')
const mongoose = require('mongoose')
const cors = require('cors')

// 先检测是否拥有配置文件中的文件夹
const initDirAndFile = require('./config/dirlist.json')
const { createDir } = require('./utils/controlFileSystem')
createDir(initDirAndFile)


// 配置放入配置文件中，不再上传github
const { DBURL, MY_PORT, ORIGIN } = require('./config/config.json')

// 设置端口号
const PORT = process.env.PORT || MY_PORT || 9000

// 跨域问题
app.use(cors({ origin: ORIGIN }))
app.use(express.json())

// api缓存
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

function privateMiddleWare(req, res, next) {
    if (req.hostname.startsWith('192.168.1') || req.hostname === 'localhost') {
        next()
    } else {
        res.send({
            status: 403,
            msg: "已在后台限制访问了，只能在我本地访问，不用点啦，看看公共页面就行啦"
        })
    }
}

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
            app.use(`/api/${routePath}`, privateMiddleWare, routeFile)
            // 配置静态文件入口
            app.use(`/${routePath === "blog" ? "" : routePath}`, express.static(path.resolve(__dirname, 'static', routePath)))
        })
    }
})

// 获取静态资源
app.use('/', express.static(path.resolve(__dirname, 'uploads')))
// vue版本个人博客，因为与react同步，所以用了同一个api
app.use('/blog-vue', express.static(path.resolve(__dirname, 'static', 'blog-vue')))

// 数据库连接
if (DBURL !== "你的数据库地址") {

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
} else {
    console.log('记得在config/config.json中添加数据库地址')
}


app.listen(PORT, () => {
    console.log(`服务启动：http://localhost:${PORT}`)
})