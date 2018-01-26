/**
 * Created by anchao on 2016/6/29.
 */
import ServiceBase from '../../base/ServiceBase'

export default class TodoService extends ServiceBase {
    /**
     * 获得todos列表数据
     * @returns {*}
     */
    static getAllTodo() {
        return this.getWithParameter('../simulates/todos.json')
    }
}
