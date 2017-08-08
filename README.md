## 配置须知

环境依赖：

- `node`
- `ruby`

#### 镜像配置

```bash
#ruby
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
```

#### 安装依赖包

```bash
gem install sass

gem install compass

npm install
```

#### 安装额外依赖

```bash
npm install package_name --save
npm install package_name --dev-save
```

#### 特别说明
```
安装开发插件时有几个插件有先后顺序，如果运行不起来，请先自行卸载以下提到的插件
然后按顺序安装以下插件
1.webpack
2.webpack-stream
3.babel-core
4.babel-loader
5.babel-preset-env
6.babel-preset-react
7.babel-preset-stage-0
8.babel-polyfill
```
## 启动调试环境

```bash
gulp watch
```