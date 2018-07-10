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
npm run start
npm run server
```
## 提交规范
```
格式：<type>(<scope>): <subject>

type: 用于说明commit的类别，中允许使用以下7个标识。
      feat：新功能（feature）
      fix：修补bug
      docs：文档（documentation）
      style： 格式（不影响代码运行的变动）
      refactor：重构（即不是新增功能，也不是修改bug的代码变动）
      test：增加测试
      chore：构建过程或辅助工具的变动
scope: 用于说明commit的影响范围，比如store,reducer,view,根据不同位置来决定。
subject: 是commit的简短描述，不超过50个字符。
      1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
      2.第一个字母小写
      3.结尾不加句号（.）   
      
可以参考：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html           
```
## 开发使用说明
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