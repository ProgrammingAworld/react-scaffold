import { React } from 'framework/Util'
import { DropTarget } from 'react-dnd'
import classNames from 'classnames/bind'
import ReactComponentBase from 'base/ReactComponentBase'
import Types from './types'

const boxTarget = {
    drop() {
        return {
            name: 'Dustbin'
        }
    }
}

@DropTarget(Types.BOX, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
export default class Dustbin extends ReactComponentBase{
    render() {
        const {
            canDrop,
            isOver,
            connectDropTarget
        } = this.props
        const isActive = canDrop && isOver
        const HTML = (
            <div
                className={classNames('dustbin', {
                    active: isActive,
                    candrop: canDrop
                })}
            >
                {isActive ? '松手' : '拖动'}
            </div>
        )

        return (
            connectDropTarget &&
            connectDropTarget(HTML)
        )
    }
}
