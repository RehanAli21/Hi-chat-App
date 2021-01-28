import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

const Nav = ({ t }) => {
	const [theme, setTheme] = useState(t)
	const name = window.localStorage.getItem('name')
	const username = window.localStorage.getItem('username')
	const history = useHistory()
	const socket = io('http://localhost:5000/')
	const [
		friends,
		getFriends,
		setFriends,
		activeUser,
		setActiveUser
	] = useContext(UserContext)

	useEffect(() => {
		changeTheme()
	}, [])

	const onSignOut = () => {
		disconnectFromServer(username)

		window.localStorage.setItem('id', '')
		window.localStorage.setItem('username', '')

		const link = document.getElementById('styles')
		if (theme === 'dark') {
			link.href = 'SignIn-dark.css'
		} else if (theme === 'white') {
			link.href = 'SignIn.css'
		}

		history.push('/')
	}

	const disconnectFromServer = username => {
		socket.emit('offline', { username })
		socket.disconnect()
		socket.off()
	}

	const changeTheme = () => {
		const link = document.getElementById('styles')
		if (theme === 'white') {
			link.href = 'App-dark.css'
			setTheme('dark')
		} else if (theme === 'dark') {
			link.href = 'App.css'
			setTheme('white')
		}
	}

	return (
		<nav>
			<div className='nameHeading'>
				<h2>{name.toUpperCase()}</h2>
			</div>
			<div className='mainHeading'>
				<h1>Hi</h1>
			</div>
			<div className='themeBtn'>
				<h2
					style={{ color: theme === 'dark' ? 'white' : 'black' }}
					className='nav-h2'
					onClick={changeTheme}>
					Theme
				</h2>
			</div>
			<div>
				<h2 className='nav-h2' onClick={onSignOut}>
					LOGOUT
				</h2>
			</div>
		</nav>
	)
}

export default Nav
