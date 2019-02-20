import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import styles from './index.less'
import { queryUserDetail  } from '@/store/actions/user'
import { pathMatchRegexp } from 'utils'

@connect(
	state => state.getIn(['user']),
	dispatch => bindActionCreators({ queryUserDetail }, dispatch)
)
class UserDetail extends PureComponent {

  componentDidMount() {
    const { location, queryUserDetail } = this.props;
    const match = pathMatchRegexp('/home/user/:id', location.pathname);
    const payload = { id: match[1] }
    queryUserDetail(payload);
  }

  render() {
    const { userDetail } = this.props
    const content = []
    for (let key in userDetail) {
      if ({}.hasOwnProperty.call(userDetail, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(userDetail[key])}</div>
          </div>
        )
      }
    }
    return (
      <Page inner>
        <div className={styles.content}>{content}</div>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
