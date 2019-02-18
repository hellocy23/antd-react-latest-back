import { apiPrefix } from 'utils/config'

const url = {
    queryUserList: '/users',
    removeUser: '/user',
    user: '/user',
    removeUserList: '/users/delete',
}
for (let key in url) {
    url[key] = apiPrefix + url[key]
}
export default url