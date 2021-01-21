import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Nav = ({ name, t }) => {
	const [theme, setTheme] = useState(t)
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
				<h2>{name}</h2>
			</div>
			<div className='mainHeading'>
				<h1>Hi</h1>
			</div>
			<div className='themeBtn'>
				<button onClick={changeTheme} className='btn btn-theme'>
					{theme === 'dark' ? 'white' : 'dark'}
				</button>
			</div>
			<div className='signoutBtn'>
				<button onClick={onSignOut} className='btn btn-primary'>
					SignOut
				</button>
			</div>
		</nav>
	)
}

export default Nav
