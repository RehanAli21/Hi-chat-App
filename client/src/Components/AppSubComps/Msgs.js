import React, { useEffect, useContext } from 'react'
import { FriendsContext } from './FriendsContext'
import io from 'socket.io-client'
import Msg from './Msg'

let socket

const Msgs = () => {
	const ENDPOINT = 'http://localhost:5000/'
	const username = window.localStorage.getItem('username')

	const [
		friends,
		setFriends,
		activeUser,
		onChange,
		setActiveUser
	] = useContext(FriendsContext)

	useEffect(() => {
		socket = io(ENDPOINT)

		if (username && friends.length > 0) {
			console.log(socket)
			socket.emit(
				'join',
				{ username: username, friends: friends },
				({ error }) => alert(error)
			)

			socket.on('online', msg => console.log(msg))
		}

		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [username, friends])

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
