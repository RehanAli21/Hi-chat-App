import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import MainApp from './Components/App'

class App extends Component {
	state = {}

	render() {
		return (
			<Router>
				<Route path='/' exact component={Login}></Route>
				<Route path='/signup' exact component={Signup}></Route>
				<Route path='/app' exact component={MainApp}></Route>
			</Router>
		)
	}
}

export default App
