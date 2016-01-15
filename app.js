import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends Component {
	render () {
		return (
			<div>
				<ul>
					<li><Link to='dashboard'>DashBoard</Link></li>
					<li><Link to='form'>Form</Link></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
}

class Dashboard extends Component {
	render () {
		return (
			<h2>this is dashboard!</h2>
		)
	}
}

class Form extends Component {
	constructor ( props ) {
		super( props )
		this.state = {
			inputText: 'yaha'
		}
	}

	componentWillMount () {
		this.context.router.setRouteLeaveHook( this.props.route, this.routerWillLeave.bind( this ) )
	}

	routerWillLeave () {
		if ( this.state.inputText ) {
			return `Are you sure you want to leave without save the form!`
		}
	}

	handleSubmit ( event ) {
		event.preventDefault()
		this.setState( {
			inputText: ''
		}, () => this.context.router.push( '/' ) )
	}

	handleChange ( event ) {
		event.preventDefault()
		this.setState( {
			inputText: event.target.value
		} )
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind( this )}>
				<input type='text' onChange={this.handleChange.bind( this )} value={this.state.inputText} />
				<button type='submit'>Submit</button>
			</form>
		)
	}

}
Form.contextTypes = {
	router: React.PropTypes.object.isRequired
}

render(
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<Route path='dashboard' component={Dashboard}/>
				<Route path='form' component={Form}/>
			</Route>
		</Router>
	,
	document.querySelector( '#container' )
)
