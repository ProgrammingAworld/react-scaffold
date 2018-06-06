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
gulp watch
```

## 使用说明
```
1. actionCreator内可配置ajax请求和静态的action设置
   ajax示例说明：
   getAllTodo: {
       url: '/api/getTodos', // ajax请求地址（必写）
       method: 'GET', // ajax请求方式（必写）
       hasLoading: true, // ajax请求时是否出现loading画面，默认是true,非必写
       handleError: true, // ajax出现错误时默认提醒，非必写
       needFormData: false, // ajax执行成功后是否需要把请求参数返回给成功function
       actionType: actionTypes.GET_ALL_TODO // ajax成功之后执行的action动作
   },
   非ajax示例：
   checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO)
2. reducer内可配置ajax的发送前pre，成功success， 失败error，无论如何always的配置
   ajax示例说明：
   // 只有需要放到store里的state才需要这里设置，每一项都不一定是必需写的！！！
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