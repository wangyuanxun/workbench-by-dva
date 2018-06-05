import React from 'react'
import { connect } from 'dva'
import { Card, Table, Button, Switch, Modal, Form, Row, Col, Input, Select } from 'antd'
import styles from './Menu.less'
import '../../assets/styles/icon.less'

const FormItem = Form.Item
const Option = Select.Option

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRowKeys: [],
            selectedRowKeys: [],
            modalTitle: '',
            modalOkText: ''
        }
        this.onExpandedRowsChange = this.onExpandedRowsChange.bind(this);
        this.onExpandedAllRows = this.onExpandedAllRows.bind(this);
        this.onCollapseAllRows = this.onCollapseAllRows.bind(this);
        this.onReLoad = this.onReLoad.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDel = this.onDel.bind(this);
        this.modalOk = this.modalOk.bind(this);
        this.invisibleModal = this.invisibleModal.bind(this);
    }
    // 行展开变化事件
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
        this.props.dispatch({
            type: 'sys/getMenuList',
            payload: { all: true }
        })
    }
    // 显示modal
    visibleModal() {
        this.props.dispatch({
            type: 'sys/visibleModal'
        })
    }
    // 隐藏modal
    invisibleModal() {
        this.props.dispatch({
            type: 'sys/invisibleModal'
        })
    }
    // 加载一级菜单
    loadParentMenu() {
        this.props.dispatch({
            type: 'sys/getParentMenu'
        })
    }
    // 新增
    onAdd() {
        this.setState({ modalTitle: '菜单添加', modalOkText: '确认添加' });
        this.visibleModal();
        this.loadParentMenu();
    }
    // 编辑
    onEdit() {
        this.setState({ modalTitle: '菜单编辑', modalOkText: '确认编辑' });
        this.visibleModal();
        this.loadParentMenu();
        this.props.dispatch({ type: 'sys/loadMenu', payload: { id: this.state.selectedRowKeys[0] } })
    }
    // 删除
    onDel() {
        let dispatch = this.props.dispatch;
        Modal.confirm({
            title: '系统提示',
            content: '确认删除选中行吗?',
            okText: '确定删除',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'sys/delMenu',
                    payload: { ids: this.state.selectedRowKeys.join(',') }
                })
                this.setState({ selectedRowKeys: [] });
            }
        })
    }
    // modal提交
    modalOk() {
        this.props.form.validateFields((err, value) => {
            if (!err) {
                this.props.dispatch({
                    type: 'sys/addOrUpdateMenu',
                    payload: { ...value }
                })
            }
        })
    }
    render() {
        let props = this.props,
            menuData = props.sys.menuData,
            parentMenuData = props.sys.parentMenuData,
            visibleModal = props.sys.visibleModal,
            sysMenu = props.sys.sysMenu,
            { getFieldDecorator } = props.form;
        let rowKey = (record) => (record.id);
        let rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys: selectedRowKeys })
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
        let modalFormColLayout = {
            span: 12
        }
        let modalFormItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        }
        let parentMenuOptions = parentMenuData.map(item => <Option key={item.id} value={item.id}>{item.menuName}</Option>)
        return (
            <Card bordered={false}>
                <div className={styles.tool_box}>
                    <Button.Group>
                        <Button type='primary' ghost={true} onClick={this.onExpandedAllRows}>展开所有</Button>
                        <Button type='primary' ghost={true} onClick={this.onCollapseAllRows}>收缩所有</Button>
                        <Button type='primary' ghost={true} onClick={this.onReLoad}>刷新</Button>
                        <Button type='primary' ghost={true} onClick={this.onAdd}>新增</Button>
                        <Button type='primary' ghost={true} disabled={this.state.selectedRowKeys.length !== 1} onClick={this.onEdit}>编辑</Button>
                        <Button type='primary' ghost={true} disabled={this.state.selectedRowKeys <= 0} onClick={this.onDel}>删除</Button>
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
                    width='800px'
                    destroyOnClose={true}
                    title={this.state.modalTitle}
                    visible={visibleModal}
                    okText={this.state.modalOkText}
                    cancelText='关闭'
                    onOk={this.modalOk}
                    onCancel={this.invisibleModal}>
                    <Form>
                        {
                            getFieldDecorator('id', {
                                initialValue: sysMenu ? sysMenu.id : 0
                            })(<Input type='hidden' placeholder='菜单编号' />)
                        }
                        <Row>
                            <Col {...modalFormColLayout}>
                                <FormItem label='所属菜单' {...modalFormItemLayout}>
                                    {
                                        getFieldDecorator('menuName', {
                                            initialValue: sysMenu ? sysMenu.menuName : '',
                                            rules: [{ required: true, message: '请输入菜单名称' }]
                                        })(<Input placeholder='菜单名称' />)
                                    }
                                </FormItem>
                            </Col>
                            <Col {...modalFormColLayout}>
                                <FormItem label='所属菜单' {...modalFormItemLayout}>
                                    {
                                        getFieldDecorator('parentId', {
                                            initialValue: sysMenu ? sysMenu.parentId : 0
                                        })(
                                            <Select>
                                                <Option key={0} value={0}>请选择</Option>
                                                {parentMenuOptions}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...modalFormColLayout}>
                                <FormItem label='链接地址' {...modalFormItemLayout}>
                                    {
                                        getFieldDecorator('linkUrl', {
                                            initialValue: sysMenu ? sysMenu.linkUrl : ''
                                        })(<Input placeholder='链接地址' />)
                                    }
                                </FormItem>
                            </Col>
                            <Col {...modalFormColLayout}>
                                <FormItem label='菜单图标' {...modalFormItemLayout}>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...modalFormColLayout}>
                                <FormItem label='状态' {...modalFormItemLayout}>
                                    {
                                        getFieldDecorator('state', {
                                            initialValue: sysMenu ? sysMenu.state : 1
                                        })(
                                            <Select>
                                                <Option value={1}>启用</Option>
                                                <Option value={2}>禁用</Option>
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Card >
        )
    }
    componentWillReceiveProps() {
        // 展开菜单
        this.onExpandedAllRows();
    }
}

const MenuForm = Form.create()(Menu);

export default connect((sys) => (sys))(MenuForm)