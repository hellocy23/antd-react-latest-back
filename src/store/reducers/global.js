import store from 'store'

const initState = {
  globalLoading: false, // 全局loading
  isLogin: store.get('isLogin') || false, // 登录状态
  collapsed: store.get('collapsed') || false,
}

export const global = (state = initState, action) => {
  switch (action.type) {
    case 'SET_GLOBAL_LOADING':
      return {
        ...state,
        globalLoading: action.globalLoading
      }
    case "CHECK_IS_LOGIN":
    store.set('isLogin', action.isLogin)
      return {
        ...state,
        isLogin: action.isLogin
      }
    case 'COLLAPSECHANGE': 
      store.set('collapsed', action.collapsed)
      return {
        ...state,
        collapsed: action.collapsed
      }
    default:
      return state
  }
}
