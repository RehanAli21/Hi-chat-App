import React, { useEffect, useState } from 'react'

const Contact = ({
	username,
	msg,
	onSetActiveUser,
	onlineStatus,
	activeUser
}) => {
	const [css, setCss] = useState({})
	const [contactClass, setContactClass] = useState('contact')

	useEffect(() => {
		if (onlineStatus) {
			setCss({
				width: '12px',
				height: '12px',
				backgroundColor: 'green',
				borderRadius: '50%',
				float: 'right',
				margin: '20px 20px 0px 0px'
			})
		} else {
			setCss({
				width: '12px',
				height: '12px',
				backgroundColor: 'red',
				borderRadius: '50%',
				float: 'right',
				margin: '20px 20px 0px 0px'
			})
		}
		if (activeUser === username) {
			setContactClass('contact contact-activated')
		} else {
			setContactClass('contact')
		}
	}, [onlineStatus, activeUser])

	return (
		<div onClick={() => onSetActiveUser(username)} className={contactClass}>
			<div style={css}></div>
			<div className='contactDetails'>
				<h3>{username.toUpperCase()}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
