import { combineReducers } from 'redux'
import artikelReducer from './artikelReducer'
import authReducer from './authReducer'

const reducer = combineReducers({
  artikel: artikelReducer,
  auth: authReducer
})

export default reducer
