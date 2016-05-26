/**
 * Created by anchao on 2016/5/26.
 */
import TopRowView from './TopRowView';
import ListTableView from './ListTableView';
import PageView from './PageView';

let ProjectListView = React.createClass({
    render(){
        return (
            <div id="project-list">
                <TopRowView />
                <div className="project-list-table">
                    <ListTableView />
                    <PageView />
                </div>
            </div>
        )
    }
});

export default ProjectListView;