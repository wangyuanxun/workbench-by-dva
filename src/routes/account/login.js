import React from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './Login.less'
import logo from '../../assets/images/logo.svg'
import config from '../../utils/config'

const FormItem = Form.Item

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: true,
            loading: false
        }
        this.onRememberChange = this.onRememberChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onRememberChange = (e) => {
        this.setState({ remember: e.target.checked });
    }
    onSubmit = (e) => {
        const { remember } = this.state;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                this.props.dispatch({
                    type: 'account/login',
                    payload: { ...value, remember: remember }
                })
            }
        })
    }
    render() {
        let props = this.props,
            { getFieldDecorator } = props.form;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to='/'>
                                <img className={styles.logo} src={logo} alt='logo' />
                                <span className={styles.title}>{config.name}</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>{config.desc}</div>
                    </div>
                    <div className={styles.main}>
                        <Form onSubmit={this.onSubmit}>
                            <FormItem>
                                {
                                    getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入登录帐号' }]
                                    })(<Input prefix={<Icon type='user' />} size='large' placeholder='登录帐号' />)
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('pwd', {
                                        rules: [{ required: true, message: '请输入登录密码' }]
                                    })(<Input type="password" prefix={<Icon type='lock' />} size='large' placeholder='登录密码' />)
                                }
                            </FormItem>
                            <FormItem>
                                <Checkbox checked={this.state.remember} onChange={this.onRememberChange}>记住密码</Checkbox>
                            </FormItem>
                            <FormItem>
                                <Button type='primary' htmlType='submit' size='large' className={styles.submit}>登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginForm = Form.create()(Login);

export default connect()(LoginForm)