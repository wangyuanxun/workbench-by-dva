import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout, message } from 'antd'
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import UserHeader from './UserHeader'
import UsereSider from './UserSider'
import config from '../../utils/config'
import { noLayout } from '../../utils/util'

const { Content } = Layout

class UserLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
        this.collapsedChange = this.collapsedChange.bind(this);
        this.menuSelectHandle = this.menuSelectHandle.bind(this);
    }

    collapsedChange() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    menuSelectHandle(key) {
        let { dispatch } = this.props,
            menuData = this.props.sys.menuData,
            keyArray = key.split('_'),
            menu = menuData;
        while (keyArray.length > 0) {
            let menuKey = parseInt(keyArray.shift(), 10),
                parentMenu = menu.find((item) => item.id === menuKey);
            menu = keyArray.length > 0 ? parentMenu.children : parentMenu;
        }
        menu ? dispatch(routerRedux.push(menu.linkUrl)) : message.error('获取菜单路径失败...');
    }

    render() {
        let { location } = this.props,
            menuData = this.props.sys.menuData;
        let userLayout = !noLayout(location.pathname) ?
            (
                <Layout>
                    <UsereSider collapsed={this.state.collapsed} data={menuData} menuSelect={this.menuSelectHandle} />
                    <Layout>
                        <UserHeader collapsed={this.state.collapsed} collapsedChange={this.collapsedChange} />
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            ) :
            (
                <Layout>
                    {this.props.children}
                </Layout>
            );
        return (
            <DocumentTitle title={config.name}>
                {userLayout}
            </DocumentTitle>
        )
    }
}

export default connect(({ sys }) => ({ sys }))(UserLayout)