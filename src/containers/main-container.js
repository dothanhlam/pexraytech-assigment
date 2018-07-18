import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import UrlParsingForm from '../components/url-parsing-form'
import OnConnectedForm from '../components/on-connected-form';
import OnErrorForm from '../components/on-error-form';

import {fetchStatus, FETCH_URLS, DISCONNECT, CONNECTION_ERROR} from '../actions/app-actions'

import {getURLs, getStats, getError} from '../reducers/app-reducer'

class MainContainer extends Component {
	static propTypes = {
		error: PropTypes.object,
		urls: PropTypes.array,
		status: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
	}
	
	constructor() {
		super()
	}
	
	componentDidMount() {
		this.props.dispatch({type: FETCH_URLS})
	}
	
	submitHandler = urls => {
		this.props.dispatch(fetchStatus(urls))
	}
	
	disconnectHandler = () => {
		this.props.dispatch({type: DISCONNECT})
	}
	
	backToHomeHandler = () => {
		location.reload()
	}

	buildComponent = props => {
		const {urls, status, error} = props
		if (error && error.message) {
			return (
				<div>
					<OnErrorForm
						submitHandler={this.backToHomeHandler}>
					</OnErrorForm>
				</div>
			)
		}
		if (status) {
			return(
				<div>
					<OnConnectedForm
						submitHandler={this.disconnectHandler}
						message={status}>
					</OnConnectedForm>
				</div>
			)
		}
		return (
			<div>
				{
					<UrlParsingForm
						urls={urls || []}
						submitHandler={this.submitHandler}
					>
					</UrlParsingForm>
				}
			</div>
		)
	}
	
	render() {
		return this.buildComponent(this.props)
	}
}

function mapStateToProps(state) {
	return {
		urls: getURLs(state),
		status: getStats(state),
		error: getError(state)
	}
}

export default connect(mapStateToProps)(MainContainer)