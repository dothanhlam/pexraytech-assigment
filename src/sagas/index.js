import {takeEvery, eventChannel } from 'redux-saga'
import {put, take, call} from 'redux-saga/effects'
import * as actions from '../actions/app-actions'
import query from '../utils/query'
import normalizeStatus from '../utils/normalizestatus'

const API_ENDPOINT = 'http://localhost:3001/api/'
const WS_ENDPOINT  = 'ws://localhost:3002'

let ws;
const getCall = api => {
	//TODO: should move to webpack setting
	return API_ENDPOINT.concat(api)
}
// TODO: add try catch
function* fetchStatus(action) {
	const { urls, useWS } = action;
	if (useWS && urls) {
		//todo: ok, we deal with websocket here
		ws = new WebSocket(urls[0].value);
		const channel = yield call(createEventChannel, ws);
		while (true) {
			const rawData = yield take(channel);
			if (rawData.type === "error") {
				yield put(actions.connectionError())
			}
			else if (rawData.data) {
				const parsedData = yield call(normalizeStatus, rawData)
				yield put(actions.addStats(parsedData))
			}
		}
		return;
	}
	const status = yield call(query, 'GET', getCall('status'))
	const parsedData = yield call(normalizeStatus, status)
	yield put(actions.addStats(parsedData))
}

function* disconnnect() {
	ws.close();
	// this is just a trick
	location.reload();
}

function* fetchURLs(action) {
	const urls = yield call(query, 'GET', getCall('urls'))
	const parsedData = yield call(normalizeStatus, urls)
	yield put(actions.addURLs(parsedData))
}

export function* watchFetchStatus() {
	yield takeEvery(actions.FETCH_STATUS, fetchStatus)
	yield takeEvery(actions.DISCONNECT, disconnnect)
	yield takeEvery(actions.FETCH_URLS, fetchURLs)
}

function* createEventChannel(ws) {
	return eventChannel(emit => {
		ws.onopen = ev => {
			emit(ev)
		};
		
		ws.onmessage = ev => {
			emit(ev)
		};
		
		ws.onerror = (ev) => {
			emit(ev)
		};
		
		return () => {
			ws.close();
		};
	});
}

export default function* rootSaga() {
	yield [
		watchFetchStatus(),
	]
}

