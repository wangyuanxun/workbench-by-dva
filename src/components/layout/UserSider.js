import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import config from '../../utils/config'
import styles from './UserSider.less'
import logo from '../../assets/images/logo.svg'

const { Sider } = Layout

class UserSider extends React.Component {
    constructor(props) {
        super(props);
        this.onMenuSelect = this.onMenuSelect.bind(this);
    }
    initMenu(data, parentId) {
        let defaultIcon = 'profile';
        return (
            data.map((item) => {
                if (item.children && item.children.length > 0) {
                    return (
                        <Menu.SubMenu key={parentId + item.id} title={<span><Icon type={item.menuIcon || defaultIcon} /><span>{item.menuName}</span></span>}>
                            {this.initMenu(item.children, parentId + item.id + '_')}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={parentId + item.id}>
                            {!parentId && <Icon type={item.menuIcon || defaultIcon} />}
                            <span>{item.menuName}</span>
                        </Menu.Item>
                    )
                }
            })
        )
    }
    onMenuSelect({ key }) {
        this.props.menuSelect(key);
    }
    render() {
        let props = this.props,
            collapsed = props.collapsed,
            menuData = props.data,
            defaultOpenKeys = props.defaultOpenKeys,
            defaultSelectedKeys = props.defaultSelectedKeys;
        return (
            <Sider trigger={null} collapsible={true} collapsed={collapsed}>
                <div className={styles.logo}>
                    <img src={logo} alt='logo' />
                    <h1>{config.name}</h1>
                </div>
                <Menu
                    theme='dark'
                    mode='inline'
                    inlineCollapsed={collapsed}
                    onSelect={this.onMenuSelect}
                    openKeys={defaultOpenKeys}
                    selectedKeys={defaultSelectedKeys}
                >
                    {this.initMenu(menuData, '')}
                </Menu>
            </Sider>
        )
    }
}

export default UserSider