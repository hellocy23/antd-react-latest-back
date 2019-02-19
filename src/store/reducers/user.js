const initState = {
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
}

export const user = (state = initState, action) => {
  switch (action.type) {
    case 'QUERYUSERLIST':
      return {
        ...state,
        ...action.payload
      }
    case 'SHOWMODAL':
      return {
        ...state,
        ...action.payload,
        modalVisible: true
      }
    case 'HIDEMODAL':
      return {
        ...state,
        modalVisible: false
      }
    default:
      return state
  }
}


