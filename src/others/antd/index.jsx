/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React, PureComponent } from 'framework/Util'
import dialog from 'dialog'
import { Row, Col, Table, Button, Select, DatePicker } from 'antd'
import moment from 'moment'
import './scss/index.scss'

const { Option } = Select
const { RangePicker } = DatePicker

class AntdView extends PureComponent {
    state = {
        selectedRowKeys: [],
        value: [],
        mode: ['month', 'month']
    }
    
    okClick = () => {
        dialog.setFooter([
            <Button key="ok" type="primary" loading>ok</Button>
        ])
    }
    
    showModal = () => {
        dialog.open({
            title: 'hehe',
            content: <div>一些数据</div>,
            footer: [
                <Button key="ok" type="primary" onClick={this.okClick} loading={false}>ok</Button>
            ]
        })
    }
    
    antdTableRender = () => {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }]
    
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }]
    
        const { selectedRowKeys } = this.state
        
        return (
            <div className="antd-table-others">
                <Table
                    onRow={record => ({
                        onClick: () => {
                            const { key } = record
                    
                            if (selectedRowKeys.includes(key)) {
                                this.setState(prevState => ({
                                    selectedRowKeys: prevState.selectedRowKeys.filter(item => item !== key)
                                }))
                            } else {
                                this.setState(prevState => ({
                                    selectedRowKeys: prevState.selectedRowKeys.concat([key])
                                }))
                            }
                        }
                    })}
                    rowClassName={(record) => {
                        if (selectedRowKeys.includes(record.key)) {
                            return 'bg-primary'
                        }
                
                        return 'others'
                    }}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        )
    }
    
    openChange = (open) => {
        if (open) this.setState({ timeMode: 'time' })
    }
    
    panelChange = (value, mode) => {
        this.setState({
            timeMode: mode
        })
    }
    
    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            timeMode: 'time',
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1]
            ]
        })
    }
    
    render() {
        const { value, mode, timeMode } = this.state
        const dateFormat = 'YYYY/MM/DD'
        
        return (
            <div className="antd-main-others">
                <Button type="primary" onClick={this.showModal}>弹窗</Button>
                <Row gutter={16}>
                    <Col span={8}>{this.antdTableRender()}</Col>
                    <Col span={8}>
                        <Select autoFocus className="person-names">
                            <Option value="lucy">lucy</Option>
                            <Option value="lili">lili</Option>
                            <Option value="xiaoming">xiaoming</Option>
                            <Option value="xuliang">xuliang</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                        <DatePicker
                            showTime
                            mode={timeMode}
                            onOpenChange={this.openChange}
                            onPanelChange={this.panelChange}
                        />
                        <RangePicker
                            placeholder={['开始月份', '结束月份']}
                            format="YYYY-MM"
                            value={value}
                            mode={mode}
                            onPanelChange={this.handlePanelChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AntdView
