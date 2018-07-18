export const APP_ACTION = 'APP_ACTION'
export const FETCH_STATUS = 'FETCH_STATUS'
export const ADD_STATS = 'ADD_STATS'

export const FETCH_URLS = 'FETCH_URLS'
export const ADD_URLS = 'ADD_URLS'

export const DISCONNECT = 'DISCONNECT'
export const CONNECTION_ERROR = 'CONNECTION_ERROR'

export const addStats = stats => {
	return {
		type: ADD_STATS,
		stats
	}
}

export const addURLs = urls => {
	return {
		type: ADD_URLS,
		urls
	}
}

export function fetchStatus(urls, useWS = true) {
	return {
		type: FETCH_STATUS,
		urls,
		useWS
	}
}

export function fetchURLs() {
	return {
		type: FETCH_URLS
	}
}

export function connectionError() {
	return {
		type: CONNECTION_ERROR
	}
}