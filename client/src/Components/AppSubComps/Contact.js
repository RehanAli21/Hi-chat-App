import React from 'react'

const Contact = ({ username, msg, onSetActiveUser }) => {
	return (
		<div onClick={() => onSetActiveUser(username)} className='contact'>
			<div className='contactDetails'>
				<h3>{username.toUpperCase()}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
