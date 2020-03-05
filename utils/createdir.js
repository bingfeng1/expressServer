const fs = require('fs')
const path = require('path')
const isNoFoundCreate = (dirname) => {
    const flag = fs.existsSync(dirname)
    if (!flag) {
        fs.mkdirSync(dirname)
    }
}

// 递归生成目录
const createDir = (dirArr, dirlastArr = []) => {
    // 先查看，一级目录
    for (let dir of dirArr) {
        // 根据对象键值对生成目录
        isNoFoundCreate(path.resolve(...dirlastArr, dir.dirname))
        if (dir.children) {
            dirlastArr.push(dir.dirname)
            // 目前两层递归没有问题，以后如果用到更多层，如果有问题再作优化
            createDir(dir.children, dirlastArr)
        }
    }
}

module.exports = {
    isNoFoundCreate,
    createDir
}