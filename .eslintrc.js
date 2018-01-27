// 基本规则
// 大括号风格要求
// 'brace-style': [
//     'error',
//     '1tbs', {
//         'allowSingleLine': true
//     }
// ],
// 一条语句也使用大括号
// 'curly': 'error',
// 变量名使用驼峰形式
// 'camelcase': 'error',
// 必须使用===和!==
// 'eqeqeq': 'error',
// 禁止扩展原生对象
// 'no-extend-native': 'error',
// 禁用__proto__
// 'no-proto': 'error',
// 禁用 caller 或 callee
// 'no-caller': 'error',
// 构造函数首字母大写
// 'new-cap': 'error',
// 与null进行比较同样使用===和!==
// 'no-eq-null': 'error',
// 强制操作符使用一致的换行符风格
// 'operator-linebreak': 'error',
// 不允许多个空行，默认2个空行
// 'no-multiple-empty-lines': 'error',
// 可以使用空格和tab混合缩进
// 'no-mixed-spaces-and-tabs': 'off',
// 在一元操作符之前或之后存在空格
// 'space-unary-ops': 'error',
// 禁止出现多个空格
// 'no-multi-spaces': 'error',
// 禁止使用令人困惑的多行表达式
// 'no-unexpected-multiline': 'error',
// 强制关键字周围空格的一致性
// 'keyword-spacing': 'error',
// 要求中缀操作符周围有空格
// 'space-infix-ops': 'error',
// 强制逗号前没有空格，逗号后追回一个空格
// 'comma-spacing': [
//     'error', {
//         'before': false,
//         'after': true
//     }
// ],
// 立即执行函数用括号包裹起来
// 'wrap-iife': 'error',
// 禁用不必要的分号
// 'no-extra-semi': 'error',
// 强制分号前没有空格，后有空格
// 'semi-spacing': 'error',
// 注释//或/*必须跟随一个空格
// 'spaced-comment': 'error',

// nodejs
// 把var语句看作是在块级作用域范围之内
// 'block-scoped-var': 'error',
// 禁止require()调用与普通变量声明混合使用
// 'no-mixed-requires': 'error',
// 禁止new require()的写法
// 'no-new-require': 'error',

module.exports = {
    'root': true,
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module',
        'allowImportExportEverywhere': true,
        'ecmaVersion': 6,
        'ecmaFeatures': {
            'jsx': true,
            'experimentalObjectRestSpread': true
        }
    },
    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    'plugins': [
        'react',
        'jsdoc'
    ],
    'globals': {},
    'rules': {
        // 句尾分号可以省略
        'semi': 'off',
        // 代码中可以保留console
        'no-console': 'off',
        // 代码使用4个空格的缩进风格
        'indent': ['error', 4],
        // 关闭命名function表达式规则
        'func-names': 'off',
        // 可以行尾空白
        'no-trailing-spaces': 'off',
        // 关闭拖尾逗号
        'comma-dangle': 'off',
        // 关闭换行符转换
        'linebreak-style': 'off',
        // 禁止使用指定语法
        'no-restricted-syntax': ['error', 'WithStatement'],
        // 关闭语句块之前的空格保持一致
        'space-before-blocks': 'off',
        // 可以使用++/--
        'no-plusplus': 'off',
        // 禁止未使用过的变量包括全局变量和函数中的最后一个参数必须使用
        'no-unused-vars': [
            'error', {
                'vars': 'all',
                'args': 'after-used'
            }
        ],
        // 使用单引号
        'quotes': [
            'error', 'single'
        ],
        // 强制最大可嵌深度为3
        'max-depth': [
            'error', 3
        ],
        // 强制函数块中的语句最大50行
        'max-statements': [
            'error', 50
        ],
        // 强制行的最大长度100,注释200
        'max-len': [
            'error', {
                'code': 100,
                'comments': 200
            }
        ],

        // NodeJs rules， 9.0之后全部使用import
        // 关闭require()强制在模块顶部调用
        'global-require': 'off',
        
        // ES6 rules
        // 箭头函数的箭头前后都要有空格
        'arrow-spacing': 'error',
        // 接收const被修改的通知
        'no-const-assign': 'error',
        // 要求使用let或const而不是var
        'no-var': 'error',
        // 如果一个变量不会被重新赋值，则使用const声明
        'prefer-const': 'error',
        
        // React 参考eslint-config-airbnb下的rules/react.js
        // jsx代码使用4个空格的缩进风格
        'react/jsx-indent': ['error', 4],
        // jsx属性使用4个空格的缩进风格
        'react/jsx-indent-props': ['error', 4],
        // 使用了jsx语法的js代码文件其扩展名可以使用js或js
        'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
        // 数组索引可以用作key
        'react/no-array-index-key': 'off',
        // 组件属性可以传any,array,object
        'react/forbid-prop-types': 'off',
        // 链接地址中可以使用 javascript:
        'no-script-url': 'off',
        // 关闭点击元素上强制增加onKey**事件
        'click-events-have-key-events': 'off',
        // 关闭引用依赖检查
        'import/no-extraneous-dependencies': 'off',
        // 扩展名处理
        'import/extensions': ['error', {
            'js': 'never',
            'jsx': 'never'
        }],
        // webpack别名启用，禁用以下功能
        'import/no-unresolved': 'off'
    }
}
