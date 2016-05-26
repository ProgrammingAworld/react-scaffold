/**
 * Created by anchao on 2016/5/26.
 */
import ApplicationView from './view/ApplicationView';

class ApplicationMain {
    init() {
        let that = this;
        Tools.routerM({
            routes: {
                "myApplist": "myApplist"
            },
            myApplist: function () {
                that.applicationInit();
            }
        }, 'myApplist');
    }

    applicationInit() {
        ReactDOM.render(<ApplicationView />, document.getElementById('chief'));
    }
}

export default ApplicationMain;