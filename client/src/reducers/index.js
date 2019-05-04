import { combineReducers } from 'redux'
import drawerReducer from './drawer'

const rootReducer = combineReducers({
  drawerState: drawerReducer
})
export default rootReducer
