import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'dva';
import config from '../../utils/config'

class BaseLayout extends React.Component {
    getPageTitle = () => {
        return config.sys.name
    }

    render() {
        return (
            <DocumentTitle title={this.getPageTitle()}>

            </DocumentTitle>
        )
    }
}

export default connect()(BaseLayout)