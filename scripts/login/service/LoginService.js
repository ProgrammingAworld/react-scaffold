/**
 * Created by anchao on 2016/7/26.
 */

import {$} from '../../common/Util';
import BaseService from '../../base/BaseService';

export default class LoginService extends BaseService {
    static login(oSettings) {
        return this.postWithParameter('http://k1222.mlamp.co/tuning/services/pass/login',oSettings);
    }
    static PKIlogin(){
        return $.get('https://qbbigdata.sjzs.eb:8443/tuning/services/console/gongan/auth/pkiLogin');
    }
}