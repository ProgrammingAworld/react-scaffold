## 配置须知

环境依赖：

- `node`
- `ruby`

#### 镜像配置

```bash
#ruby
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/

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

## 启动调试环境

```bash
gulp watch
```