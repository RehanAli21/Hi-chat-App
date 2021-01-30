import React from 'react'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ theme, changeTheme }) => {
	const id = window.localStorage.getItem('id')

	return (
		<div>
			<Nav theme={theme} changeTheme={changeTheme} />
			<main>
				<Contacts id={id} />
				<Msgs id={id} />
			</main>
		</div>
	)
}

export default App
