import React from 'react'
import Msg from './Msg'

const Msgs = () => {
	return (
		<div className='msgs'>
			<div className='msg-section'>
				<Msg user='me' msg='Hello, How Are you' />
				<Msg user='notme' msg='I am fine How are you' />
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
