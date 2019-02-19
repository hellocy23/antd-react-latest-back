/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import  MyLayout from 'components/Layout'
import { BackTop, Layout } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGlobalLoading, checkIsLogin, handleCollapseChange } from '@/store/actions/global'
import Error from 'pages/404/404'
import styles from './BaseLayout.less'
import config from 'utils/config'

const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@connect(
  state => state.getIn(['global']),
  dispatch => bindActionCreators({ setGlobalLoading, checkIsLogin, handleCollapseChange }, dispatch)
)
class PrimaryLayout extends PureComponent {

  componentDidMount() {
    this.redirectRoute()
  }

  redirectRoute = () => {
    const { isLogin, location, history } = this.props
    if (isLogin) {
      history.push(location.pathname)
    } else {
      history.push('/login')
    }
  }

  componentWillUnmount() {
  }

  onCollapseChange = collapsed => {
    this.props.handleCollapseChange(collapsed)
  }

  render() {
    const { collapsed, routes = [], location } = this.props
    const { onCollapseChange } = this

    // MenuParentId is equal to -1 is not a available menu.
    const menus = [{
      icon: "user",
      id: "1",
      name: "Users",
      route: "/home/user",
      zhName: "用户管理"
    }]

    // Find a route that matches the pathname.
    const currentRoute = menus.find(
      _ => _.route && location.pathname === _.route
    )

    const permissions = {
      visit: []
    }

    permissions.visit = menus.map(item => item.id)

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false

    const headerProps = {
      menus,
      collapsed,
      onCollapseChange,
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
      username: 'guest',
      fixed: config.fixedHeader,
      onSignOut: () => {
        this.props.checkIsLogin(false);
      },
    }

    const siderProps = {
      menus,
      collapsed,
      onCollapseChange,
      location
    }

    return (
      <Fragment>
        <Layout>
            <Sider {...siderProps} />
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={menus} location={location} />
              {
                hasPermission?
                 (
                    routes.map((r, key) => {
                      return (
                        <Route
                          component={r.component}
                          exact={!!r.exact}
                          key={r.path + key}
                          path={r.path}
                        />
                      )
                    })
                 ): <Error />
              }
            </Content>
            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout>div')}
            />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  routes: PropTypes.array,
  location: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
