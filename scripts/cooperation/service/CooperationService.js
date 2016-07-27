/**
 * Created by anchao on 2016/7/26.
 */

import {$} from '../../common/Util';
import BaseService from '../../base/BaseService';

export default class CooperationService extends BaseService {
    static getAll() {
        return $.get('../simulates/todos.json');
    }
}