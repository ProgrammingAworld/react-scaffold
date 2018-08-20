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
            message: '登录成功!'
        },
        logout: {
            statusCode: 200,
            message: '注销成功!'
        },
        getUserInfo: {
            statusCode: 200,
            message: '获得用户信息成功!',
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
            })),
            message: '获取列表成功!'
        },
        addTodo: {
            statusCode: 200,
            message: '添加成功!'
        },
        removeTodo: {
            statusCode: 200,
            message: '删除成功!'
        },
        updateTodo: {
            statusCode: 200,
            message: '修改成功!'
        }
    }
}
