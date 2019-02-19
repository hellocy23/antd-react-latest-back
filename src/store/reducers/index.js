import { combineReducers } from 'redux-immutable'
import { global } from './global'
import { user } from './user'

/* your reducers */
const rootReducer = combineReducers({
  global,
  user
})
export default rootReducer
