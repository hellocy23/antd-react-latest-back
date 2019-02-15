import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import { queryAncestors } from 'utils'
import styles from './Bread.less'

class Bread extends PureComponent {
  generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      const content = (
        <Fragment>
          {item.icon ? (
            <Icon type={item.icon} style={{ marginRight: 4 }} />
          ) : null}
          {item.name}
        </Fragment>
      )

      return (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ? (
            <NavLink to={item.route || '#'}>{content}</NavLink>
          ) : (
            content
          )}
        </Breadcrumb.Item>
      )
    })
  }
  render() {
    const { routeList, location } = this.props

    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      _ => _.route && location.pathname === _.route
    )

    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [
          routeList[0],
          {
            id: 404,
            name: 'Not Found',
          },
        ]

    return (
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array,
}

export default Bread
