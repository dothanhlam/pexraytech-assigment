
import React, {Component, PropTypes} from "react"
import {Button, Form as form, Panel} from "react-bootstrap"

export default class OnErrorForm extends Component {
	
	static propTypes = {
		submitHandler: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
	}
	
	buildComponent = (props, state) => {
		return (
			<Panel>
				<Panel.Heading>Cannot connect to WS</Panel.Heading>
				<Panel.Body>
					<form onSubmit = {this.defaultSubmitHandler}>
						<Button type = "submit">Back to Home</Button>
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
