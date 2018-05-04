/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const Mock = require('mockjs')
const _ = require('lodash')

module.exports = function () {
    return {
        login: {
            statusCode: 200,
            message: '登录成功'
        },
        getTodos: {
            statusCode: 200,
            data: _.times(6, n => ({
                id: n,
                text: Mock.Random.cname(),
                completed: Mock.Random.boolean()
            }))
        },
        addTodo: _.times(10, n => ({
            id: n,
            text: Mock.Random.cname(),
            completed: Mock.Random.boolean()
        }))
    }
}
