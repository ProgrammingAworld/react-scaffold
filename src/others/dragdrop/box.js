import { React } from 'framework/Util'
import { DragSource } from 'react-dnd'
import ReactComponentBase from 'base/ReactComponentBase'
import Types from './types'

const boxSource = {
    beginDrag(props){
        return {
            name: props.name
        }
    },
    endDrag(props, monitor){
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            alert(`${item.name} into ${dropResult.name}`)
        }
    }
}

@DragSource(Types.BOX, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

class Box extends ReactComponentBase {
    render(){
        const {
            connectDragSource, isDragging, name
        } = this.props
        return connectDragSource && connectDragSource(<div style={{ opacity: isDragging ? 0 : 1 }}>{name}</div>)
    }
}

export default Box
