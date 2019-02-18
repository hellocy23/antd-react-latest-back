import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from './city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={'Name'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'NickName'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('nickName', {
              initialValue: item.nickName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'Gender'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('isMale', {
              initialValue: item.isMale,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>
                  Male
                </Radio>
                <Radio value={false}>
                  Female
                </Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={'Age'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('age', {
              initialValue: item.age,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber min={18} max={100} />)}
          </FormItem>
          <FormItem label={'Phone'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: 'The input is not valid phone!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'Email'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
              rules: [
                {
                  required: true,
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: 'The input is not valid E-mail!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'Address'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address && item.address.split(' '),
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={'Pick an address'}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
