import { React, PropTypes } from 'common/Util'

function Animal(props) {
    return (
        <div>动物名称：{ props.match.params.animal }</div>
    )
}

Animal.propTypes = {
    match: PropTypes.object.isRequired
}

export default Animal
