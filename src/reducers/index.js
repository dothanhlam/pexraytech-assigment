import { combineReducers } from 'redux'
import appReducer from './app-reducer'
import routerReducer from './router-reducer'

const reduxApp = combineReducers({
  appStatus: appReducer,
  routing: routerReducer
})

export default reduxApp