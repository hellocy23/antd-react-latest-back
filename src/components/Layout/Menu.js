import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import {
  arrayToTree,
  queryAncestors,
} from 'utils'
import store from 'store'

const { SubMenu } = Menu

class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }

    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <NavLink to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    const {
      collapsed,
      menus,
      location,
    } = this.props

    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'id', 'menuParentId')

    // Find a menu that matches the pathname.
    const currentMenu = menus.find(
      _ => _.route && location.pathname === _.route
    )

    // Find the key that should be selected according to the current menu.
    const selectedKeys = currentMenu
      ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id)
      : []

    const menuProps = collapsed
      ? {}
      : {
          openKeys: this.state.openKeys,
        }

    return (
      <Menu
        mode="inline"
        theme='light'
        onOpenChange={this.onOpenChange}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
}

export default SiderMenu
