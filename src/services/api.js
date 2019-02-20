import { apiPrefix } from 'utils/config'

const url = {
    queryUserList: '/users',
    removeUser: '/user',
    createUser: '/user',
    updateUser: '/user',
    removeUserList: '/users/delete',
    queryUser: '/user',
}
for (let key in url) {
    url[key] = apiPrefix + url[key]
}
export default url