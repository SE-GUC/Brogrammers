import { DRAWER_TOGGLE } from '../constants/actiontypes'

const intitialState = {
  drawerOpen: true
}
function toggle (state) {
  return !state.drawerOpen
}
function drawerReducer (state = intitialState, action) {
  switch (action.type) {
    case DRAWER_TOGGLE:
      return toggle(state)
    default:
      return state
  }
}
export default drawerReducer
