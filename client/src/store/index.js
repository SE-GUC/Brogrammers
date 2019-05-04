import rootReducer from './reducers'
import { createStore } from 'redux'
const store = createStore(rootReducer)
store.dispatch(rootReducer)

export default store
