/**
 * Created by anchao on 2017/2/27.
 */

import {React,PropTypes, PureRenderMixin} from '../common/Util';
class ReactComponentBase extends React.Component{
    constructor(props, context, updater) {
        super(props);

        this.stateChange = this.stateChange.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        //禁止空格
        this.forbitBlackSpace = this.forbitBlackSpace.bind(this);
        //禁止默认事件并禁止冒泡
        this.forbitDefaultEvent = this.forbitDefaultEvent.bind(this);
    }

    // componentWillMount(){
    //     //服务器端使用，之后render()
    // }
    //
    // componentDidMount(){
    //
    // }
    //
    // componentWillReceiveProps(nextProps){
    //     //you may compare this.props and nextProps and perform state transitions using this.setState() in this method
    // }
    //
    // shouldComponentUpdate(nextProps, nextState){
    //     //If you are confident you want to write it by hand, you may compare this.props with nextProps and this.state with nextState and return false to tell React the update can be skipped.
    // }
    //
    // componentWillUpdate(nextProps, nextState){
    //     //you cannot call this.setState() here. If you need to update state in response to a prop change, use componentWillReceiveProps() instead
    // }
    //
    // componentDidUpdate(prevProps, prevState){
    //
    // }
    //
    // componentWillUnmount(){
    //
    // }

    forbitBlackSpace(e) {
        if (e.which == 32) {
            e.preventDefault();
        }
    }

    forbitDefaultEvent(e){
        e.preventDefault();
        e.stopPropagation();
    }

    stateChange(key,value,fnCb=()=>{}){
        if(typeof key == 'string'){
            this.setState({
                [key]:value
            },fnCb);
        }else {
            //key可以传一个对象
            //value，则为一个回调
            this.setState(key,value);
        }
    }

    render() {
        return null;
    }
}

ReactComponentBase.contextTypes = {
    router: PropTypes.object
};

export default ReactComponentBase;