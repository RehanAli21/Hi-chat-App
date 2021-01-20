import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import MainApp from './Components/App'
import Forget from './Components/Forget'

class App extends Component {
	state = {
		theme: 'white',
		// This is username and id which will be come from backend
		// and will be used in app
		u: '',
		id: ''
	}

	setUAndId = (username, _id) => {
		this.setState(prevstate => ({ ...prevstate, u: username, id: _id }))
	}

	componentDidMount() {
		this.changethemeState()
		this.changeTheme()
	}

	changeTheme = () => {
		const link = document.getElementById('styles')
		if (this.state.theme === 'dark') link.href = 'SignIn.css'
		else link.href = 'SignIn-dark.css'
	}

	changethemeState = () => {
		this.setState(state => ({
			theme: this.state.theme === 'dark' ? 'white' : 'dark'
		}))
		this.changeTheme(this.state.theme === 'white' ? 'dark' : 'white')
	}

	render() {
		return (
			<Router>
				<Route
					path='/'
					exact
					render={() => (
						<Login
							theme={this.state.theme}
							changethemeState={this.changethemeState}
							u={this.state.u}
							id={this.state.id}
							setUAndId={this.setUAndId}
						/>
					)}
				/>
				<Route
					path='/app'
					exact
					render={() => (
						<MainApp
							theme={this.state.theme}
							changethemeState={this.changethemeState}
							u={this.state.u}
							id={this.state.id}
							setUAndId={this.setUAndId}
						/>
					)}
				/>
				<Route
					path='/signup'
					exact
					render={() => (
						<Signup
							theme={this.state.theme}
							changethemeState={this.changethemeState}
						/>
					)}
				/>
				<Route path='/forget' exact component={Forget} />
			</Router>
		)
	}
}

export default App
