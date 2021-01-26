import React, { useContext } from 'react'
import { FriendsContext } from './FriendsContext'
import Msg from './Msg'

const Msgs = () => {
	const [friends, activeUser, onChange, setActiveUser] = useContext(
		FriendsContext
	)

	return (
		<div className='msgs'>
			<div className='msg-section'>
				{activeUser === '' ? (
					<h1
						style={{
							margin: 'auto',
							color: 'white',
							textShadow:
								'3px 3px 3px #007bdb, -3px -3px 3px #007bdb, -3px 3px 3px #007bdb, 3px -3px 3px #007bdb'
						}}>
						Hello, Welcome to Hi App
					</h1>
				) : (
					''
				)}
				{/* <Msg user='me' msg='Hello, How Are you' />
				<Msg user='notme' msg='I am fine How are you' /> */}
			</div>
			<div className='input-section'>
				<input
					type='text'
					name='msg'
					id='msgInput'
					placeholder='Message...'
				/>
				<button className='btn btn-primary'>&gt;</button>
			</div>
		</div>
	)
}

export default Msgs
