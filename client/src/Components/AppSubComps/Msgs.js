import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
import io from 'socket.io-client'
import Msg from './Msg'

let socket

const Msgs = () => {
	const ENDPOINT = 'http://localhost:5000/'
	const username = window.localStorage.getItem('username')

	const [
		friends,
		getFriends,
		setFriends,
		activeUser,
		setActiveUser
	] = useContext(UserContext)

	useEffect(() => {
		socket = io(ENDPOINT)
		if (friends.length > 0) {
			console.log(socket)
			socket.emit(
				'join',
				{ username: username, friends: friends },
				({ error }) => alert(error)
			)

			socket.on('online', msg => console.log('o', msg))
			socket.on('friendOnline', msg => console.log('fo', msg))
			socket.on('friendDisconnect', msg => console.log('fd', msg))
		}
	}, [friends])

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
