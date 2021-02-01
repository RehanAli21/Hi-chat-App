import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './AppSubComps/UserContext'
import { Link } from 'react-router-dom'

const Login = ({ changeTheme }) => {
	const [
		getFriends,
		friendsList,
		userMsgs,
		setUserMsgs,
		usersStatus,
		setUsersStatus,
		activeUser,
		setActiveUser
	] = useContext(UserContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onLogin = () => {
		if (!username && !password) return

		axios
			.get(`${ENDPOINT}/user/${username}/${password}`)
			.then(res => {
				if (res.status === 200) {
					window.localStorage.setItem('username', res.data.username)
					window.localStorage.setItem('id', res.data.id)
					window.localStorage.setItem('name', res.data.name)
					getFriends(res.data.id)
					history.push('/app')
				}
			})
			.catch(err => alert('Username or password is incorrent'))
	}

	return (
		<div className='container'>
			<button onClick={changeTheme} className='btn btn-theme'>
				Theme
			</button>
			<div className='innerContainer'>
				<h1 className='heading'>Hi</h1>
				<hr />
				<div>
					<input
						type='text'
						name='email'
						id='email'
						placeholder='Email...'
						className='none-app-input'
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<Link to={'/app'}>
					<button
						onClick={onLogin}
						type='submit'
						className='btn btn-primary'>
						SignIn
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Login
