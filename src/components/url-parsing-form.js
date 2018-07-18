import React, {Component, PropTypes} from "react"
import {Button, ControlLabel, Form as form, FormControl, FormGroup, Panel} from "react-bootstrap"

export default class UrlParsingForm extends Component {

  static propTypes = {
    urls: PropTypes.array,
    submitHandler: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {urls: []}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.urls !== this.state.urls) {
      this.setState({urls: nextProps.urls})
    }
  }

  handleInputChange = e => {
    const {id, value} = e.target
    let urls = [...this.state.urls]
    urls[id].value = value
    this.setState({
      urls
    })
  }

  getValidationState = i => {
    const url = this.state.urls[i].value
    const length = url.length
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)
    if (length && url.match(regex)) return 'success'
    else if (length) return 'warning'
    else if (!length) return 'error'
    return null
  }

  buildComponent = (props, state) => {
    const {urls} = state
    return (
        <Panel>
          <Panel.Heading>Enter API url</Panel.Heading>
          <Panel.Body>
            <form onSubmit = {this.defaultSubmitHandler}>
              { urls.map((url, i) => {
                return (
                    <FormGroup
                        key = {i.toString()}
                        validationState = {this.getValidationState(i)} >
                    <ControlLabel>{`API #${url.id} - ${url.desc}`}</ControlLabel>
                      <FormControl
                          id = {i.toString()}
                          type = "text"
                          value = {url.value}
                          onChange = {this.handleInputChange}
                      />
                      <FormControl.Feedback />
                    </FormGroup>)
              })
              }
              <Button type = "submit">Connect</Button>
            </form>
          </Panel.Body>
        </Panel>
    )
  }

  defaultSubmitHandler = e => {
    this.props.submitHandler(this.state.urls)
    e.preventDefault()
  }

  render() {
    return this.buildComponent(this.props, this.state)
  }
}
