import React, { useState, useEffect } from 'react'
import Nav from './AppSubComps/nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = () => {
	const [theme, setTheme] = useState('white')
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')

	useEffect(() => {
		changeTheme()
		setId(window.localStorage.getItem('id'))
		setUsername(window.localStorage.getItem('username'))
	})

	const changeTheme = () => {
		const link = document.getElementById('styles')
		if (theme === 'white') link.href = 'App.css'
		else link.href = 'App-dark.css'
	}

	const changethemeState = () => {
		setTheme(theme === 'dark' ? 'white' : 'dark')
		changeTheme()
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
