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
    "quotes": [
      2, "single"
    ],
    "max-depth": [
      2, 3
    ],
    "max-statements": [
      2, 45
    ],
    "max-len": [
      2, 200
    ],
    "no-eq-null": 2,
    "operator-linebreak": 2,
    "no-multiple-empty-lines": [
      2, {
        "max": 2
      }
    ],
    "no-mixed-spaces-and-tabs": 0,
    "space-unary-ops": 2,
    "no-multi-spaces": 2,
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
    "wrap-iife": 2,
    "no-extra-semi": 2,
    "semi-spacing": 2,
    "spaced-comment": 2,
    "func-names": 0,

    // NodeJs rules
    "block-scoped-var": 2,
    "global-require": 0,
    "no-mixed-requires": 2,
    "no-new-require": 2,

    // ES6 rules
    "arrow-spacing": 2,
    "no-const-assign": 2,
    "no-var": 2,
    "prefer-const": 0,

    // React
    "jsx-quotes": [
      2, "prefer-double"
    ],
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1
  }
}
