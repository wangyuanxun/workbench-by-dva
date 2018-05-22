import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import config from '../../utils/config'
import styles from './UserSider.less'
import logo from '../../assets/images/logo.svg'

const { Sider } = Layout

class UserSider extends React.Component {
    initMenu(data, showIcon) {
        let defaultIcon = 'profile';
        return (
            data.map((item) => {
                if (item.children && item.children.length > 0) {
                    return (
                        <Menu.SubMenu key={item.id} title={<span><Icon type={item.menuIcon || defaultIcon} /><span>{item.menuName}</span></span>}>
                            {this.initMenu(item.children, false)}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.id}>
                            {showIcon && <Icon type={item.menuIcon || defaultIcon} />}
                            <span>{item.menuName}</span>
                        </Menu.Item>
                    )
                }
            })
        )
    }

    render() {
        let menuData = this.props.data;
        return (
            <Sider trigger={null} collapsible={true} collapsed={this.props.collapsed}>
                <div className={styles.logo}>
                    <img src={logo} alt='logo' />
                    <h1>{config.name}</h1>
                </div>
                <Menu theme="dark" mode="inline">
                    {this.initMenu(menuData, true)}
                </Menu>
            </Sider>
        )
    }
}

export default UserSider