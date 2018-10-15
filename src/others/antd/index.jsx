/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import PureComponent from 'base/ReactComponentBase'
import dialog from 'dialog'
import { Table, Button } from 'antd'
import './scss/index.scss'

class AntdView extends PureComponent {
    state = {
        selectedRowKeys: []
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
    
    render() {
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

        const { selectedRowKeys } = this.state;

        return (
            <div className="antd-main-others">
                <Button type="primary" onClick={this.showModal}>弹窗</Button>
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
}

export default AntdView
