import React from 'react'
import { connect } from 'dva'
import Exception from '../../components/exception/Index'

class Exception500 extends React.Component {
    render() {
        return (
            <Exception title='500'></Exception>
        )
    }
}

export default connect()(Exception500)