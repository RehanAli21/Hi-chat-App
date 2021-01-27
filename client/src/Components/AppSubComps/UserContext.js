import React, { useState, createContext } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = props => {
	const [friends, setFriends] = useState([])
	const [activeUser, setActiveUser] = useState('')

	const getFriends = async id => {
		try {
			const res = await axios.get(`http://localhost:5000/friend/${id}`)
			setFriends(res.data.friends)
		} catch (error) {
			console.log('firnds error')
		}
	}

	return (
		<UserContext.Provider
			value={[
				friends,
				getFriends,
				setFriends,
				activeUser,
				setActiveUser
			]}>
			{props.children}
		</UserContext.Provider>
	)
}
