/**
 * Created by anchao on 2016/6/29.
 */
import {React} from '../../common/Util';

let HeaderView = React.createClass({
    render: function () {
        let sActive = this.props.active;
        let aLis = [];
        [
            {href: "core", text: "首页", icoCls:"icon-homepage"},
            {href: "graph", text: "图析", icoCls:"icon-mappinganalysis2"},
            {href: "map", text: "地图", icoCls:"icon-map2"},
            {href: "file", text: "档案", icoCls:"icon-archives"},
            {href: "cooperate", text: "协作", icoCls:"icon-cooperation"},
            {href: "app", text: "应用", icoCls:"icon-icon_application"}
        ].forEach((oItem,index) =>{
            let sHref = oItem.href;
            if(sHref == sActive){
                aLis.push(<li key={index} className="active"><a href={sHref+".html"}><span className={"icon "+oItem.icoCls}></span><span>{oItem.text}</span></a></li>);
            }else {
                aLis.push(<li key={index}><a href={sHref+".html"}><span className={"icon "+oItem.icoCls}></span><span>{oItem.text}</span></a></li>);
            }
        });

        return (
            <div className="clearfix">
                <div className="pull-left" id="logo"></div>
                <div className="pull-left navigation">
                    <ul className="list-unstyled list-inline">
                        { aLis }
                    </ul>
                </div>
                <div className="pull-right"></div>
            </div>
        );
    }
});

export default HeaderView;