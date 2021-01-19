import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import MainApp from './Components/App'

class App extends Component {
	state = {
		theme: 'white'
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
							css={this.state.css}
						/>
					)}></Route>
				<Route
					path='/signup'
					exact
					render={() => (
						<Signup
							theme={this.state.theme}
							changethemeState={this.changethemeState}
							css={this.state.css}
						/>
					)}></Route>
				<Route
					path='/app'
					exact
					render={() => (
						<MainApp
							theme={this.state.theme}
							changethemeState={this.changethemeState}
							css={this.state.css}
						/>
					)}></Route>
			</Router>
		)
	}
}

export default App
