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
import { pathMatchRegexp } from 'utils'

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
    const newRouteList = [
      {
        icon: "user",
        id: "1",
        name: "Users",
        route: "/home/user",
        zhName: "用户管理"
      },
      { 
        breadcrumbParentId: "1",
        id: "21",
        menuParentId: "-1",
        name: "User Detail",
        route: "/home/user/:id",
        zhName: "用户详情",
      }
    ]

    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // 当前展示组件
    const children = routes.find(
      _ => _.path && _.path === currentRoute.route
    )

    const permissions = {
      visit: []
    }

    permissions.visit = newRouteList.map(item => item.id)

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

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
              <Bread routeList={newRouteList} location={location} />
              {
                hasPermission?
                 (
                    <Route
                      component={children.component}
                      exact={!!children.exact}
                      key={children.path}
                      path={children.path}
                    />
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
