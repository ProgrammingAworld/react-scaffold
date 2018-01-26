/**
 * Created by Anchao on 2015/8/3.
 */

// 公共工具类
class Tools {
    static getHash() {
        return window.location.hash
    }

    static getPathname() {
        return window.location.pathname
    }

    static exeCb(fnCb) {
        if (fnCb && typeof fnCb === 'function') {
            fnCb()
        }
    }

    static getStrLen(str) {
    // 计算字符串长度(英文占1个字符，中文汉字占2个字符)
        let len = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2
            } else {
                len++
            }
        }

        return len
    }

    static getStrByLen(str, len) {
        if (this.getStrLen(str) < len) {
            return str
        }
        const aRes = []
        let l = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                l += 2
            } else {
                l++
            }

            if (l <= len) {
                aRes.push(str.charAt(i))
            }
        }

        return aRes.join('')
    }

    static convertDate2FormatStr(oDate, format) {
        const o = {
            'M+': oDate.getMonth() + 1, // month
            'd+': oDate.getDate(), // day
            'h+': oDate.getHours(), // hour
            'm+': oDate.getMinutes(), // minute
            's+': oDate.getSeconds(), // second
            'q+': Math.floor((oDate.getMonth() + 3) / 3), // quarter
            S: oDate.getMilliseconds() // millisecond
        }
        let formatCopy = format

        if (/(y+)/.test(formatCopy)) {
            formatCopy = formatCopy.replace(
                RegExp.$1,
                (`${oDate.getFullYear()}`).substr(4 - RegExp.$1.length)
            )
        }

        for (const k in o) {
            if (new RegExp(`(${k})`).test(formatCopy)) {
                formatCopy = formatCopy.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length)
                )
            }
        }

        return formatCopy
    }

    static formatSdate(sDate) {
        // 默认sDate格式为：2015-10-09 20:45:35
        let date = sDate
        if (typeof date === 'string') {
            date = date.trim()

            if (date.length > 0) {
                return date.replace(/:\d{2}$/, '')
            }
        }

        return date
    }

    static makeActionCreator(type, ...argNames) {
    // 生成静态acionCreator
        return (...args) => {
            const action = { type }

            argNames.forEach((arg, index) => {
                action[arg] = args[index]
            })

            return action
        }
    }

    static createReducer(initialState, handlers) {
        // 生成reducer
        return (state = initialState, action) => {
            if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
                return handlers[action.type](state, action)
            }
            return state
        }
    }
}

export default Tools
