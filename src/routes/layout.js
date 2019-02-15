import React from 'react'
import Loadable from "react-loadable"
import Layout from '@/layouts/BaseLayout'

// default
const defaultLoad = () => <div/>

const User = () => import('pages/user')

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
			}
		]
}

export default layout