import React from 'react'
import { Link } from 'dva/router'
import { Layout, Menu, Icon } from 'antd'
import config from '../../utils/config'
import styles from './UserSider.less'
import logo from '../../assets/images/logo.svg'

const { Sider } = Layout

class UserSider extends React.Component {
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
                            {item.linkUrl ? <Link to={item.linkUrl}>{item.menuName}</Link> : <span>{item.menuName}</span>}
                        </Menu.Item>
                    )
                }
            })
        )
    }
    render() {
        let props = this.props,
            collapsed = props.collapsed,
            menuData = props.data,
            pathname = props.pathname,
            menuLayout = null,
            defaultOpenKeys = [],
            defaultSelectedKeys = [];
        if (menuData.length > 0) {
            let getMenuKeys = (data, parentId) => {
                data.forEach((item) => {
                    if (item.linkUrl === pathname) {
                        defaultSelectedKeys.length = 0;
                        defaultSelectedKeys.push(parentId + '_' + item.id);
                        if (parentId !== '') {
                            defaultOpenKeys.length = 0;
                            defaultOpenKeys.push(parentId);
                        }
                    }
                    if (item.children && item.children.length > 0)
                        getMenuKeys(item.children, item.id + '');
                })
            }
            getMenuKeys(menuData, '');

            menuLayout = (
                <Menu theme='dark' mode='inline' inlineCollapsed={collapsed} defaultOpenKeys={defaultOpenKeys} defaultSelectedKeys={defaultSelectedKeys}>
                    {this.initMenu(menuData, '')}
                </Menu>
            )
        }
        return (
            <Sider trigger={null} collapsible={true} collapsed={collapsed}>
                <div className={styles.logo}>
                    <img src={logo} alt='logo' />
                    <h1>{config.name}</h1>
                </div>
                {menuLayout}
            </Sider>
        )
    }
}

export default UserSider