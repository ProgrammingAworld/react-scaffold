import { React, PropTypes } from 'common/Util'

function Person(props) {
    return (
        <div>人物姓名：{props.match.params.person}</div>
    )
}

Person.propTypes = {
    match: PropTypes.object.isRequired
}

export default Person
