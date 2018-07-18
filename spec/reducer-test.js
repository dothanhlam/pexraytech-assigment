import appReducer from '../src/reducers/app-reducer.js'
import * as chai from 'chai'

let should = chai.should()
let expect = chai.expect

describe('App Reducer', () => {
	
	it('Should add url', () => {
		const initialState = {}
		const expectedState = {
			urls: [
				{id: '1', value: 'ws:localhost:3002', desc: "check connection"}
			]
		}
		const newState = appReducer(initialState, {
			type: 'ADD_URLS',
			urls: { urls: [{id: '1', value: 'ws:localhost:3002', desc: "check connection"}] }
		});
		
		expect(newState).to.eql(expectedState);
	})
	
	it('should set greeting status', () => {
		const initialState = {}
		const expectedState = {stats: {
			greeting: 'Hello World'
		}}
		const newState = appReducer(initialState, {
			type: 'ADD_STATS',
			stats: {
				greeting: 'Hello World'
			}
		});
		expect(newState).to.eql(expectedState);
	})
	
	it('should handle error state', () => {
		const initialState = {}
		const expectedState = {error: {
			message: 'CONNECTION_ERROR'
		}}
		const newState = appReducer(initialState, {
			type: 'CONNECTION_ERROR',
			stats: {
				message: 'CONNECTION_ERROR'
			}
		});
		expect(newState).to.eql(expectedState);
	})
	
})