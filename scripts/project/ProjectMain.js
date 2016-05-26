/**
 * Created by anchao on 2016/5/26.
 */
import ProjectList from './ProjectList';

class ProjectMain{
    init(){
        Tools.routerM({
            routes: {
                "projectlist/:pagesize/:pageindex": "pagination",
                "projectdetail/:projectid": "projectdetail"
            },
            pagination: function (pagesize, pageindex) {
                new ProjectList().init(pagesize,pageindex);
            },
            projectdetail: function (id) {
                //界面初始化
                new Projectdetail().init(id);
            }
        }, 'projectlist/20/1');
    }
}

export default ProjectMain;