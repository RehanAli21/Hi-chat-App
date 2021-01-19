import React from 'react'

const Msg = ({ msg, user }) => {
	return (
		<div className={user === 'me' ? 'right' : 'left'}>
			<div className={user === 'me' ? 'mymsg' : 'notmymsg'}>
				<p>{msg}</p>
			</div>
		</div>
	)
}

export default Msg
