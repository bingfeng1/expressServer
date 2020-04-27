// 用于操作文件
const fs = require('fs')
const path = require('path')

// 根据路径生成文件夹
const isNoFoundCreate = (dirname) => {
    const flag = fs.existsSync(dirname)
    if (!flag) {
        fs.mkdirSync(dirname)
    }
}

// 生成文件
const ifNoFoundCreateFile = (filename, text) => {
    const flag = fs.existsSync(filename)
    if (!flag) {
        let str;
        // 如果有文件内容，则生成
        if (text) {
            str = JSON.stringify(text, "", "\t")
        }
        fs.writeFileSync(filename, str)
    }
}

// 递归生成目录
const createDir = (dirArr, dirlastArr = []) => {
    // 先查看，一级目录
    for (let dir of dirArr) {
        // 根据对象键值对生成目录
        isNoFoundCreate(path.resolve(...dirlastArr, dir.dirname))

        // 如果包含文件，则生成文件
        if (dir.filename) {
            ifNoFoundCreateFile(path.resolve(...dirlastArr, dir.dirname, dir.filename), dir.text)
        }

        if (dir.children) {
            // 目前两层递归没有问题，以后如果用到更多层，如果有问题再作优化
            createDir(dir.children, [...dirlastArr, dir.dirname])
        }
    }
}

// 删除文件
const deleteImgFile = async img => {
    if (img && !img.startsWith('http')) {
        await fs.promises.unlink(path.resolve(__dirname, '..', 'uploads', ...(img.split('/'))))
    }
}

module.exports = {
    isNoFoundCreate,
    createDir,
    deleteImgFile
}