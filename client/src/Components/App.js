import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

let socket

const App = ({ t }) => {
	const [theme, setTheme] = useState(t)
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')
	const ENDPOINT = 'http://localhost:5000/'
	const history = useHistory()

	useEffect(() => {
		changethemeState()
		setId(window.localStorage.getItem('id'))
		setUsername(window.localStorage.getItem('username'))
	}, [])

	useEffect(() => {
		socket = io(ENDPOINT)

		socket.emit('join', { username: username, room: username })

		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [ENDPOINT])

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
