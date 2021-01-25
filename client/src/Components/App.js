import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ theme }) => {
	const id = window.localStorage.getItem('id')
	const [changes, setChanges] = useState(false)
	const [friends, setFriends] = useState([])
	const ENDPOINT = 'http://localhost:5000/'

	useEffect(() => {
		getFriends()
	}, [changes])

	const getFriends = () => {
		axios
			.get(ENDPOINT + `friend/${id}`)
			.then(res => setFriends(res.data.friends))
			.catch(err => console.error(err))
	}

	const onChange = () => setChanges(!changes)

	return (
		<div>
			<Nav t={theme} />
			<main>
				<Contacts
					friends={friends}
					changes={changes}
					onChange={onChange}
				/>
				<Msgs friends={friends} changes={changes} onChange={onChange} />
			</main>
		</div>
	)
}

export default App
