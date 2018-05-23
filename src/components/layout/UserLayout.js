import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout } from 'antd'
import { connect } from 'dva';
import UserHeader from './UserHeader'
import UsereSider from './UserSider'
import config from '../../utils/config'
import { noLayout } from '../../utils/util'

const { Content } = Layout

class UserLayout extends React.Component {
    state = {
        collapsed: false
    }

    collapsedChange() {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        let { location } = this.props;
        let menuData = this.props.sys.menuData
        let userLayout = !noLayout(location.pathname) ?
            <Layout>
                <UsereSider collapsed={this.state.collapsed} data={menuData} />
                <Layout>
                    <UserHeader collapsed={this.state.collapsed} collapsedChange={this.collapsedChange} />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout> :
            <Layout>
                {this.props.children}
            </Layout>;
        return (
            <DocumentTitle title={config.name}>
                {userLayout}
            </DocumentTitle>
        )
    }
}

export default connect(({ sys }) => ({ sys }))(UserLayout)