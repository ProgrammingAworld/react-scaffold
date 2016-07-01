/**
 * Created by anchao on 2016/6/29.
 */
import {$} from '../../common/Util';
import BaseAPI from '../../Base/BaseAPI';

export default class TodoAPI extends BaseAPI {
    /**
     * 获得todos列表数据
     * @returns {*}
     */
    static getAllTodo(){
        return $.get('../simulates/todos.json');
    }
}