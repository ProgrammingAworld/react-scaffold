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
        logout: {
            statusCode: 2001,
            message: '注销成功'
        },
        getUserInfo: {
            statusCode: 200,
            message: '成功',
            data: {
                username: 'alex',
                userType: '0'
            }
        },
        getTodos: {
            statusCode: 200,
            data: _.times(6, n => ({
                id: n,
                text: Mock.Random.cname(),
                completed: Mock.Random.boolean()
            }))
        },
        addTodo: {
            statusCode: 200,
            data: {
                'id|+1': 1,
                text: Mock.Random.cname(),
                completed: Mock.Random.boolean()
            },
            message: '成功'
        },
        removeTodo: {
            statusCode: 200,
            data: {
                id: 1
            },
            message: '成功'
        },
        updateTodo: {
            statusCode: 200,
            data: {
                id: 1
            },
            message: '成功'
        }
    }
}
