/**
 * 功能：复制功能钩子文件
 * 作者：安超
 * 日期： 2018/2/6
 */

/*eslint-disable*/
const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, 'pre-commit')
const dest = path.resolve('./', '.git/hooks/pre-commit')

console.log(__dirname, src, dest)
fs.copyFile(src, dest, (err) => {
    if (err) throw err;
    // fs.chmod(dest, 777, (err2) => {
    //     if (err2) throw err2
    //     console.log('修改文件属性成功！')
    // })
})
