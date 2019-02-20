/* global document */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import FilterItem from 'components/FilterItem'
import { Form, Button, Row, Col, DatePicker, Input, Cascader } from 'antd'
import city from './city'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@Form.create()
class Filter extends PureComponent {
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { onAdd, filter, form } = this.props
    const { getFieldDecorator } = form
    const { name, address } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search
              placeholder={'Search Name'}
              onSearch={this.handleSubmit}
            />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 4 }}
          md={{ span: 8 }}
          id="addressCascader"
        >
          {getFieldDecorator('address', { initialValue: address })(
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={'Please pick an address'}
              getPopupContainer={() =>
                document.getElementById('addressCascader')
              }
            />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 6 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          id="createTimeRangePicker"
        >
          <FilterItem label={'CreateTime'}>
            {getFieldDecorator('createTime', {
              initialValue: initialCreateTime,
            })(
              <RangePicker
                style={{ width: '100%' }}
                getCalendarContainer={() => {
                  return document.getElementById('createTimeRangePicker')
                }}
              />
            )}
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
              <Button onClick={this.handleReset}>
                Reset
              </Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              Create
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
