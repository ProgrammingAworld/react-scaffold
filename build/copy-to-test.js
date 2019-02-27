/**
 * 功能：复制生产代码到测试环境
 * 作者：安超
 * 日期：2018-12-07
 */
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const { execCmd } = require('./utils')

const indexHTMLPath = path.resolve(__dirname, '../dist/index.html')
const indexHTML = fs.readFileSync(indexHTMLPath, 'utf-8')
fs.writeFileSync(indexHTMLPath, indexHTML.replace('%lastDeployTime%', `${moment().format('YYYY-MM-DD HH:mm:ss')}`), 'utf-8')

const host = 'root@172.17.1.197'
const clearArr = ['rm -rf /usr/local/nginx/html/caiman', 'mkdir /usr/local/nginx/html/caiman']
const cmdArr = [
    `ssh ${host} '${clearArr.join(';')}'`,
    `scp -r ${path.join(__dirname.replace(/build$/, 'dist'), '*')} ${host}:/usr/local/nginx/html/caiman`
]
const cmd = cmdArr.join(';')

execCmd(cmd, (stdout) => {
    console.log('部署完成', stdout)
})
