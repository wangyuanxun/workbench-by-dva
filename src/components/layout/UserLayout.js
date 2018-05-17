import React from 'react'
import DocumentTitle from 'react-document-title'
import { Layout} from 'antd'
import { connect } from 'dva';
import UserHeader from './UserHeader'
import UsereSider from './UserSider'
import config from '../../utils/config'

const { Content } = Layout

class UserLayout extends React.Component {
    state = {
        collapsed: false
    }

    collapsedChange = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        let menuData  = this.props.sys.menuData
        return (
            <DocumentTitle title={config.sys.name}>
                <Layout>
                    <UsereSider collapsed={this.state.collapsed} data={menuData} />
                    <Layout>
                        <UserHeader collapsed={this.state.collapsed} collapsedChange={this.collapsedChange} />
                        <Content></Content>
                    </Layout>
                </Layout>
            </DocumentTitle>
        )
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'sys/getMenuList'
        })
    }
}

export default connect(({ sys }) => ({ sys }))(UserLayout)