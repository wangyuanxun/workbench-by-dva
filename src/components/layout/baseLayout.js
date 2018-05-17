import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'dva';
import config from '../../utils/config'
import styles from './baseLayout.less'
import logo from '../../assets/images/logo.svg'

const { Sider, Header, Content } = Layout

class BaseLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    collapsedChange = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    initMenu = (data, showIcon) => {
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

    componentDidMount() {
        this.props.dispatch({
            type: 'sys/getMenuList'
        })
    }

    render() {
        let menuData = this.props.sys.menuData;
        return (
            <DocumentTitle title={config.sys.name}>
                <Layout>
                    <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
                        <div className={styles.logo}>
                            <img src={logo} alt='logo' />
                            <h1>{config.sys.name}</h1>
                        </div>
                        <Menu theme="dark" mode="inline" inlineCollapsed={this.state.collapsed}>
                            {this.initMenu(menuData, true)}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className={styles.layout_header}>
                            <Icon className={styles.trigger} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.collapsedChange} />
                        </Header>
                        <Content></Content>
                    </Layout>
                </Layout>
            </DocumentTitle>
        )
    }
}

export default connect(({ sys }) => ({ sys }))(BaseLayout)