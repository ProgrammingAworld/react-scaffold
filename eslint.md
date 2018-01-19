## eslint参数说明

- extends："airbnb" 使用了eslint-config-airbnb
- parser: "babel-eslint" 对Babel解析器的包装使其与 ESLint 兼容
- parserOptions: 非es5特性下正常工作，此属性是必须的
  - sourceType: "module",
