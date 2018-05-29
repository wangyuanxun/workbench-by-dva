import React from 'react'
import { Layout, Icon, Badge, Dropdown, Menu, message, Modal } from 'antd'
import styles from './UserHeader.less'
import logo from '../../assets/images/logo.svg'
import { getUser } from '../../utils/auth'

const { Header } = Layout

class UserHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onMenuClick = this.onMenuClick.bind(this);
    }
    onMenuClick({ key }) {
        switch (key) {
            case '1':
                message.info('设置');
                break;
            case '2':
                message.info('个人中心');
                break;
            case '3':
                message.info('修改密码');
                break;
            case '4':
                let { logout } = this.props;
                Modal.confirm({
                    title: '系统提示',
                    content: '确认退出系统吗?',
                    okText: '确定退出',
                    cancelText: '取消',
                    onOk() {
                        logout();
                    }
                })
                break;
            default:
                message.error('系统出错');
                break;
        }
    }
    render() {
        let realName = getUser().REAL_NAME;
        let menu = (
            <Menu onClick={this.onMenuClick}>
                <Menu.Item key={1}>
                    <span><Icon type='setting' /><span className={styles.menu_item}>设置</span></span>
                </Menu.Item>
                <Menu.Item key={2}>
                    <span><Icon type='user' /><span className={styles.menu_item}>个人中心</span></span>
                </Menu.Item>
                <Menu.Item key={3}>
                    <span><Icon type='edit' /><span className={styles.menu_item}>修改密码</span></span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={4}>
                    <span><Icon type='logout' /><span className={styles.menu_item}>退出登录</span></span>
                </Menu.Item>
            </Menu>
        )
        return (
            <Header className={styles.layout_header}>
                <Icon className={styles.trigger} type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.collapsedChange} />
                <div className={styles.right}>
                    <span className={styles.action}>
                        <Badge count={0} showZero={true}>
                            <Icon className={styles.icon} type='bell' />
                        </Badge>
                    </span>
                    <Dropdown overlay={menu}>
                        <span className={styles.action}>
                            <span className={styles.avatar}>
                                <img src={logo} alt='avatar' />
                            </span>
                            <span>{realName}</span>
                        </span>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}

export default UserHeader