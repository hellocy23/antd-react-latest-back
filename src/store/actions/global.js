export const setGlobalLoading = globalLoading => ({
  type: 'SET_GLOBAL_LOADING',
  globalLoading
})

export const checkIsLogin = isLogin => ({
  type: 'CHECK_IS_LOGIN',
  isLogin
})

export const handleCollapseChange = collapsed => ({
  type: 'COLLAPSECHANGE',
  collapsed
})