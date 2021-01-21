import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

let socket

const App = ({ theme }) => {
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')
	const ENDPOINT = 'http://localhost:5000/'

	useEffect(() => {
		setId(window.localStorage.getItem('id'))
		setUsername(window.localStorage.getItem('username'))

		socket = io(ENDPOINT)

		socket.emit('join', { username: username, room: username })

		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [ENDPOINT])

	return (
		<div>
			<Nav name={'Rehan Ali'} t={theme} />
			<main>
				<Contacts />
				<Msgs />
			</main>
		</div>
	)
}

export default App
