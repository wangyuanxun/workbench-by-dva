import React from 'react'
import { connect } from 'dva'
import Exception from '../../components/exception/Index'

class Exception404 extends React.Component {
    render() {
        return (
            <Exception title='404'></Exception>
        )
    }
}

export default connect()(Exception404)