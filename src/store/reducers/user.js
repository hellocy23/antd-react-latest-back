import store from 'store'

const initState = {
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
}

export const global = (state = initState, action) => {
  switch (action.type) {
    case 'QUERYUSERLIST':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
