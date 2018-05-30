import React from 'react'
import { connect } from 'dva'
import { Card, Table, Button, Switch, Modal } from 'antd'
import styles from './Menu.less'
import '../../assets/styles/icon.less'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canEdit: true,
            canDel: true,
            expandedRowKeys: [],
            modalTitle: '',
            modalOkText: '',
            modalVisible: false
        }
        this.onExpandedRowsChange = this.onExpandedRowsChange.bind(this);
        this.onExpandedAllRows = this.onExpandedAllRows.bind(this);
        this.onCollapseAllRows = this.onCollapseAllRows.bind(this);
        this.onReLoad = this.onReLoad.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDel = this.onDel.bind(this);
        this.modalOk = this.modalOk.bind(this);
        this.modalCancel = this.modalCancel.bind(this);
    }
    onExpandedRowsChange(expandedRows) {
        this.setState({ expandedRowKeys: expandedRows })
    }
    // 展开所有
    onExpandedAllRows() {
        let props = this.props,
            menuData = props.sys.menuData,
            expandedRowKeys = [];
        menuData.forEach((item) => { expandedRowKeys.push(item.id) });
        this.setState({ expandedRowKeys: expandedRowKeys })
    }
    // 收缩所有
    onCollapseAllRows() {
        this.setState({ expandedRowKeys: [] });
    }
    // 刷新
    onReLoad() {

    }
    // 新增
    onAdd() {
        this.setState({ modalTitle: '菜单添加', modalOkText: '确认添加', modalVisible: true });
    }
    // 编辑
    onEdit() {
        this.setState({ modalTitle: '菜单编辑', modalOkText: '确认编辑', modalVisible: true });
    }
    // 删除
    onDel() {
        Modal.confirm({
            title: '系统提示',
            content: '确认删除选中行吗?',
            okText: '确定删除',
            cancelText: '取消',
            onOk: () => {

            }
        })
    }
    // modal提交
    modalOk() {

    }
    // modal取消
    modalCancel() {
        this.setState({ modalVisible: false });
    }
    render() {
        let props = this.props,
            menuData = props.sys.menuData;
        let rowKey = (record) => (record.id);
        let rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRows.length === 1) {
                    this.setState({ canEdit: false })
                } else {
                    this.setState({ canEdit: true })
                }
                if (selectedRows.length >= 1) {
                    this.setState({ canDel: false })
                } else {
                    this.setState({ canDel: true })
                }
            }
        }
        let columns = [
            { title: '菜单名称', dataIndex: 'menuName' },
            { title: '链接地址', dataIndex: 'linkUrl' },
            {
                title: '状态', align: 'center', dataIndex: 'state', render: (text, record) => {
                    return (
                        <Switch
                            checkedChildren='启用'
                            unCheckedChildren='禁用'
                            checked={text === 1}
                            onChange={(checked) => {
                                let text = checked ? '启用' : '禁用';
                                Modal.confirm({
                                    title: '系统提示',
                                    content: '确定' + text + '菜单吗?',
                                    okText: '确定' + text,
                                    cancelText: '取消',
                                    onOk: () => {
                                        this.props.dispatch({ type: 'sys/menuStateChange', payload: { id: record.id, checked: checked } })
                                    }
                                })
                            }}
                        />
                    )
                }
            },
            {
                title: '排序', align: 'center', render: (text, record) =>
                    (
                        <Button.Group>
                            <Button type='primary' ghost={true} icon='new-to-up'></Button>
                            <Button type='primary' ghost={true} icon='arrow-up'></Button>
                            <Button type='primary' ghost={true} icon='arrow-down'></Button>
                            <Button type='primary' ghost={true} icon='new-to-down'></Button>
                        </Button.Group>
                    )
            }
        ]
        return (
            <Card bordered={false}>
                <div className={styles.tool_box}>
                    <Button.Group>
                        <Button type='primary' ghost={true} onClick={this.onExpandedAllRows}>展开所有</Button>
                        <Button type='primary' ghost={true} onClick={this.onCollapseAllRows}>收缩所有</Button>
                        <Button type='primary' ghost={true} onClick={this.onReLoad}>刷新</Button>
                        <Button type='primary' ghost={true} onClick={this.onAdd}>新增</Button>
                        <Button type='primary' ghost={true} disabled={this.state.canEdit} onClick={this.onEdit}>编辑</Button>
                        <Button type='primary' ghost={true} disabled={this.state.canDel} onClick={this.onDel}>删除</Button>
                    </Button.Group>
                </div>
                <Table
                    size={'small'}
                    rowKey={rowKey}
                    rowSelection={rowSelection}
                    pagination={false}
                    columns={columns}
                    dataSource={menuData}
                    expandedRowKeys={this.state.expandedRowKeys}
                    onExpandedRowsChange={this.onExpandedRowsChange} />
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.modalVisible}
                    okText={this.state.modalOkText}
                    cancelText='关闭'
                    closable={false}
                    onOk={this.modalOk}
                    onCancel={this.modalCancel}>

                </Modal>
            </Card>
        )
    }
    componentWillReceiveProps() {
        this.onExpandedAllRows();
    }
}

export default connect((sys) => (sys))(Menu)