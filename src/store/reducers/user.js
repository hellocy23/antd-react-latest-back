const initState = {
  loading: false,
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
  userDetail: []
}

export const user = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATESTATE':
      return {
        ...state,
        ...action.payload
      }
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


