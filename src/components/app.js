import React from 'react'
import {Jumbotron} from 'react-bootstrap'

const App = props => {
	
	return (
		<div className="container">
			<Jumbotron>
				<h1>Pexraytech</h1>
				<p>Just for testing purpose. Click the 'Connect' button</p>
			</Jumbotron>
			<div>
				{props.children }
			</div>
		</div>
	)
	
}

export default App