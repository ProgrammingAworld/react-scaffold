/**
 * Created by anchao on 2016/5/26.
 */

import ProjectDetailView from './view/ProjectDetailView';

class ProjectMain{
    init(){
        ReactDOM.render(<ProjectDetailView />,document.getElementById('chief'));
    }
}

export default ProjectMain;