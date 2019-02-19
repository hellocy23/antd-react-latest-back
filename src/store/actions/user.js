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

// 查询表格数据
export const queryUserList = (params) => async dispatch => {
  try {
    let response = await api.get(api.queryUserList, params);
    await dispatch(querySuccess(response, params))
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
