import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = ({ changeTheme }) => {
	let [username, setUsername] = useState('')
	let [password, setPassword] = useState('')
	let history = useHistory()

	const onLogin = () => {
		if (!username && !password) return

		axios
			.get(`http://localhost:5000/user/${username}/${password}`)
			.then(res => {
				if (res.status === 200) {
					window.localStorage.setItem('username', res.data.username)
					window.localStorage.setItem('id', res.data.id)
					window.localStorage.setItem('name', res.data.name)
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
						name='username'
						id='username'
						placeholder='Username...'
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password...'
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='links'>
					<Link to='/signup' className='blue'>
						<p>SignUp</p>
					</Link>
					<Link to='/forget' className='blue'>
						<p>Forgetten Password?</p>
					</Link>
				</div>
				<button
					onClick={onLogin}
					type='submit'
					className='btn btn-primary'>
					SignIn
				</button>
			</div>
		</div>
	)
}

export default Login
