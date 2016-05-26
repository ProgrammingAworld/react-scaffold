/**
 * Created by anchao on 2016/5/26.
 */
import ProjectListView from './view/ProjectListView';
import ProjectDetailView from './view/ProjectDetailView';

class ProjectMain{
    init(){
        let that = this;
        Tools.routerM({
            routes: {
                "projectlist/:pagesize/:pageindex": "pagination",
                "projectdetail/:projectid": "projectdetail"
            },
            pagination: function (pagesize, pageindex) {
                that.projectListInit(pagesize,pageindex);
            },
            projectdetail: function (id) {
                that.projectDetailInit(id);
            }
        }, 'projectlist/20/1');
    }

    projectListInit(pagesize,pageindex){
        ReactDOM.render(<ProjectListView />,document.getElementById('chief'));
    }

    projectDetailInit(id){
        ReactDOM.render(<ProjectDetailView />,document.getElementById('chief'));
    }
}

export default ProjectMain;