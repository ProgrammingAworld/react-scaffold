/**
 * 功能： dragdrop测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { React } from 'framework/Util'
import Dustbin from './dustbin'
import Box from './box'
import './scss/index.scss'

const DragDrop = function () {
    return (
        <DragDropContextProvider backend={HTML5Backend}>
            <div className="drag-drop">
                <div className="clearfix">
                    <Dustbin />
                </div>
                <div className="clearfix">
                    <Box name="andy" />
                    <Box name="jerry" />
                    <Box name="tom" />
                </div>
            </div>
        </DragDropContextProvider>
    )
}

export default DragDrop
