import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'

class Menu extends React.Component {
    render() {
        let columns = [
            { title: '编号', dataIndex: 'id' },
            { title: '工号', dataIndex: 'job_no' },
            { title: '真实姓名', dataIndex: 'real_name' },
            { title: '状态', dataIndex: 'state' }
        ]
        return (
            <Table columns={columns} />
        )
    }
}

export default connect()(Menu)