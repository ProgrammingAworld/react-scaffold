/**
 * Created by anchao on 17-3-7.
 */

/**
 * Created by anchao on 17-3-7.
 * checked:bool
 * checkedChange:修改checked值
 */
import React from 'react';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps={
        value:"",
        checked:false,
        checkedChange:()=>{}
    }

    render(){
        return <i value={this.props.value} className={this.props.checked?"fa fa-check-square-o fa-lg fa-fw":"fa fa-square-o fa-lg fa-fw"} onClick={this.props.checkedChange}></i>
    }
}