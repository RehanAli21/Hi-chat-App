import React, { useEffect, useState } from 'react'

const Contact = ({ username, msg, onSetActiveUser, onlineStatus }) => {
	const [cssClass, setCssClass] = useState({})

	useEffect(() => {
		if (onlineStatus) {
			setCssClass({
				width: '12px',
				height: '12px',
				backgroundColor: 'green',
				borderRadius: '50%',
				float: 'right',
				margin: '20px 20px 0px 0px'
			})
		} else {
			setCssClass({
				width: '12px',
				height: '12px',
				backgroundColor: 'red',
				borderRadius: '50%',
				float: 'right',
				margin: '20px 20px 0px 0px'
			})
		}
	}, [onlineStatus])

	return (
		<div onClick={() => onSetActiveUser(username)} className='contact'>
			<div style={cssClass}></div>
			<div className='contactDetails'>
				<h3>{username.toUpperCase()}</h3>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Contact
