/**
 * Created by anchao on 2016/6/29.
 */
import { $ } from 'common/Util'

/*
 * 用法：如下
 * url: '/todos/:todoId/getTodoContent'
 * params: { todoId: 100 }
 * data: { searchText: 'alex' }
 */

const handleWithParameter = function (url, {
    method = 'GET',
    contentType = 'application/x-www-form-urlencoded',
    params = {},
    data = {}
}) {
    let result = url
    let dataNew
    
    for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
            result = result.replace(new RegExp(`:${key}`, 'g'), params[key])
        }
    }
    
    if (method.toUpperCase() === 'GET' && JSON.stringify(params) !== '{}') {
        dataNew = params
    } else {
        dataNew = data
    }
    
    const settings = {
        method,
        contentType,
        data: dataNew,
        dataType: 'json'
    }
    return $.ajax(result, settings)
}

/* eslint-enable */
export default class ServiceBase {
    static postWithParameter(url, oSettings) {
        return handleWithParameter(url, { ...oSettings, method: 'POST' })
    }

    static getWithParameter(url, oSettings) {
        return handleWithParameter(url, { ...oSettings, method: 'GET' })
    }
    
    static putWithParameter(url, oSettings) {
        return handleWithParameter(url, { ...oSettings, method: 'PUT' })
    }
    
    static deleteWithParameter(url, oSettings) {
        return handleWithParameter(url, { ...oSettings, method: 'DELETE' })
    }
}
