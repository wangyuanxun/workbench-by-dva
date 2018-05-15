import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'dva'
import PropTypes from 'prop-types'
const { Sider, Header, Content } = Layout

class UserLayout extends React.Component {
    propTypes = {
        collapsed: PropTypes.bool,
        menuData: PropTypes.array
    }

    state = {
        collapsed: false
    }

    collapsedChange = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    renderMenu = (data) => {
        return (
            data.map((item) => {
                if (item.children && item.children.length > 0) {
                    return (
                        <Menu.SubMenu key={item.id} title={<span><Icon type={item.menu_icon} /> <span>{item.menu_name}</span></span>}>
                            {this.renderMenu(item.children)}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.id}>
                            <Icon type={item.menu_icon} />
                            <span>{item.menu_name}</span>
                        </Menu.Item>
                    )
                }
            })
        )
    }

    render() {
        const { menuData } = this.props;
        return (
            <Layout>
                <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
                    <Menu theme="dark" mode="inline">
                        {this.renderMenu(menuData)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.collapsedChange} />
                    </Header>
                    <Content></Content>
                </Layout>
            </Layout>
        )
    }
}

export default connect()(UserLayout);