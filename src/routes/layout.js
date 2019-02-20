import Loadable from "react-loadable"
import Layout from '@/layouts/BaseLayout'
import Loader from 'components/Loader'

const User = () => import('pages/user')
const UserDetail = () => import('pages/user/$id')


let layout = {
		path: '/home',
		component: Layout,
		routes: [
			{
				path: '/home/user',
				component: Loadable({
					loader: User,
					loading: Loader
				}),
			},
			{
				path: '/home/user/:id',
				component: Loadable({
					loader: UserDetail,
					loading: Loader
				}),
			}
		]
}

export default layout