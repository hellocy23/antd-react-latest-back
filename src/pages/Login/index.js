import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GlobalFooter } from 'ant-design-pro'
import { setGlobalLoading, checkIsLogin } from '@/store/actions/global'
import config from 'utils/config'

import styles from './index.less'
const FormItem = Form.Item

@connect(
	state => ({}),
	dispatch => bindActionCreators({ setGlobalLoading, checkIsLogin }, dispatch)
)
@Form.create()
class Login extends PureComponent {
	handleOk = (e) => {
    e.preventDefault()
    const { checkIsLogin, form } = this.props
    const { validateFieldsAndScroll } = form;
	  validateFieldsAndScroll((err, values) => {
	    if (!err) {
	      console.log('Received values of form: ', values)
	      const isAllow = this.allowLogin({
	        username: values.username,
	        password: values.password
	      })
	      if (isAllow) {
            checkIsLogin(true)
            setTimeout(() => {
              this.props.history.push('/home/user')
            }, 500);
	      } else {
	        message.error('账号或密码不正确~')
	      }
	    }
	  })
  }
  
	allowLogin = (obj) => {
	  const {
	    username = '', password = ''
	  } = obj
	  if (username === 'admin' && password === '12345') {
	    return true
	  } else {
	    return false
	  }
  }
  
	componentDidMount() {
	  this.props.setGlobalLoading(true)
  }
  
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>ATD ADMIN</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder={'Username'}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder={'Password'}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                // loading={loading.effects.login}
              >
                Sign in
              </Button>
              <p>
                <span>
                  Username
                  ：admin
                </span>
                <span>
                  Password
                  ：12345
                </span>
              </p>
            </Row>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.object,
}

export default Login
