import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
import io from 'socket.io-client'
import Msg from './Msg'

let socket

const Msgs = () => {
	const ENDPOINT = 'http://localhost:5000/'
	const username = window.localStorage.getItem('username')
	const [change, setChange] = useState(0)

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

	useEffect(() => {
		socket = io(ENDPOINT)
		if (friendsList.length > 0 && usersStatus.length > 0) {
			socket.emit('join', { username: username, friends: friendsList })

			socket.on('friendOnline', msg => {
				const status = []

				usersStatus.forEach(e => status.push(e))
				status.forEach(e => {
					if (msg.username === e.username) {
						console.log('connect', username)
						e.status = true
					}
				})
				setUsersStatus(status)
			})

			socket.on('friendDisconnect', msg => {
				const status = []

				usersStatus.forEach(e => status.push(e))
				status.forEach(e => {
					if (msg.username === e.username) {
						console.log('disconnect', username)
						e.status = false
					}
				})
				setUsersStatus(status)
			})
		} else {
			setChange(change + 1)
		}
	}, [change])

	return (
		<div className='msgs'>
			<div className='msg-section'>
				{activeUser === '' ? (
					<h1
						style={{
							margin: 'auto',
							color: 'white',
							textShadow:
								'3px 3px 3px #007bdb, -3px -3px 3px #007bdb, -3px 3px 3px #007bdb, 3px -3px 3px #007bdb'
						}}>
						Hello {username.toUpperCase()}, Welcome to Hi App
					</h1>
				) : (
					''
				)}
				{/* <Msg user='me' msg='Hello, How Are you' />
				<Msg user='notme' msg='I am fine How are you' /> */}
			</div>
			<div className='input-section'>
				<input
					type='text'
					name='msg'
					id='msgInput'
					placeholder='Message...'
				/>
				<button className='btn btn-primary'>&gt;</button>
			</div>
		</div>
	)
}

export default Msgs
