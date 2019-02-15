import React from 'react'
import Loadable from "react-loadable"
import Layout from '@/layouts/BaseLayout'
import layout from './layout'
// default
const defaultLoad = () => <div />

let config = [
  {
    path: '/',
    exact: true,
    component: Layout
  },
  layout,
  {
    path: '/login',
    component: Loadable({
      loader: () => import('pages/Login/index'),
      loading: defaultLoad
    })
  }
]
export default config