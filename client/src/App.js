import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { UserProvider } from './Components/AppSubComps/UserContext'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import MainApp from './Components/App'
import Forget from './Components/Forget'

class App extends Component {
	state = {
		theme: 'dark'
	}

	changeTheme = () => {
		const link = document.getElementById('styles')
		if (this.state.theme === 'white') {
			link.href = 'dark.css'
			this.setState(() => ({ theme: 'dark' }))
		} else if (this.state.theme === 'dark') {
			link.href = 'light.css'
			this.setState(() => ({ theme: 'white' }))
		}
	}

	render() {
		return (
			<Router>
				<UserProvider>
					<Route
						path='/'
						exact
						render={() => <Login changeTheme={this.changeTheme} />}
					/>
					<Route
						path='/app'
						exact
						render={() => (
							<MainApp
								theme={this.state.theme}
								changeTheme={this.changeTheme}
							/>
						)}
					/>
				</UserProvider>
				<Route
					path='/signup'
					exact
					render={() => <Signup changeTheme={this.changeTheme} />}
				/>
				<Route path='/forget' exact component={Forget} />
			</Router>
		)
	}
}

export default App
