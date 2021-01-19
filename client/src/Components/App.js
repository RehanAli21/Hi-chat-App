import React, { useState, useEffect } from 'react'
import Nav from './AppSubComps/nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = () => {
	let [theme, setTheme] = useState('white')

	useEffect(() => {
		changeTheme()
	})

	const changeTheme = () => {
		const link = document.getElementById('styles')
		if (theme === 'white') link.href = 'App.css'
		else link.href = 'App-dark.css'
	}

	const changethemeState = () => {
		setTheme(theme === 'dark' ? 'white' : 'dark')
		changeTheme()
		// this.setState(state => ({
		// 	theme: this.state.theme === 'dark' ? 'white' : 'dark'
		// }))
		// this.changeTheme(this.state.theme === 'white' ? 'dark' : 'white')
	}

	return (
		<div>
			<Nav
				name={'Rehan Ali'}
				theme={theme === 'white' ? 'dark' : 'white'}
				changeTheme={changethemeState}
			/>
			<main>
				<Contacts />
				<Msgs />
			</main>
		</div>
	)
}

export default App
