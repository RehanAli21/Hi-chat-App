import React, { useState, useContext } from 'react'
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

	let [username, setUsername] = useState('')
<<<<<<< HEAD
=======
	let [password, setPassword] = useState('')
	const ENDPOINT = 'https://hi-chat-application.herokuapp.com/'
	let history = useHistory()
>>>>>>> parent of d81751e (Removing database features.)

	const onLogin = () => {
		if (!username) return
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
