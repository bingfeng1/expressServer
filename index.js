const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 9000

fs.readdir(path.join(__dirname,'routers'),(err,files)=>{
    if(err){
        throw err
    }else{
        files.forEach(file=>{
            let route = path.join(__dirname,'routers',file)
            let routeFile = require(route)

            let routePath = file.split('.')[0]
            app.use(`/${routePath}`,routeFile)
        })
    }
})


app.listen(PORT,()=>{
    console.log(`服务启动：http://localhost:${PORT}`)
})