import Loadable from "react-loadable"
import Layout from '@/layouts/BaseLayout'
import layout from './layout'
import Loader from 'components/Loader'

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
      loading: Loader
    })
  }
]
export default config