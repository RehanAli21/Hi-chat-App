import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Nav = ({ t }) => {
	const [theme, setTheme] = useState(t)
	const name = window.localStorage.getItem('name')
	const history = useHistory()

	useEffect(() => {
		changeTheme()
	}, [])

	const onSignOut = () => {
		window.localStorage.setItem('id', '')
		window.localStorage.setItem('username', '')
		history.push('/')
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
