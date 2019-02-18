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

export const queryUserList = (params) => async dispatch => {
  try {
    let response = await api.get(api.queryUserList, params);
    debugger
    await dispatch(querySuccess(response, params))
    return response
  } catch (error) {
    console.log('error: ', error)
  }
}