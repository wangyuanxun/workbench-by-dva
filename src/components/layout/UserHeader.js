import React from 'react'
import { Layout, Icon, Badge, Dropdown, Menu } from 'antd'
import styles from './UserHeader.less'
import logo from '../../assets/images/logo.svg'

const { Header } = Layout

class UserHeader extends React.Component {
    render() {
        let realName = localStorage.getItem('REAL_NAME');
        let menu = (
            <Menu>
                <Menu.Item>
                    <span><Icon type='setting' /><span className={styles.menu_item}>设置</span></span>
                </Menu.Item>
                <Menu.Item>
                    <span><Icon type='user' /><span className={styles.menu_item}>个人中心</span></span>
                </Menu.Item>
                <Menu.Item>
                    <span><Icon type='edit' /><span className={styles.menu_item}>修改密码</span></span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
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