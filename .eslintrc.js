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
    // 强制行的最大长度100
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
    "space-unary-ops": "error",
    "no-multi-spaces": "error",
    "space-before-blocks": 0,
    "keyword-spacing": 0,
    "space-infix-ops": 0,
    "comma-spacing": [
      0, {
        "before": false,
        "after": true
      }
    ],
    "comma-dangle": 0,
    "wrap-iife": "error",
    "no-extra-semi": "error",
    "semi-spacing": "error",
    "spaced-comment": "error",
    "func-names": 0,

    // NodeJs rules
    "block-scoped-var": "error",
    "global-require": 0,
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
