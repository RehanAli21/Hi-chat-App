import React from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

const Nav = ({ theme, changeTheme }) => {
	const name = window.localStorage.getItem('name')
	const username = window.localStorage.getItem('username')
	const history = useHistory()
	const socket = io('https://hi-chat-application.herokuapp.com/')

	const onSignOut = () => {
		disconnectFromServer(username)

		window.localStorage.setItem('id', '')
		window.localStorage.setItem('username', '')

		history.push('/')
	}

	const disconnectFromServer = username => {
		socket.emit('offline', { username })
		socket.disconnect()
		socket.off()
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
