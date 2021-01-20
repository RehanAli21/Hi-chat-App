import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ t }) => {
	const [theme, setTheme] = useState(t)
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')
	const history = useHistory()

	useEffect(() => {
		changethemeState()
		setId(window.localStorage.getItem('id'))
		setUsername(window.localStorage.getItem('username'))
	}, [])

	const onSignOut = () => {
		window.localStorage.setItem('id', '')
		window.localStorage.setItem('username', '')
		history.push('/')
	}

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
				theme={theme === 'dark' ? 'dark' : 'white'}
				changeTheme={changethemeState}
				onSignOut={onSignOut}
			/>
			<main>
				<Contacts />
				<Msgs />
			</main>
		</div>
	)
}

export default App
