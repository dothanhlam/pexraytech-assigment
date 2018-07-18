
import React, {Component, PropTypes} from "react"
import {Button, Form as form, Panel} from "react-bootstrap"

export default class OnConnectedForm extends Component {
	
	static propTypes = {
		message: PropTypes.object,
		submitHandler: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
	}
	
	buildComponent = (props, state) => {
		const {message} = props
		return (
			<Panel>
				<Panel.Heading>{`The message from server: ${message.greeting}`}</Panel.Heading>
				<Panel.Body>
					<form onSubmit = {this.defaultSubmitHandler}>
						<Button type = "submit">Disconnect</Button>
					</form>
				</Panel.Body>
			</Panel>
		)
	}
	
	defaultSubmitHandler = e => {
		this.props.submitHandler()
		e.preventDefault()
	}
	
	render() {
		return this.buildComponent(this.props, this.state)
	}
}
