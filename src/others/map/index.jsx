/**
 * 功能：地图测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import { Map, Base } from 'rc-bmap'
import './scss/index.scss'

const { Point } = Base

const MapSimple = function () {
    return (
        <div className="customcontrol-map">
            <Map
                ak="nvwlnIROmNKspQWn4IaR0g1OebViUF43"
                scrollWheelZoom
                zoom={16}
            >
                <Point name="center" lng="116.332782" lat="40.007978" />
            </Map>
        </div>
    )
}


export default MapSimple
