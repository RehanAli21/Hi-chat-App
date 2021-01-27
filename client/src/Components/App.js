import React from 'react'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ theme }) => {
	const id = window.localStorage.getItem('id')

	return (
		<div>
			<Nav t={theme} />
			<main>
				<Contacts id={id} />
				<Msgs id={id} />
			</main>
		</div>
	)
}

export default App
