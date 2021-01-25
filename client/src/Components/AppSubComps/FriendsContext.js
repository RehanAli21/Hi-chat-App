import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const FriendsContext = createContext()

export const FriendsProvider = props => {
	const [friends, setFriends] = useState([])
	const [changes, setChanges] = useState(false)
	const [id, setId] = useState('')
	const ENDPOINT = 'http://localhost:5000/'
	const [activeUser, setActivUser] = useState('')

	const onChange = () => setChanges(!changes)

	useEffect(() => {
		getFriends()
	}, [changes, id])

	const getFriends = () => {
		axios
			.get(ENDPOINT + `friend/${id}`)
			.then(res => setFriends(res.data.friends))
			.catch(err => console.error(err))
	}

	return (
		<FriendsContext.Provider value={[friends, onChange, setId]}>
			{props.children}
		</FriendsContext.Provider>
	)
}
