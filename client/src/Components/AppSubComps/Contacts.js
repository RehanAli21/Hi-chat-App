import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import ScrollToBottom from 'react-scroll-to-bottom'
import Contact from './Contact'
import Request from './Request'
import FindFriend from './FindFriend'

const Contacts = () => {
	const [
		friends,
		getFriends,
		setFriends,
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
		return friends.map(ele => (
			<Contact
				key={ele.username}
				username={ele.username}
				msg={ele.msgs[0] ? ele.msgs[0] : 'No messages'}
				onSetActiveUser={onSetActiveUser}
				onlineStatus={ele.onlineStatus}
			/>
		))
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
