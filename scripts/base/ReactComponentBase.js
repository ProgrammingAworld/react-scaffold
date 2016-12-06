/**
 * Created by anchao on 16-12-6.
 */

import {React, PureRenderMixin} from '../common/Util';
class ReactComponentBase extends React.Component{
    constructor(props, context, updater) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return null;
    }
}

ReactComponentBase.contextTypes = {
    router: React.PropTypes.object
}

export default ReactComponentBase;