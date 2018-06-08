import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout } from 'antd'
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import UserHeader from './UserHeader'
import UsereSider from './UserSider'
import config from '../../utils/config'
import { noLayout } from '../../utils/util'
import { userLogout } from '../../utils/auth'
import styles from './UserLayout.less'

const { Content } = Layout

class UserLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
        this.onCollapsedChange = this.onCollapsedChange.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    onCollapsedChange() {
        this.setState({ collapsed: !this.state.collapsed });
    }
    onLogout() {
        userLogout();
        let { dispatch } = this.props;
        dispatch(routerRedux.push('/account/login'));
    }
    render() {
        let { location } = this.props,
            layout = this.props.layout,
            menuData = layout.menuData,
            defaultOpenKeys = layout.defaultOpenKeys,
            defaultSelectedKeys = layout.defaultSelectedKeys;

        let userLayout = !noLayout(location.pathname) ?
            (
                <Layout>
                    <UsereSider
                        collapsed={this.state.collapsed}
                        data={menuData}
                        defaultOpenKeys={defaultOpenKeys}
                        defaultSelectedKeys={defaultSelectedKeys}
                    />
                    <Layout>
                        <UserHeader
                            collapsed={this.state.collapsed}
                            collapsedChange={this.onCollapsedChange}
                            logout={this.onLogout}
                        />
                        <Content className={styles.layout_content}>
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

export default connect(({ layout }) => ({ layout }))(UserLayout)