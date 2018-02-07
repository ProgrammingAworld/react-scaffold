/**
 * 功能：执行pre-commit
 * 作者：安超
 * 日期： 2018/2/6
 */

/*eslint-disable*/
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const src = path.resolve(__dirname, 'pre-commit')

fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err
    exec(`${data} lintall || true`, (err2, stdout, stderr) => {
        if (err) {
            console.log('err2=', err2)
            return
        }

        console.log('stdout=', stdout, stderr)
    })
})
