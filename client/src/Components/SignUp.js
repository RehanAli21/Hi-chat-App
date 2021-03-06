import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const SignUp = ({ changeTheme }) => {
	let [name, setName] = useState('')
	let [username, setUsername] = useState('')
	let [password, setPassword] = useState('')
	let [conPassword, setConPassword] = useState('')
	let [recover, setRecover] = useState('')

	let history = useHistory()

	const onSignUp = () => {
		if (!name && !username && !password && !conPassword && !recover)
			return alert('No filed must be empty')

		if (password !== conPassword)
			return alert('password and confirm passsword is not same')

		axios
			.post('http://localhost:5000/user', {
				name,
				username,
				password,
				recover
			})
			.then(res => {
				if (res.status === 200) {
					alert(res.data.msg)
					history.push('/')
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<div className='container'>
			<button onClick={changeTheme} className='btn btn-theme'>
				Theme
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
						className='none-app-input'
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='text'
						name='username'
						id='username'
						placeholder='Username...'
						className='none-app-input'
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password...'
						className='none-app-input'
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='password'
						name='con-password'
						id='con-password'
						placeholder='Confirm Password...'
						className='none-app-input'
						onChange={e => setConPassword(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='text'
						name='recovery-text'
						id='recovery-text'
						placeholder='Text for recovery of password...'
						className='none-app-input'
						onChange={e => setRecover(e.target.value)}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={onSignUp}>
					SignUp
				</button>
				<div className='links'>
					<Link to='/' className='blue'>
						<p>Sign In</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
