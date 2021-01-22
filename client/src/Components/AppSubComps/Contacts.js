import React, { useState } from 'react'
import Contact from './Contact'
import Request from './Request'
import FindFriend from './FindFriend'

const Contacts = () => {
	const [req, setReq] = useState(false)
	const [ff, setFf] = useState(false)

	const changeReq = () => setReq(!req)

	const changeFind = () => setFf(!ff)

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
			<div className='contactSection'>
				<Contact
					username='Salman'
					msg='Han yar kesa hay'
					img='de-dak.png'
				/>
				<Contact
					username='Rehan'
					msg='Han yar kesa hay'
					img='de-dak.png'
				/>
				<Contact username='Ali' msg='Mar ja kutte' img='de-dak.png' />
				<Contact
					username='Rizwan'
					msg='Sain upload kerdi report'
					img='de-dak.png'
				/>
			</div>
		</div>
	)
}

export default Contacts
