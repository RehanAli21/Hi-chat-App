import React, { useState, createContext } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = props => {
	const [userMsgs, setUserMsgs] = useState([])
	const [friendsList, setFriendsList] = useState([])
	const [usersStatus, setUsersStatus] = useState([])
	const [activeUser, setActiveUser] = useState('')

	const getFriends = async id => {
		try {
			const res = await axios.get(
				`https://hi-chat-application.herokuapp.com/friend/${id}`
			)
			const friendList = []
			const usernamesAndMsgs = []
			const usernameAndStatus = []

			res.data.friends.forEach(friend => {
				friendList.push({
					username: friend.username,
					name: friend.name
				})
				usernamesAndMsgs.push({
					username: friend.username,
					msgs: friend.msgs
				})
				usernameAndStatus.push({
					username: friend.username,
					status: false
				})
			})

			setFriendsList(friendList)
			setUserMsgs(usernamesAndMsgs)
			setUsersStatus(usernameAndStatus)
		} catch (error) {
			console.log('friends error')
		}
	}

	return (
		<UserContext.Provider
			value={[
				getFriends,
				friendsList,
				userMsgs,
				setUserMsgs,
				usersStatus,
				setUsersStatus,
				activeUser,
				setActiveUser
			]}>
			{props.children}
		</UserContext.Provider>
	)
}
