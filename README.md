## 配置须知

环境依赖：

- `node`
- `ruby`
- `python2.7`

#### 镜像配置

```bash
#ruby
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
```

#### 安装依赖包

```bash
gem install sass
npm install
```

#### 安装额外依赖

```bash
npm install package_name --save
npm install package_name --dev-save
```

## 启动调试环境

```bash
gulp watch 监听js,scss等文件修改，但是不支持热更新

npm run server启动mock服务
npm run dev启动js热更新服务，仅实时编译js文件
```
## 目录说明
```
本工程采用css、images、js独立管理的方式，未使用webpack管理一切的思想
每个模块独立一个文件夹，分别包含
actions: 包含actionTypes与actionCreator
         actionType命名规范：动作名_模块名
         actionCreator在使用说明中有具体示例
components: 包含此模块下的所有渲染组件
container：包含此模块下所有连接store的组件
reducers: 包含此模块下定义的所有state管理
具体完整示例可以参考todos
```
## 使用说明
```
1. actionCreator内可配置ajax请求和静态的action设置
   ajax示例说明：
   getAllTodo: {
       url: '/api/getTodos', // ajax请求地址（必写）
       method: 'GET', // ajax请求方式（必写）
       hasLoading: true, // ajax请求时是否出现loading画面，默认是true,（非必写）
       handleError: true, // ajax出现错误时是否自动提醒，默认true，（非必写）
       needFormData: false, // ajax执行成功后是否把请求参数传给action.payload，默认false，（非必写）
       actionType: actionTypes.GET_ALL_TODO // ajax成功之后执行的action动作，（非必写）
   },
   非ajax示例：
   checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO)
2. reducer内可配置ajax的发送前pre，成功success， 失败error，无论如何always的配置
   ajax示例说明：
   // 只有需要放到store里的state才需要在这里设置，每一项都不一定是必需写的！！！
   [actionTypes.GET_ALL_TODO]: {
           pre: state => ({ ...state, isLoading: true }), // 发送前的state的修改变化
           success: (state, action) => ({
               ...state,
               list: Immutable.fromJS(action.payload)
           }), // 成功后state的修改变化
           error: state => (
               { ...state, isLoading: false }
           ), // 失败后state的修改变化
           always: state => ({ ...state, isLoading: false }) // 无论成功或失败都要执行的action
       },  
   非ajax示例说明    
   [actionTypes.CLEAR_COMPLETED_TODO](state) {
           return {
               ...state,
               list: state.list.filter(oTodo => (!oTodo.get('completed')))
           }
       }     
3. reducers汇总
   3.1 每个模块reducers文件夹里都必须有一个index.js作为本模块内所有state的汇总
   3.2 在conf/reducers里把每个模块reducers/index.js汇总在一起，store即可管理所有的state        
```