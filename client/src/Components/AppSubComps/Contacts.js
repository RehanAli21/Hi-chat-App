import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import ScrollToBottom from 'react-scroll-to-bottom'
import Contact from './Contact'
import Request from './Request'
import FindFriend from './FindFriend'

const Contacts = () => {
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

	const [req, setReq] = useState(false)
	const [ff, setFf] = useState(false)

	const onSetActiveUser = username => setActiveUser(username)

	const changeReq = () => {
		getFriends(window.localStorage.getItem('id'))
		setReq(!req)
	}

	const changeFind = () => {
		getFriends(window.localStorage.getItem('id'))
		setFf(!ff)
	}

	const showContact = () => {
		const splitmsg = string => string.split('(|hi_app|)')[1]

		if (userMsgs.length > 0 && usersStatus.length > 0) {
			const contactComponents = []

			for (let i = 0; i < friendsList.length; i++) {
				contactComponents.push(
					<Contact
						key={friendsList[i].username}
						username={friendsList[i].username}
						name={friendsList[i].name}
						msg={
							userMsgs[i].msgs[0]
								? splitmsg(
										userMsgs[i].msgs[
											userMsgs[i].msgs.length - 1
										]
								  )
								: 'No messages'
						}
						onSetActiveUser={onSetActiveUser}
						onlineStatus={usersStatus[i].status}
						activeUser={activeUser}
					/>
				)
			}
			return contactComponents
		}
	}

	return (
		<div className='contacts'>
			<div className='findFriends'>
				<button className='btn btn-primary' onClick={changeReq}>
					Requests
				</button>
				<button className='btn btn-primary' onClick={changeFind}>
					Find Friends
				</button>
				<Request req={req} changeReq={changeReq} />
				<FindFriend ff={ff} changeFind={changeFind} />
			</div>
			<div>
				<ScrollToBottom className='contactSection'>
					{showContact()}
				</ScrollToBottom>
			</div>
		</div>
	)
}

export default Contacts
