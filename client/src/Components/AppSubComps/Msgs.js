import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom'
import { UserContext } from './UserContext'
import io from 'socket.io-client'
import Msg from './Msg'

let socket

const Msgs = () => {
	const ENDPOINT = 'http://localhost:5000/'
	const username = window.localStorage.getItem('username')
	const [change, setChange] = useState(0)
	const [msg, setMsg] = useState('')
	let key = 0

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
			//////For joining//////
			socket.emit('join', { username: username, friends: friendsList })

			//////For FriendOnline//////
			socket.on('friendOnline', msg => {
				setUserStatusOnSocket(msg.username, true)
			})

			//////For FriendDisconnect//////
			socket.on('friendDisconnect', msg => {
				setUserStatusOnSocket(msg.username, false)
			})

			//////For Receiving Msg//////
			socket.on('message', data => {
				console.log('username receive: ', data)

				const newUserMsgs = []
				for (let i = 0; i < userMsgs.length; i++) {
					newUserMsgs.push(userMsgs[i])
				}
				for (let i = 0; i < newUserMsgs.length; i++) {
					if (newUserMsgs[i].username === data.sender) {
						newUserMsgs[i].msgs.push(
							'' + data.sender + '(|hi_app|)' + data.msg
						)
					}
				}
				setUserMsgs(newUserMsgs)

				setUserStatusOnSocket(data.sender, true)
			})
		} else if (change < 20) {
			setChange(change + 1)
		}

		return () => {
			socket.disconnect()
			socket.off()
		}
	}, [change, friendsList])

	const sendMsg = async () => {
		if (msg !== '' && activeUser !== '') {
			socket.emit('message', {
				sender: username,
				receiver: activeUser,
				msg
			})

			const Encryptmsg = username + '(|hi_app|)' + msg

			const newUserMsgs = []
			for (let i = 0; i < userMsgs.length; i++) {
				newUserMsgs.push(userMsgs[i])
			}
			for (let i = 0; i < newUserMsgs.length; i++) {
				if (newUserMsgs[i].username === activeUser) {
					newUserMsgs[i].msgs.push(Encryptmsg)
				}
			}

			try {
				const res = await axios.post(`${ENDPOINT}msg/`, {
					sender: username,
					receiver: activeUser,
					msg: Encryptmsg
				})

				console.log(res)
			} catch (error) {
				console.log('error on saving msg')
			}

			setUserMsgs(newUserMsgs)
			document.getElementById('msgInput').value = ''
		}
	}

	const setUserStatusOnSocket = (username, online) => {
		const status = []

		usersStatus.forEach(e => status.push(e))
		status.forEach(e => {
			if (username === e.username) {
				e.status = online
			}
		})
		setUsersStatus(status)
	}

	const shoWMsgs = () => {
		if (activeUser === '') {
			return (
				<h1
					style={{
						marginTop: '25%',
						marginLeft: '25%',
						color: 'white',
						zIndex: '-1',
						textShadow:
							'3px 3px 3px #007bdb, -3px -3px 3px #007bdb, -3px 3px 3px #007bdb, 3px -3px 3px #007bdb'
					}}>
					Hello {username.toUpperCase()}, Welcome to Hi App
				</h1>
			)
		} else {
			if (userMsgs.length > 0) {
				for (let i = 0; i < userMsgs.length; i++) {
					if (userMsgs[i].username === activeUser) {
						const components = userMsgs[i].msgs.map(msg => {
							let um = msg.split('(|hi_app|)')
							return (
								<Msg
									key={key++}
									user={um[0] === activeUser ? 'notme' : 'me'}
									msg={um[1]}
								/>
							)
						})

						return components
					}
				}
			}
		}
	}

	return (
		<div className='msgs'>
			<ScrollToBottom className='msg-section-height'>
				<div className='msg-section'>{shoWMsgs()}</div>
			</ScrollToBottom>
			<div className='input-section'>
				<input
					type='text'
					name='msg'
					id='msgInput'
					placeholder='Message...'
					onChange={e => setMsg(e.target.value)}
					required
				/>
				<button onClick={sendMsg} className='btn btn-primary'>
					&gt;
				</button>
			</div>
		</div>
	)
}

export default Msgs
