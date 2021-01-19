import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
	let [theme, setTheme] = useState('white')
	let [name, setName] = useState('')
	let [username, setUsername] = useState('')
	let [password, setPassword] = useState('')
	let [conPassword, setConPassword] = useState('')
	let [recover, setRecover] = useState('')

	let history = useHistory()

	useEffect(() => {
		changeTheme()
	})

	const changeTheme = () => {
		const link = document.getElementById('styles')
		if (theme === 'white') link.href = 'SignIn.css'
		else link.href = 'SignIn-dark.css'
	}

	const changethemeState = () => {
		setTheme(theme === 'dark' ? 'white' : 'dark')
		changeTheme(theme === 'white' ? 'dark' : 'white')
	}

	const onSignUp = () => {
		if (!name && !username && !password && !conPassword && !recover)
			return console.log('empty')

		if (password !== conPassword) return console.log('not same')

		axios
			.post('http://localhost:5000/user', {
				name,
				username,
				password,
				recover
			})
			.then(res => {
				if (res.status === 200) history.push('/')
			})
			.catch(err => console.error(err))
	}

	return (
		<div className='container'>
			<button onClick={changethemeState} className='btn btn-theme'>
				{theme === 'white' ? 'dark' : 'white'}
			</button>
			<div className='innerContainer'>
				<h1 className='heading'>Sign Up</h1>
				<hr />
				<div>
					<input
						type='text'
						name='fullname'
						id='fullname'
						placeholder='Full Name...'
						onChange={e => setName(e.target.value)}
					/>
				</div>
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
				<div>
					<input
						type='password'
						name='con-password'
						id='con-password'
						placeholder='Confirm Password...'
						onChange={e => setConPassword(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='text'
						name='recovery-text'
						id='recovery-text'
						placeholder='Text for recovery of password...'
						onChange={e => setRecover(e.target.value)}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={onSignUp}>
					SignUp
				</button>
				<div class='links'>
					<Link to='/' className='blue'>
						<p>Sign In</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
