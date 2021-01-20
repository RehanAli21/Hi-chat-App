import React from 'react'

const nav = ({ name, theme, changeTheme, onSignOut }) => {
	return (
		<nav>
			<div className='nameHeading'>
				<h2>{name}</h2>
			</div>
			<div className='mainHeading'>
				<h1>Hi</h1>
			</div>
			<div className='themeBtn'>
				<button onClick={changeTheme} className='btn btn-theme'>
					{theme}
				</button>
			</div>
			<div className='signoutBtn'>
				<button onClick={onSignOut} className='btn btn-primary'>
					SignOut
				</button>
			</div>
		</nav>
	)
}

export default nav
