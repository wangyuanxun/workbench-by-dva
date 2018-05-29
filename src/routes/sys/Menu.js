import React from 'react'
import { connect } from 'dva'
import { Card, Table, Button, Icon, Tag } from 'antd'
import styles from './Menu.less'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canEdit: true,
            canDel: true,
            selectedRowKeys: []
        }
        this.onRow = this.onRow.bind(this);
    }
    onRow(record, index) {
        return {
            onClick: () => {
                this.setState({ selectedRowKeys: record });
            }
        }
    }
    render() {
        let props = this.props,
            menuData = props.sys.menuData;
        let rowKey = (record) => (record.id);
        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRows.length === 1) {
                    this.setState({ canEdit: false, canDel: false })
                } else {
                    this.setState({ canEdit: true, canDel: true })
                }
            }
        }
        let columns = [
            { title: '菜单名称', dataIndex: 'menuName' },
            { title: '链接地址', dataIndex: 'linkUrl' },
            {
                title: '状态', dataIndex: 'state', render: (text, record) => {
                    if (text === 1) {
                        return (<Tag>启用</Tag>)
                    } else {
                        return (<Tag color='red'>禁用</Tag>)
                    }
                }
            },
            {
                title: '排序', render: (text, record) =>
                    (
                        <span>
                            <Icon type='arrow-up' />
                            <Icon type='arrow-down' />
                        </span>
                    )
            }
        ]
        return (
            <Card bordered={false}>
                <div className={styles.tool_box}>
                    <Button.Group>
                        <Button type='primary' ghost={true}>展开所有</Button>
                        <Button type='primary' ghost={true}>收缩所有</Button>
                        <Button type='primary' ghost={true}>刷新</Button>
                        <Button type='primary' ghost={true}>新增</Button>
                        <Button type='primary' ghost={true} disabled={this.state.canEdit}>编辑</Button>
                        <Button type='primary' ghost={true} disabled={this.state.canDel}>删除</Button>
                    </Button.Group>
                </div>
                <Table
                    size={'small'}
                    rowKey={rowKey}
                    rowSelection={rowSelection}
                    pagination={false}
                    columns={columns}
                    dataSource={menuData}
                    onRow={this.onRow} />
            </Card>
        )
    }
}

export default connect((sys) => (sys))(Menu)