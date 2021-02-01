import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Forget = () => {
	const [username, setUsername] = useState('')
	const [recover, setRecover] = useState('')
	const [password, setPassword] = useState('')
	const [conpassword, setConpassword] = useState('')

	let history = useHistory()

	const recoverPassword = () => {
		if (!username && !recover && !password && !conpassword)
			return alert('No Filed must Empty!')

		if (!password && !conpassword)
			return alert('Password and confirm password is not same!')

		axios
			.put('https://hi-chat-application.herokuapp.com/user/forget', {
				username,
				recover,
				password
			})
			.then(res => {
				alert(res.data.msg)
				history.push('/')
			})
			.catch(err => console.log(err))
	}

	return (
		<div
			style={{
				fontFamily: 'sans-serif',
				textAlign: 'center',
				color: '#007bdb'
			}}>
			<h1 style={{ margin: '5% 0px 20px 0px' }}>Forget Password</h1>
			<div>
				<input
					style={{ margin: '30px 0px 20px 0px' }}
					type='text'
					name='username'
					placeholder='Enter Username...'
					className='none-app-input'
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='recover'
					placeholder='Enter Recover Text...'
					className='none-app-input'
					onChange={e => setRecover(e.target.value)}
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='password'
					placeholder='New Password...'
					className='none-app-input'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='conpassword'
					placeholder='Confirm Password...'
					className='none-app-input'
					onChange={e => setConpassword(e.target.value)}
				/>
			</div>
			<div style={{ margin: '20px 0px' }}>
				<button className='btn btn-primary' onClick={recoverPassword}>
					Forget Password
				</button>
			</div>
		</div>
	)
}

export default Forget
