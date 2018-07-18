const initialState = {}
import {ADD_STATS, ADD_URLS, CONNECTION_ERROR} from './../actions/app-actions'

const appReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		
		case ADD_STATS:
			return Object.assign({}, state, {stats: action.stats})
		
		case ADD_URLS:
			return Object.assign({}, state, {urls: action.urls.urls})
		
		case CONNECTION_ERROR:
			return Object.assign({}, state, {error: {message: CONNECTION_ERROR}})
		
		default:
			return state
	}
}

// selection
export const getStats = state => state.appStatus.stats
export const getError = state => state.appStatus.error
export const getURLs = state => state.appStatus.urls

export default appReducer