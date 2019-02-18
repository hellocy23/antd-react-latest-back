import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import SiderMenu from './Menu'
import styles from './Sider.less'
import config from 'utils/config'

class Sider extends PureComponent {
  render() {
    const {
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      location
    } = this.props

    return (
      <Layout.Sider
        width={256}
        theme={config.menuTheme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={isMobile ? null : onCollapseChange}
        className={styles.sider}
      >
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img alt="logo" src={'/logo.svg'} />
            {collapsed ? null : <h1>{config.siteName}</h1>}
          </div>
        </div>

        <div className={styles.menuContainer}>
          <ScrollBar
            option={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true,
            }}
          >
            <SiderMenu
              menus={menus}
              theme={config.menuTheme}
              isMobile={isMobile}
              collapsed={collapsed}
              onCollapseChange={onCollapseChange}
              location={location}
            />
          </ScrollBar>
        </div>
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default Sider
