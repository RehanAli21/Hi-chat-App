import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = ({ theme, changethemeState }) => {
	let [username, setUsername] = useState('')
	let [password, setPassword] = useState('')
	let history = useHistory()

	const onLogin = () => {
		if (!username && !password) return

		axios
			.get(`http://localhost:5000/user/${username}/${password}`)
			.then(res => {
				if (res.status === 200) {
					//setUAndId(res.data.username, res.data.id)
					window.localStorage.setItem('username', res.data.username)
					window.localStorage.setItem('id', res.data.id)
					history.push('/app')
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<div className='container'>
			<button onClick={changethemeState} className='btn btn-theme'>
				{theme === 'white' ? 'dark' : 'white'}
			</button>
			<div className='innerContainer'>
				<h1 className='heading'>Hi</h1>
				<hr />
				<div>
					<input
						type='text'
						autoComplete='false'
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
