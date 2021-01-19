import React, { Component } from 'react'
import Nav from './AppSubComps/nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

class App extends Component {
	state = {
		theme: 'white'
	}

	changeTheme = theme => {
		const link = document.getElementById('styles')
		if (theme === 'white') link.href = 'App.css'
		else link.href = 'App-dark.css'
	}

	changethemeState = () => {
		this.setState({ theme: this.state.theme === 'dark' ? 'white' : 'dark' })
		this.changeTheme(this.state.theme === 'white' ? 'dark' : 'white')
	}

	componentDidMount() {
		this.changeTheme(this.state.theme)
	}

	render() {
		return (
			<div>
				<Nav
					name={'Rehan Ali'}
					theme={this.state.theme === 'white' ? 'dark' : 'white'}
					changeTheme={this.changethemeState}
				/>
				<main>
					<Contacts />
					<Msgs />
				</main>
			</div>
		)
	}
}

export default App
