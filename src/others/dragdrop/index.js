/**
 * 功能： dragdrop测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import { DragSource } from 'react-dnd'
import ReactComponentBase from 'base/ReactComponentBase'
import './scss/index.scss'

const cardSource = {
    beginDrag(props){
        return props.text
    }
}

@DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging
}))

class Card extends ReactComponentBase {
    renderHTML(){
        const { connectDragSource, isDragging, text } = this.props
        return connectDragSource(<div style={{ opacity: isDragging ? 0.5 : 1 }}>{text}ddd</div>)
    }

    render() {
        return (
            <div className="drag-drop">
                {this.renderHTML()}
            </div>
        )
    }
}

export default Card
