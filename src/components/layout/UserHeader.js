import React from 'react'
import { Layout, Icon } from 'antd'
import styles from './UserHeader.less'

const { Header } = Layout

class UserHeader extends React.Component {
    render() {
        return (
            <Header className={styles.layout_header}>
                <Icon className={styles.trigger} type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.collapsedChange} />
            </Header>
        )
    }
}

export default UserHeader