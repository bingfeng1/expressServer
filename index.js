const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { dburl } = require('./config.json')

const PORT = process.env.PORT || 9000

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

mongoose.connect(dburl)
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