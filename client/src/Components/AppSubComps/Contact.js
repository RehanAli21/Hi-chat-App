import React, { useState } from 'react'

const Contact = ({ username, msg, img }) => {
	const [classes, setClasses] = useState('contact')

	return (
		<div
			className={classes}
			onClick={() => setClasses('contact contactActivated')}>
			<div className='contactDetails'>
				<h3>{username}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
