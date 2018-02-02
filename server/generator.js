/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const faker = require('faker')
const _ = require('lodash')

faker.locale = 'zh_CN';

module.exports = function () {
    return {
        login: {
            statusCode: 200,
            message: '登录成功'
        },
        todos: {
            statusCode: 200,
            list: _.times(10, n => ({
                id: n,
                text: faker.name.jobTitle(),
                completed: faker.random.boolean(),
                avatar: faker.internet.avatar
            }))
        }
    }
}
