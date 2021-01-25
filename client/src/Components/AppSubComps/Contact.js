import React from 'react'

const Contact = ({ username, msg }) => {
	return (
		<div className='contact'>
			<div className='contactDetails'>
				<h3>{username}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
