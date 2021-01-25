import React, { useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Contact from './Contact'
import Request from './Request'
import FindFriend from './FindFriend'

const Contacts = ({ friends, onChange }) => {
	const [req, setReq] = useState(false)
	const [ff, setFf] = useState(false)

	const changeReq = () => {
		onChange()
		setReq(!req)
	}

	const changeFind = () => {
		onChange()
		setFf(!ff)
	}

	const showContact = () => {
		return friends.map(friend => (
			<Contact
				key={friend.username}
				username={friend.username.toUpperCase()}
				msg={friend.msgs[0] ? friend.msgs[0] : 'No messages'}
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
