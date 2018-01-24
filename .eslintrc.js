module.exports = {
  "root": true,
  "extends": ["airbnb"],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsdoc",
    "import",
    "jsx-a11y"
  ],
  "globals": {

  },
  "rules": {
    // 大括号风格要求
    "brace-style": [
      "error",
      "1tbs", {
        "allowSingleLine": true
      }
    ],
    // 一条语句也使用大括号
    "curly": "error",
    // 变量名使用驼峰形式
    "camelcase": "error",
    // 必须使用===和!==
    "eqeqeq": "error",
    // 禁止扩展原生对象
    "no-extend-native": "error",
    // 禁用__proto__
    "no-proto": "error",
    // 禁用 caller 或 callee
    "no-caller": "error",
    // 禁止未使用过的变量包括全局变量和函数中的所有参数
    "no-unused-vars": [
      "error", {
        "vars": "all",
        "args": "all"
      }
    ],
    // 构造函数首字母大写
    "new-cap": "error",
    // 使用单引号
    "quotes": [
      "error", "single"
    ],
    // 强制最大可嵌深度为3
    "max-depth": [
      "error", 3
    ],
    // 强制函数块中的语句最大50行
    "max-statements": [
      "error", 50
    ],
    // 强制行的最大长度100,注释200
    "max-len": [
      "error", {
        "code": 100,
        "comments": 200
      }
    ],
    // 与null进行比较同样使用===和!==
    "no-eq-null": "error",
    // 强制操作符使用一致的换行符风格
    "operator-linebreak": "error",
    // 不允许多个空行，默认2个空行
    "no-multiple-empty-lines": "error",
    // 可以使用空格和tab混合缩进
    "no-mixed-spaces-and-tabs": "off",
    // 在一元操作符之前或之后存在空格
    "space-unary-ops": "error",
    // 禁止出现多个空格
    "no-multi-spaces": "error",
    // 关闭语句块之前的空格保持一致
    "space-before-blocks": "off",
    // 强制关键字周围空格的一致性
    "keyword-spacing": "error",
    // 要求中缀操作符周围有空格
    "space-infix-ops": "error",
    // 强制逗号前没有空格，逗号后追回一个空格
    "comma-spacing": [
      "error", {
        "before": false,
        "after": true
      }
    ],
    // 关闭拖尾逗号
    "comma-dangle": "off",
    // 立即执行函数用括号包裹起来
    "wrap-iife": "error",
    // 禁用不必要的分号
    "no-extra-semi": "error",
    // 强制分号前没有空格，后有空格
    "semi-spacing": "error",
    // 注释//或/*必须跟随一个空格
    "spaced-comment": "error",
    // 关闭命名function表达式规则
    "func-names": 0,

    // NodeJs rules
    // 把var语句看作是在块级作用域范围之内
    "block-scoped-var": "error",
    // 关闭require()强制在模块顶部调用
    "global-require": "off",
    "no-mixed-requires": "error",
    "no-new-require": "error",

    // ES6 rules
    "arrow-spacing": "error",
    "no-const-assign": "error",
    "no-var": "error",
    "prefer-const": 0,

    // React
    "jsx-quotes": [
      "error", "prefer-double"
    ],
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1
  }
}
