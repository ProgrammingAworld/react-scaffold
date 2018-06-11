import { React, PropTypes } from 'framework/Util'

function Animal(props) {
    return (
        <div>动物名称：{ props.match.params.animal }</div>
    )
}

Animal.propTypes = {
    match: PropTypes.object.isRequired
}

export default Animal
