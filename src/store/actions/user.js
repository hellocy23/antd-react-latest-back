import api from 'services'

const querySuccess = (response, params) => ({
  type: 'QUERYUSERLIST',
  payload: {
    list: response.data,
    pagination: {
      current: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      total: response.total,
    },
  },
})

// 统一修改reducer数据
export const updateState = (payload) => ({
  type: 'UPDATESTATE',
  payload
})

// 查询表格数据
export const queryUserList = (params) => async dispatch => {
  try {
    dispatch(updateState({loading: true}));
    let response = await api.get(api.queryUserList, params);
    await dispatch(querySuccess(response, params))
    dispatch(updateState({loading: false}));
    return response
  } catch (error) {
    console.log('error: ', error)
  }
}

// 打开弹窗
export const showModal = payload => ({
  type: 'SHOWMODAL',
  payload
})

//关闭弹窗
export const hideModal = () => ({
  type: 'HIDEMODAL',
})

//创建用户
export const createUser = (params) => async dispatch => {
  try {
    let response = await api.post(api.createUser, params, true);
    if (response.status === 200) {
      dispatch(hideModal());
      const payload = { page: 1, pageSize: 10 };
      dispatch(queryUserList(payload));
    } else {
      throw response
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

//编辑用户
export const updateUser = (params) => async dispatch => {
  try {
    let response = await api.post(api.updateUser+'/'+params.id, params, true);
    if (response.status === 201) {
      dispatch(hideModal())
      const payload = { page: 1, pageSize: 10 };
      dispatch(queryUserList(payload));
    } else {
      throw response
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

//删除用户
export const removeUser = (id, selectedRowKeys) => async dispatch => {
  try {
    let response = await api.delete(api.removeUser+'/'+id, {id}, true);
    if (response.status === 204) {
      const payload = {
        selectedRowKeys: selectedRowKeys.filter(_ => _ !== id)
      }
      dispatch(updateState(payload))
    } else {
      throw response
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

//批量删除用户
export const multiDelete = (params) => async dispatch => {
  try {
    let response = await api.post(api.removeUserList, params, true);
    if (response.status === 204) {
      dispatch(updateState({selectedRowKeys: []}))
    } else {
      throw response
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

//查询用户详情
export const queryUserDetail = (params) => async dispatch => {
  try {
    let response = await api.get(api.queryUser+'/'+params.id, params, true);
    if (response.status === 200) {
      const payload = {
        userDetail: response.data
      }
      dispatch(updateState(payload))
    } else {
      throw response
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
