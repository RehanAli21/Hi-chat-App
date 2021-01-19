import React from 'react'
import Contact from './Contact'

const Contacts = () => {
	return (
		<div className='contacts'>
			<div className='findFriends'>
				<input
					type='text'
					name='findFriend'
					id='findFriend'
					placeholder='Find Friend'
				/>
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
