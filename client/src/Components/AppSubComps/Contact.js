import React, { useState } from 'react'

const Contact = ({ username, msg }) => {
	const [classes, setClasses] = useState('contact')

	return (
		<div className={classes}>
			<div className='contactDetails'>
				<h3>{username}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
