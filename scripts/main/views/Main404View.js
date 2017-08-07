/**
 * Created by anchao on 2016/7/26.
 */
import {React} from '../../common/Util';
import ReactComponentBase from '../../base/ReactComponentBase';

class Main404View extends ReactComponentBase {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="main404"><div><a href="#/">返回</a></div></div>);
    }
}

export default Main404View;