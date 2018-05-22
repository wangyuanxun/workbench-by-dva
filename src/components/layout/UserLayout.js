import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout } from 'antd'
import { connect } from 'dva';
import UserHeader from './UserHeader'
import UsereSider from './UserSider'
import config from '../../utils/config'

const { Content } = Layout

class UserLayout extends React.Component {
    state = {
        collapsed: false
    }

    collapsedChange() {
        this.setState({ collapsed: !this.state.collapsed })
    }

    noLayout(path) {
        let no_layout = false;
        for (var i = 0; i < config.no_layout_url.length; i++) {
            if (config.no_layout_url[i] === path) {
                no_layout = true;
                break;
            }
        }
        return no_layout;
    }

    render() {
        let { location } = this.props;
        let menuData = this.props.sys.menuData
        let userLayout = !this.noLayout(location.pathname) ?
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

    componentDidMount() {
        let { location } = this.props;
        if (!this.noLayout(location.pathname)) {
            this.props.dispatch({
                type: 'sys/getMenuList'
            })
        }
    }
}

export default connect(({ sys }) => ({ sys }))(UserLayout)