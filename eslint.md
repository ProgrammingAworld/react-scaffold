## eslint参数说明

- extends："airbnb" 使用了eslint-config-airbnb
- parser: "babel-eslint" 对Babel解析器的包装使其与 ESLint 兼容
- parserOptions: 非es5特性下正常工作，此属性是必须的
  - sourceType: "module", 默认script，工程代码是ECMAScript模块用module
  - allowImportExportEverywhere：true 允许在程序的任何地方使用import和export
  - ecmaVersion：6 使用es6
  - jsx: true 启用JSX
  - experimentalObjectRestSpread: true 启用实验性Object rest/spread properties
- env: 环境定义了预定义的全局变量
  - browser: true browser全局变量
  - node: true Node.js全局变量和Node.js作用域
  - es6: 支持除模块外所有ECMAScript 6特性（该选项会自动设置ecmaVersion解析器选项为6）
- globals: 使用的全局变量，变量等于true允许亦是被重写，false不允许被重写  
- rules: 项目中使用的规则(http://eslint.cn/docs/rules/)
  - off或0 关闭规则
  - warn或1 开启规则，使用警告级别的错误，不会导致程序退出
  - erro或2 开启规则，使用错误级别的错误，程序退出