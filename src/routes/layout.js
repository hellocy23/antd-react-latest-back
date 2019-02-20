import React from 'react'
import Loadable from "react-loadable"
import Layout from '@/layouts/BaseLayout'

// default
const defaultLoad = () => <div/>

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
					loading: defaultLoad
				}),
			},
			{
				path: '/home/user/:id',
				component: Loadable({
					loader: UserDetail,
					loading: defaultLoad
				}),
			}
		]
}

export default layout