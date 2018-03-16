import { React, connect, withRouter } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

class ValidatorView extends ReactComponentBase {
    componentDidMount() {
    
    }
    
    render() {
        return (
            <div>验证组件</div>
        )
    }
}

export default connect()(withRouter(ValidatorView))
